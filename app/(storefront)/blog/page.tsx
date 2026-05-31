import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Gift Ideas, Flower Trends & Inspiration | Amoré",
  description: "Discover gift guides, flower care tips, seasonal inspiration, and behind-the-craft stories from the Amoré team.",
};

const posts = [
  {
    slug: "best-anniversary-gift-ideas-2025",
    title: "10 Best Anniversary Gift Ideas for 2025",
    excerpt: "From preserved rose bouquets to luxury hampers, discover the most thoughtful anniversary gifts.",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
    category: "Gift Ideas & Inspiration",
    readTime: 5,
    date: "28 May 2025",
  },
  {
    slug: "fresh-vs-dried-bouquets",
    title: "Fresh vs Dried Bouquets — Which Lasts Longer?",
    excerpt: "Wondering whether to choose fresh or dried flowers? We compare longevity, care, and aesthetics.",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800",
    category: "Flower Trends",
    readTime: 4,
    date: "25 May 2025",
  },
  {
    slug: "valentines-day-gift-guide",
    title: "The Ultimate Valentine's Day Gift Guide",
    excerpt: "Make this Valentine's Day unforgettable with our curated selection of romantic gifts.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800",
    category: "Holiday Collections",
    readTime: 6,
    date: "20 May 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-3">The Amoré Journal</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Gift inspiration, flower care tips, and stories from behind the craft
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="overflow-hidden h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                <h2 className="font-heading text-xl font-semibold text-charcoal group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
