import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().url().optional(),
  authorId: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get("type") ?? "blog";

    if (type === "blog") {
      const posts = await db.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
      });
      return successResponse(posts);
    }

    return successResponse([]);
  } catch {
    return errorResponse("Failed to fetch CMS content", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = blogPostSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues.map((i) => i.message).join(", "));
    }

    const post = await db.blogPost.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.isPublished ? new Date() : null,
      },
    });

    return successResponse(post);
  } catch {
    return errorResponse("Failed to create blog post", 500);
  }
}
