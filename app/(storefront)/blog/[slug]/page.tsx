"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, User, Loader2 } from "lucide-react";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
import { formatDate, calculateReadTime } from "@/lib/utils";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  publishedAt: string | null;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setPost(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    const fallbackTitle = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">{fallbackTitle}</h1>
        <p className="text-muted-foreground">This blog post could not be found.</p>
      </div>
    );
  }

  return (
    <article>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> Amoré Team</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {calculateReadTime(post.content)} min read</span>
          </div>
        </header>

        {post.featuredImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-p:text-muted-foreground prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-12" />

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Share:</span>
          <button className="hover:text-primary transition-colors">Pinterest</button>
          <button className="hover:text-primary transition-colors">Instagram</button>
          <button className="hover:text-primary transition-colors">WhatsApp</button>
          <button className="hover:text-primary transition-colors">Facebook</button>
        </div>
      </div>

      <NewsletterSignup />
    </article>
  );
}
