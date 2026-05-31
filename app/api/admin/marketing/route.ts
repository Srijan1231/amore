import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const couponSchema = z.object({
  code: z.string().min(1).transform((v) => v.toUpperCase()),
  type: z.enum(["PERCENTAGE", "FIXED", "FREE_SHIPPING"]),
  value: z.number().min(0),
  minOrderValue: z.number().min(0).optional(),
  maxUses: z.number().int().min(1).optional(),
  startsAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const coupons = await db.coupon.findMany({
      orderBy: { code: "asc" },
    });

    return successResponse(
      coupons.map((c) => ({
        ...c,
        value: Number(c.value),
        minOrderValue: c.minOrderValue ? Number(c.minOrderValue) : null,
      }))
    );
  } catch {
    return errorResponse("Failed to fetch coupons", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = couponSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues.map((i) => i.message).join(", "));
    }

    const coupon = await db.coupon.create({
      data: {
        code: parsed.data.code,
        type: parsed.data.type,
        value: parsed.data.value,
        minOrderValue: parsed.data.minOrderValue,
        maxUses: parsed.data.maxUses,
        startsAt: parsed.data.startsAt ? new Date(parsed.data.startsAt) : null,
        expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
        isActive: parsed.data.isActive,
      },
    });

    return successResponse(coupon);
  } catch {
    return errorResponse("Failed to create coupon", 500);
  }
}
