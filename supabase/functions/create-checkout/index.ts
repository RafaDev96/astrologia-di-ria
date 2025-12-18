import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, birthData } = await req.json();

    if (!email || !birthData) {
      throw new Error("Email e dados de nascimento são obrigatórios");
    }

    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("Mercado Pago não configurado");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const origin = req.headers.get("origin") || "https://kxvearksrjbcmxqzikki.lovableproject.com";

    // Create Mercado Pago preference
    const preferenceData = {
      items: [
        {
          title: "Mapa Astral Completo",
          description: "Acesso completo ao seu mapa astral com todos os planetas, casas, aspectos e visualizações",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 49.90,
        },
      ],
      payer: {
        email: email,
      },
      back_urls: {
        success: `${origin}/mapa-astral/resultado`,
        failure: `${origin}/mapa-astral/pagamento`,
        pending: `${origin}/mapa-astral/resultado`,
      },
      auto_return: "approved",
      external_reference: crypto.randomUUID(),
      notification_url: `${supabaseUrl}/functions/v1/mercado-pago-webhook`,
    };

    console.log("Creating Mercado Pago preference...", { email, external_reference: preferenceData.external_reference });

    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    });

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text();
      console.error("Mercado Pago error:", errorText);
      throw new Error("Erro ao criar preferência de pagamento");
    }

    const preference = await mpResponse.json();
    console.log("Preference created:", { id: preference.id, init_point: preference.init_point });

    // Store session in database with external_reference as session_id
    const { error: dbError } = await supabase.from("checkout_sessions").insert({
      session_id: preferenceData.external_reference,
      email: email,
      birth_data: birthData,
      status: "pending",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Erro ao salvar sessão");
    }

    return new Response(JSON.stringify({ 
      url: preference.init_point,
      session_id: preferenceData.external_reference 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
