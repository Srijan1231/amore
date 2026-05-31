import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";
import { couponValidationSchema } from "@/schemas/checkout";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = couponValidationSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid coupon code");
    }

    const coupon = await db.coupon.findUnique({
      where: { code: parsed.data.code.toUpperCase() },
    });

    if (!coupon) {
      return errorResponse("Coupon not found", 404);
    }

    if (!coupon.isActive) {
      return errorResponse("This coupon is no longer active");
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return errorResponse("This coupon has expired");
    }

    if (coupon.maxUses && coupon.useCount >= coupon.maxUses) {
      return errorResponse("This coupon has reached its usage limit");
    }

    return successResponse({
      code: coupon.code,
      type: coupon.type,
      value: Number(coupon.value),
      minOrderValue: coupon.minOrderValue ? Number(coupon.minOrderValue) : null,
    });
  } catch {
    return errorResponse("Failed to validate coupon", 500);
  }
}
