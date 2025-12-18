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
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      console.error("MERCADO_PAGO_ACCESS_TOKEN not configured");
      return new Response("Webhook not configured", { status: 500 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the notification data
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");

    // Also try to parse body for IPN v2
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body might be empty for some webhook types
    }

    const paymentId = body?.data?.id || id;
    const notificationType = body?.type || topic;

    console.log("Webhook received:", { topic, id, notificationType, paymentId, body });

    // Only process payment notifications
    if (notificationType !== "payment" && topic !== "payment") {
      console.log("Ignoring non-payment notification:", notificationType || topic);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!paymentId) {
      console.log("No payment ID found in webhook");
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch payment details from Mercado Pago
    console.log("Fetching payment details for:", paymentId);
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text();
      console.error("Error fetching payment:", errorText);
      return new Response(JSON.stringify({ error: "Error fetching payment" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payment = await mpResponse.json();
    console.log("Payment details:", { 
      id: payment.id, 
      status: payment.status, 
      external_reference: payment.external_reference 
    });

    // Update user_profiles if payment is approved
    if (payment.status === "approved" && payment.external_reference) {
      const userId = payment.external_reference;
      console.log("Payment approved, updating user profile for user_id:", userId);
      
      // Update user_profiles table to set is_premium = true
      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({ 
          is_premium: true, 
          premium_activated_at: new Date().toISOString(),
          mp_last_payment_id: String(payment.id)
        })
        .eq("user_id", userId);

      if (profileError) {
        console.error("Error updating user profile:", profileError);
      } else {
        console.log(`User ${userId} is now premium!`);
      }

      // Also update orders table for backward compatibility (if order exists)
      const { error: orderError } = await supabase
        .from("orders")
        .update({ status: "approved", paid_at: new Date().toISOString() })
        .eq("order_id", userId);

      if (orderError) {
        // This is expected to fail if there's no order with this ID
        console.log("No matching order found (this is OK for user-based flow)");
      }

      // Also update checkout_sessions for backward compatibility
      const { error: sessionError } = await supabase
        .from("checkout_sessions")
        .update({ status: "paid", paid_at: new Date().toISOString() })
        .eq("session_id", userId);

      if (sessionError) {
        console.log("No matching checkout session found (this is OK for user-based flow)");
      }

      console.log(`Premium activated for user: ${userId}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { 
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
