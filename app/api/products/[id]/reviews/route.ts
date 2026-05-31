import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";
import { reviewSchema } from "@/schemas/checkout";

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reviews = await db.review.findMany({
      where: { productId: id, isPublished: true },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(reviews);
  } catch {
    return errorResponse("Failed to fetch reviews", 500);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid review data");
    }

    const review = await db.review.create({
      data: {
        productId: id,
        rating: parsed.data.rating,
        title: parsed.data.title,
        body: parsed.data.body,
        photos: parsed.data.photos,
        isPublished: false,
      },
    });

    return successResponse(review);
  } catch {
    return errorResponse("Failed to create review", 500);
  }
}
