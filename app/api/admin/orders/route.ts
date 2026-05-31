import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse, paginationMeta } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const cursor = searchParams.get("cursor") ?? undefined;
    const limit = Number(searchParams.get("limit") ?? 20);
    const status = searchParams.get("status") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const where = {
      ...(status && { status: status as "PENDING" | "PROCESSING" | "FULFILLED" | "DELIVERED" | "CANCELLED" | "REFUNDED" }),
      ...(search && {
        OR: [
          { orderNumber: { contains: search, mode: "insensitive" as const } },
          { guestEmail: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const orders = await db.order.findMany({
      where,
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: true } },
        user: { select: { name: true, email: true } },
        shippingAddress: true,
      },
    });
    const total = await db.order.count({ where });

    const hasMore = orders.length > limit;
    const items = hasMore ? orders.slice(0, limit) : orders;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    return successResponse(
      items.map((o) => ({
        ...o,
        subtotal: Number(o.subtotal),
        total: Number(o.total),
        shippingCost: Number(o.shippingCost),
        discount: Number(o.discount),
      })),
      paginationMeta(total, limit, nextCursor)
    );
  } catch {
    return errorResponse("Failed to fetch orders", 500);
  }
}
