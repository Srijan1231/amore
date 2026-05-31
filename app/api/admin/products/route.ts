import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse, paginationMeta } from "@/lib/api";
import { createProductSchema } from "@/schemas/product";
import { generateSlug } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const cursor = searchParams.get("cursor") ?? undefined;
    const limit = Number(searchParams.get("limit") ?? 20);
    const search = searchParams.get("search") ?? undefined;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { sku: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const products = await db.product.findMany({
      where,
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { updatedAt: "desc" },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        category: true,
        _count: { select: { reviews: true, orderItems: true } },
      },
    });
    const total = await db.product.count({ where });

    const hasMore = products.length > limit;
    const items = hasMore ? products.slice(0, limit) : products;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    return successResponse(
      items.map((p) => ({
        ...p,
        price: Number(p.price),
        comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
      })),
      paginationMeta(total, limit, nextCursor)
    );
  } catch {
    return errorResponse("Failed to fetch products", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues.map((i: { message: string }) => i.message).join(", "));
    }

    const slug = parsed.data.slug || generateSlug(parsed.data.name);

    const product = await db.product.create({
      data: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description,
        price: parsed.data.price,
        comparePrice: parsed.data.comparePrice,
        categoryId: parsed.data.categoryId,
        inventory: parsed.data.inventory,
        sku: parsed.data.sku,
        isPublished: parsed.data.isPublished,
        publishedAt: parsed.data.isPublished ? new Date() : null,
        tags: parsed.data.tags,
        images: {
          create: parsed.data.images.map((img: { url: string; altText?: string; position?: number }, idx: number) => ({
            url: img.url,
            altText: img.altText,
            position: img.position ?? idx,
          })),
        },
        variants: {
          create: parsed.data.variants.map((v: { name: string; value: string; price?: number; inventory?: number; sku?: string }) => ({
            name: v.name,
            value: v.value,
            price: v.price,
            inventory: v.inventory,
            sku: v.sku,
          })),
        },
      },
      include: { images: true, variants: true, category: true },
    });

    return successResponse(product);
  } catch {
    return errorResponse("Failed to create product", 500);
  }
}
