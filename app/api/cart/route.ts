import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const cartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().nullable().optional(),
  quantity: z.number().int().min(1),
  personalisation: z.string().nullable().optional(),
});

const updateCartSchema = z.object({
  items: z.array(cartItemSchema),
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = updateCartSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid cart data");
    }

    // Cart is primarily client-side (localStorage + Zustand)
    // This endpoint serves as server-sync for logged-in users
    // In production, this would sync with Redis/Upstash
    return successResponse({ items: parsed.data.items });
  } catch {
    return errorResponse("Failed to update cart", 500);
  }
}

export async function GET() {
  try {
    // Return empty cart for guest users
    // Logged-in users would have their cart fetched from Redis
    return successResponse({ items: [] });
  } catch {
    return errorResponse("Failed to fetch cart", 500);
  }
}
