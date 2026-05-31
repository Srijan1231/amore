import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    });

    return successResponse(categories);
  } catch {
    return errorResponse("Failed to fetch categories", 500);
  }
}
