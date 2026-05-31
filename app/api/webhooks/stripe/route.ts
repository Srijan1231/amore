import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { errorResponse } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return errorResponse("Missing stripe-signature header", 400);
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return errorResponse("Webhook signature verification failed", 400);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      await db.order.updateMany({
        where: { paymentIntent: paymentIntent.id },
        data: {
          paymentStatus: "PAID",
          status: "PROCESSING",
        },
      });
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      await db.order.updateMany({
        where: { paymentIntent: paymentIntent.id },
        data: { paymentStatus: "FAILED" },
      });
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (paymentIntentId) {
        await db.order.updateMany({
          where: { paymentIntent: paymentIntentId },
          data: {
            paymentStatus: charge.amount_refunded === charge.amount ? "REFUNDED" : "PARTIALLY_REFUNDED",
            status: charge.amount_refunded === charge.amount ? "REFUNDED" : "PROCESSING",
          },
        });
      }
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
