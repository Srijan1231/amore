import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const wishlistSchema = z.object({
  productId: z.string().min(1),
  userId: z.string().min(1),
});

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) return errorResponse("User ID required", 401);

    const items = await db.wishlistItem.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(items);
  } catch {
    return errorResponse("Failed to fetch wishlist", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = wishlistSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid wishlist data");
    }

    const existing = await db.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: parsed.data.userId,
          productId: parsed.data.productId,
        },
      },
    });

    if (existing) {
      await db.wishlistItem.delete({ where: { id: existing.id } });
      return successResponse({ removed: true });
    }

    const item = await db.wishlistItem.create({
      data: parsed.data,
    });

    return successResponse(item);
  } catch {
    return errorResponse("Failed to update wishlist", 500);
  }
}
