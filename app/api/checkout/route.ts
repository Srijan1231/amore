import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { successResponse, errorResponse } from "@/lib/api";
import { checkoutSchema } from "@/schemas/checkout";
import { generateOrderNumber } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid checkout data");
    }

    const { contact, delivery, deliveryMethod, giftOptions, couponCode } = parsed.data;

    // Calculate shipping cost based on method
    const shippingCosts: Record<string, number> = {
      standard: 4.99,
      express: 9.99,
      "same-day": 14.99,
      collection: 0,
    };
    const shippingCost = shippingCosts[deliveryMethod.method] ?? 4.99;

    // TODO: In production, cart items would come from the request body or server-side cart.
    // For now we accept a subtotal from the client and validate it server-side.
    const cartSubtotal = Number(body.cartSubtotal ?? 0);

    // Validate coupon if provided
    let coupon = null;
    let discount = 0;
    if (couponCode) {
      coupon = await db.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive) {
        if (coupon.type === "PERCENTAGE") {
          discount = (cartSubtotal * Number(coupon.value)) / 100;
        } else if (coupon.type === "FIXED") {
          discount = Number(coupon.value);
        } else if (coupon.type === "FREE_SHIPPING") {
          discount = shippingCost;
        }
      }
    }

    // Ensure discount doesn't exceed subtotal
    discount = Math.min(discount, cartSubtotal + shippingCost);
    const total = Math.max(0, cartSubtotal + shippingCost - discount);
    // Stripe minimum is 30p for GBP
    const stripeAmount = Math.max(30, Math.round(total * 100));

    // Create address
    const address = await db.address.create({
      data: {
        firstName: delivery.firstName,
        lastName: delivery.lastName,
        line1: delivery.line1,
        line2: delivery.line2 ?? null,
        city: delivery.city,
        county: delivery.county ?? null,
        postcode: delivery.postcode,
        country: delivery.country,
      },
    });

    const orderNumber = generateOrderNumber();

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: "gbp",
      metadata: {
        email: contact.email,
        orderNumber,
      },
    });

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber,
        guestEmail: contact.email,
        status: "PENDING",
        addressId: address.id,
        shippingMethod: deliveryMethod.method,
        shippingCost,
        subtotal: cartSubtotal,
        discount,
        total,
        giftMessage: giftOptions?.giftMessage ?? null,
        paymentIntent: paymentIntent.id,
        couponId: coupon?.id ?? null,
      },
    });

    return successResponse({
      orderId: order.id,
      orderNumber: order.orderNumber,
      clientSecret: paymentIntent.client_secret,
    });
  } catch {
    return errorResponse("Failed to create checkout session", 500);
  }
}
