import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Mapa Astral Completo",
              description: "Acesso completo ao seu mapa astral com todos os planetas, casas, aspectos e visualizações",
            },
            unit_amount: 4990, // R$49.90 in centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${req.headers.get("origin")}/mapa-astral/resultado?session_id={CHECKOUT_SESSION_ID}&paid=true`,
      cancel_url: `${req.headers.get("origin")}/mapa-astral/pagamento`,
    });

    // Store session in database
    const { error: dbError } = await supabase.from("checkout_sessions").insert({
      session_id: session.id,
      email: email,
      birth_data: birthData,
      status: "pending",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Erro ao salvar sessão");
    }

    return new Response(JSON.stringify({ url: session.url }), {
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
