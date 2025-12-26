import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é uma IA especialista em astrologia psicológica com foco em carreira e vocação profissional.
Sua linguagem é clara, humana, acolhedora e prática.
Você analisa o mapa astral para orientar sobre trabalho, emprego e realização profissional.

REGRAS IMPORTANTES:
- Sempre analise casas astrológicas, planetas e aspectos - não apenas o signo solar
- Foco em aplicação prática na vida real
- Linguagem natural, humana e fluida
- Sem jargões técnicos excessivos
- Sem fatalismo ou determinismo
- Tom acolhedor ao apontar desafios e padrões de sabotagem
- Português do Brasil
- Sem emojis
- O objetivo é orientação prática para decisões de carreira`;

const getPreviewPrompt = (birthData: any) => `
Gere uma PRÉVIA da leitura profissional para esta pessoa:

DADOS:
- Nome: ${birthData.name || "Não informado"}
- Data de nascimento: ${birthData.birthDate}
- Hora de nascimento: ${birthData.birthTime || "Não informada"}
- Local: ${birthData.birthCity}, ${birthData.birthCountry || "Brasil"}

MAPA NATAL:
${birthData.chartData ? JSON.stringify(birthData.chartData, null, 2) : "Calcular com base nos dados fornecidos"}

ESTRUTURA DA RESPOSTA (PREVIEW GRATUITO):
Retorne APENAS em HTML semântico com:

<h2>Sua Essência Profissional</h2>
<p>Apresente o perfil profissional geral baseado no Meio do Céu e Casa 10 (2-3 parágrafos)</p>

<h2>Prévia: Como Você Lida com Trabalho</h2>
<p>Um resumo sobre Casa 6 e rotina de trabalho (1-2 parágrafos)</p>

<p class="cta"><em>Para uma leitura completa com análise de todas as casas, planetas, padrões de sabotagem e sugestões práticas, acesse a versão Premium.</em></p>

Texto entre 250 e 400 palavras. Use tags HTML (<h2>, <p>), sem markdown.
`;

const getFullPrompt = (birthData: any) => `
Gere uma LEITURA PROFISSIONAL COMPLETA para esta pessoa:

DADOS:
- Nome: ${birthData.name || "Não informado"}
- Data de nascimento: ${birthData.birthDate}
- Hora de nascimento: ${birthData.birthTime || "Não informada"}
- Local: ${birthData.birthCity}, ${birthData.birthCountry || "Brasil"}

MAPA NATAL:
${birthData.chartData ? JSON.stringify(birthData.chartData, null, 2) : "Calcular com base nos dados fornecidos"}

${!birthData.birthTime ? '\nNOTA: Como a hora de nascimento não foi informada, as casas astrológicas são aproximadas. Inclua discretamente: "Algumas interpretações de casas podem variar caso a hora de nascimento seja diferente."' : ''}

ESTRUTURA DA RESPOSTA (VERSÃO COMPLETA PREMIUM):
Retorne em HTML semântico com as seguintes seções:

<h2>Introdução: Seu Perfil Profissional</h2>
<p>Visão geral do perfil profissional baseado no mapa astral completo. Linguagem empática e acessível (2-3 parágrafos)</p>

<h2>Casa 6: Trabalho Diário e Emprego</h2>
<p>Analise detalhadamente:
- Como a pessoa lida com rotina, horários e obrigações
- Se funciona melhor com emprego fixo ou flexível
- Tipos de tarefas que cansam ou drenam energia
- Tipos de trabalho que fluem melhor no dia a dia
- Considere o signo na cúspide da Casa 6 e planetas presentes
(3-4 parágrafos)</p>

<h2>Casa 10: Carreira, Status e Reconhecimento</h2>
<p>Analise detalhadamente:
- Área de vocação natural
- Como a pessoa deseja ser reconhecida
- Se busca sucesso, estabilidade, propósito ou autonomia
- Possíveis profissões alinhadas com o mapa
- Considere o signo na cúspide e planetas presentes
(3-4 parágrafos)</p>

<h2>Casa 2: Dinheiro, Autovalor e Sobrevivência</h2>
<p>Analise detalhadamente:
- Como a pessoa ganha dinheiro
- Se há bloqueios de autovalor
- Se tende a se subvalorizar ou aceitar pouco
- Relação emocional com dinheiro
- Considere o signo na cúspide e planetas presentes
(2-3 parágrafos)</p>

<h2>Meio do Céu: Seu Caminho de Realização</h2>
<p>Interprete:
- O signo do Meio do Céu em profundidade
- Planetas próximos ao MC e seu significado
- Tipo de carreira que traz realização a longo prazo
- O caminho profissional mais maduro
(2-3 parágrafos)</p>

<h2>Planetas e Seu Potencial Profissional</h2>
<p>Analise especialmente:
- Saturno: bloqueios, medos e amadurecimento profissional
- Júpiter: crescimento e oportunidades
- Marte: energia para trabalhar e agir
- Mercúrio: habilidades mentais e comunicação
- Vênus: talentos naturais e prazer no trabalho
(4-5 parágrafos, um para cada planeta relevante)</p>

<h2>Padrões de Sabotagem Profissional</h2>
<p>Aponte com cuidado e acolhimento:
- Tendência à procrastinação
- Medo de exposição
- Dificuldade de cobrar
- Troca constante de trabalho
- Autossabotagem emocional
Baseie-se nos aspectos desafiadores do mapa (quadraturas, oposições)
Tom sempre acolhedor, não determinista
(2-3 parágrafos)</p>

<h2>Sugestões Práticas para Sua Carreira</h2>
<p>Entregue orientações concretas:
- Tipos de trabalho mais compatíveis
- Ambientes profissionais ideais
- Formas de organizar a rotina
- Alertas do que evitar profissionalmente
(3-4 parágrafos com bullet points quando apropriado)</p>

<h2>Mensagem Final</h2>
<p>Uma mensagem integradora e encorajadora sobre o potencial profissional. Realista mas inspiradora.</p>

Texto entre 1.200 e 1.800 palavras. Use tags HTML (<h2>, <p>, <ul>, <li>), sem markdown.
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

    console.log(`[CAREER-READING] Generating ${type} reading for:`, birthData.name || "Anonymous");

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
        max_tokens: type === "full" ? 5000 : 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("[CAREER-READING] Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("[CAREER-READING] Payment required");
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("[CAREER-READING] AI gateway error:", response.status, errorText);
      throw new Error("Erro ao gerar leitura profissional");
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Resposta vazia da IA");
    }

    // Clean up markdown code blocks if present
    content = content
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    console.log(`[CAREER-READING] Successfully generated ${type} reading`);

    return new Response(
      JSON.stringify({ reading: content, type }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CAREER-READING] Error:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
