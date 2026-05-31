import { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, User } from "lucide-react";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | Amoré Blog`,
    description: `Read ${title} on the Amoré blog — gift ideas, flower trends, and inspiration.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <article>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: title }]} />

        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">Gift Ideas & Inspiration</Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> Amoré Team</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> 28 May 2025</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
          </div>
        </header>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
          <Image
            src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=1200"
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-p:text-muted-foreground prose-a:text-primary">
          <h2>Finding the Perfect Gift</h2>
          <p>
            Finding the perfect gift for a loved one can feel overwhelming. With so many options
            available, how do you choose something that truly speaks from the heart? At Amoré,
            we believe the best gifts are those made with care and personalised with love.
          </p>

          <h3>Why Handmade Gifts Matter</h3>
          <p>
            In a world of mass production, there&apos;s something deeply meaningful about receiving
            a gift that was crafted by hand. Our artisans pour their expertise and passion into
            every arrangement, ensuring each bouquet is unique and beautiful.
          </p>

          <h3>Our Top Picks for Every Occasion</h3>
          <p>
            Whether you&apos;re celebrating an anniversary, birthday, or just want to brighten
            someone&apos;s day, our collection has something special for everyone. From preserved
            rose bouquets that last years to luxury gift hampers filled with artisan treats.
          </p>

          <h3>Caring for Your Flowers</h3>
          <p>
            Preserved flowers require minimal care — simply keep them away from direct sunlight
            and humidity. Fresh bouquets should be trimmed and placed in clean water, with the
            water changed every two days for the longest lasting results.
          </p>
        </div>

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
