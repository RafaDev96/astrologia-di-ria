import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é uma IA especialista em astrologia psicológica e previsões anuais, com linguagem clara, humana, acolhedora e objetiva.
Seu papel é interpretar o mapa astral natal da pessoa à luz dos trânsitos de 2026, sem termos técnicos excessivos e sem fatalismo.

REGRAS IMPORTANTES:
- Se a hora de nascimento não for informada, faça a leitura focando em planetas, signos e tendências gerais
- Evite afirmar casas astrológicas com certeza quando a hora não for informada
- Linguagem natural, humana e fluida
- Sem jargões técnicos sem explicação
- Sem previsões deterministas ou fatalistas
- Não usar termos como "você vai" → prefira "há tendência", "o ano favorece"
- Português do Brasil
- Sem emojis
- O foco é ajudar a pessoa a entender como usar 2026 a seu favor, não prever eventos fixos.`;

const getPreviewPrompt = (birthData: any) => `
Gere uma PRÉVIA da previsão anual de 2026 para esta pessoa:

DADOS:
- Nome: ${birthData.name || "Não informado"}
- Data de nascimento: ${birthData.birthDate}
- Hora de nascimento: ${birthData.birthTime || "Não informada"}
- Local: ${birthData.birthCity}, ${birthData.birthCountry || "Brasil"}

MAPA NATAL (se disponível):
${birthData.chartData ? JSON.stringify(birthData.chartData, null, 2) : "Calcular com base nos dados fornecidos"}

ESTRUTURA DA RESPOSTA (PREVIEW GRATUITO):
Retorne APENAS em HTML semântico com:

<h2>Tema Central de 2026</h2>
<p>Apresente o tema central do ano para essa pessoa (2-3 parágrafos)</p>

<h2>Prévia: Uma Área em Destaque</h2>
<p>Um parágrafo resumido sobre UMA área da vida que será importante em 2026</p>

<p class="cta"><em>Para uma leitura completa com todas as áreas da vida, períodos importantes e conselhos personalizados, acesse a versão Premium.</em></p>

Texto entre 250 e 400 palavras. Use tags HTML (<h2>, <p>), sem markdown.
`;

const getFullPrompt = (birthData: any) => `
Gere uma PREVISÃO ANUAL COMPLETA PARA 2026 para esta pessoa:

DADOS:
- Nome: ${birthData.name || "Não informado"}
- Data de nascimento: ${birthData.birthDate}
- Hora de nascimento: ${birthData.birthTime || "Não informada"}
- Local: ${birthData.birthCity}, ${birthData.birthCountry || "Brasil"}

MAPA NATAL (se disponível):
${birthData.chartData ? JSON.stringify(birthData.chartData, null, 2) : "Calcular com base nos dados fornecidos"}

${!birthData.birthTime ? '\nNOTA: Como a hora de nascimento não foi informada, inclua discretamente: "Algumas áreas podem variar caso a hora de nascimento seja diferente."' : ''}

ESTRUTURA DA RESPOSTA (VERSÃO COMPLETA PREMIUM):
Retorne em HTML semântico com as seguintes seções:

<h2>Introdução: Seu Ano de 2026</h2>
<p>Apresente o tema central de 2026 para essa pessoa. Explique que tipo de ano será: mais introspectivo, expansivo, desafiador, construtivo, etc. Linguagem empática e acessível (2-3 parágrafos)</p>

<h2>Principais Influências de 2026</h2>
<p>Interprete os trânsitos mais relevantes do ano (Saturno, Júpiter, Plutão, Eclipses). Explique o IMPACTO na vida da pessoa, não o trânsito em si. (3-4 parágrafos)</p>

<h2>Amor e Relacionamentos</h2>
<p>Dinâmica emocional, compromissos, afastamentos ou amadurecimento. O que aprender nas relações em 2026. (2-3 parágrafos)</p>

<h2>Carreira, Dinheiro e Propósito</h2>
<p>Crescimento profissional, bloqueios e oportunidades, mudanças de direção ou consolidação. (2-3 parágrafos)</p>

<h2>Saúde e Energia</h2>
<p>Nível de vitalidade, necessidade de pausas, disciplina ou novos hábitos. Atenção emocional e mental. (2 parágrafos)</p>

<h2>Períodos Importantes do Ano</h2>
<p>Indique momentos de virada. Use termos como "No primeiro semestre...", "Entre o meio e o final do ano...", "Ao longo do segundo semestre...". (2-3 parágrafos)</p>

<h2>Conselhos para 2026</h2>
<p>3 a 5 orientações práticas com clareza emocional e tom de apoio. Exemplo: "O melhor caminho em 2026 será agir com constância, não com pressa."</p>

<h2>Mensagem Final</h2>
<p>Uma frase de fechamento inspiradora, mas realista. Nada místico excessivo ou promessas irreais.</p>

Texto entre 900 e 1.500 palavras. Use tags HTML (<h2>, <p>), sem markdown.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { birthData, type = "preview" } = await req.json();

    if (!birthData?.birthDate || !birthData?.birthCity) {
      throw new Error("Dados de nascimento incompletos");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    const userPrompt = type === "full" 
      ? getFullPrompt(birthData) 
      : getPreviewPrompt(birthData);

    console.log(`[FORECAST-2026] Generating ${type} forecast for:`, birthData.name || "Anonymous");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: type === "full" ? 4000 : 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("[FORECAST-2026] Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("[FORECAST-2026] Payment required");
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("[FORECAST-2026] AI gateway error:", response.status, errorText);
      throw new Error("Erro ao gerar previsão");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Resposta vazia da IA");
    }

    console.log(`[FORECAST-2026] Successfully generated ${type} forecast`);

    return new Response(
      JSON.stringify({ forecast: content, type }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[FORECAST-2026] Error:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
