import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate a secure random token
function generateAccessToken(length = 48): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

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

    // Production URL for back_urls
    const productionUrl = "https://horoscopodagabi.vercel.app";

    // Generate order_id and access_token
    const orderId = crypto.randomUUID();
    const orderAccessToken = generateAccessToken();

    // Create order in database first
    const { error: orderError } = await supabase.from("orders").insert({
      order_id: orderId,
      access_token: orderAccessToken,
      email: email,
      birth_data: birthData,
      status: "pending",
    });

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw new Error("Erro ao criar pedido");
    }

    console.log("Order created:", { orderId, email });

    // Create Mercado Pago preference with correct back_urls
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
        success: `${productionUrl}/pagamento/sucesso?order=${orderId}`,
        failure: `${productionUrl}/pagamento/erro?order=${orderId}`,
        pending: `${productionUrl}/pagamento/aguardando?order=${orderId}`,
      },
      auto_return: "approved",
      external_reference: orderId,
      notification_url: `${supabaseUrl}/functions/v1/mercado-pago-webhook`,
    };

    console.log("Creating Mercado Pago preference...", { email, external_reference: orderId });

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
      url: preference.init_point,
      order_id: orderId 
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
