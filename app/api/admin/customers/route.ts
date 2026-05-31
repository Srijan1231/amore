import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse, paginationMeta } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const cursor = searchParams.get("cursor") ?? undefined;
    const limit = Number(searchParams.get("limit") ?? 20);
    const search = searchParams.get("search") ?? undefined;

    const where = {
      role: "CUSTOMER" as const,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [customers, total] = await Promise.all([
      db.user.findMany({
        where,
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { orders: true } },
          orders: {
            select: { total: true, createdAt: true },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      db.user.count({ where }),
    ]);

    const hasMore = customers.length > limit;
    const items = hasMore ? customers.slice(0, limit) : customers;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    return successResponse(items, paginationMeta(total, limit, nextCursor));
  } catch {
    return errorResponse("Failed to fetch customers", 500);
  }
}
