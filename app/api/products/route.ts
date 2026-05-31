import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse, paginationMeta } from "@/lib/api";
import { productFilterSchema } from "@/schemas/product";
import type { Prisma } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const parsed = productFilterSchema.safeParse({
      category: searchParams.get("category") ?? undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      search: searchParams.get("search") ?? undefined,
      sort: searchParams.get("sort") ?? "featured",
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
    });

    if (!parsed.success) {
      return errorResponse("Invalid filter parameters");
    }

    const { category, minPrice, maxPrice, search, sort, cursor, limit } = parsed.data;

    const where: Prisma.ProductWhereInput = {
      isPublished: true,
      ...(category && { category: { slug: category } }),
      ...(minPrice !== undefined && { price: { gte: minPrice } }),
      ...(maxPrice !== undefined && { price: { ...((minPrice !== undefined ? { gte: minPrice } : {})), lte: maxPrice } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { tags: { hasSome: [search] } },
        ],
      }),
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
      switch (sort) {
        case "newest": return { createdAt: "desc" as const };
        case "price-asc": return { price: "asc" as const };
        case "price-desc": return { price: "desc" as const };
        default: return { createdAt: "desc" as const };
      }
    })();

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        include: {
          images: { orderBy: { position: "asc" } },
          category: true,
          reviews: { where: { isPublished: true }, select: { rating: true } },
        },
      }),
      db.product.count({ where }),
    ]);

    const hasMore = products.length > limit;
    const items = hasMore ? products.slice(0, limit) : products;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    const productsWithRating = items.map((p) => ({
      ...p,
      price: Number(p.price),
      comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
      avgRating: p.reviews.length > 0
        ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
        : 0,
      reviewCount: p.reviews.length,
    }));

    return successResponse(productsWithRating, paginationMeta(total, limit, nextCursor));
  } catch {
    return errorResponse("Failed to fetch products", 500);
  }
}
