import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");

    if (slug) {
      const post = await db.blogPost.findUnique({ where: { slug } });
      if (!post || !post.isPublished) {
        return errorResponse("Post not found", 404);
      }
      return successResponse(post);
    }

    const posts = await db.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });

    return successResponse(posts);
  } catch {
    return errorResponse("Failed to fetch blog posts", 500);
  }
}
