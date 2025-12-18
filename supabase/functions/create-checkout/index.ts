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
    const { email, birthData, userId } = await req.json();

    if (!email || !birthData) {
      throw new Error("Email e dados de nascimento são obrigatórios");
    }

    if (!userId) {
      throw new Error("Usuário deve estar logado para efetuar o pagamento");
    }

    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("Mercado Pago não configurado");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Production URL for back_urls
    const productionUrl = "https://horoscopodagabi.vercel.app";

    console.log("Creating checkout for user:", userId, "email:", email);

    // Store birth_data in user_profiles for later use
    const { error: profileError } = await supabase
      .from("user_profiles")
      .update({ birth_data: birthData })
      .eq("user_id", userId);

    if (profileError) {
      console.error("Error updating profile with birth_data:", profileError);
    }

    // Create Mercado Pago preference with user_id as external_reference
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
        success: `${productionUrl}/pos-pagamento`,
        failure: `${productionUrl}/pagamento/erro`,
        pending: `${productionUrl}/pos-pagamento`,
      },
      auto_return: "approved",
      external_reference: userId, // Using user_id as external_reference
      notification_url: `${supabaseUrl}/functions/v1/mercado-pago-webhook`,
      metadata: {
        user_id: userId,
      },
    };

    console.log("Creating Mercado Pago preference...", { email, external_reference: userId });

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

    return new Response(JSON.stringify({ 
      url: preference.init_point 
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
