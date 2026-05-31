import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { isPublished: true },
      include: {
        user: { select: { name: true } },
        product: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return successResponse(reviews);
  } catch {
    return errorResponse("Failed to fetch reviews", 500);
  }
}
