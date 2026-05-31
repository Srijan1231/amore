import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ShopPageContent } from "@/components/storefront/ShopPageContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} Collection | Amoré`,
    description: `Browse our ${title} collection — handcrafted bouquets and gifts made with love.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug === "all" ? "All Products" : slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Collections", href: "/shop" }, { label: title }]} />
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-2">{title}</h1>
        <p className="text-muted-foreground">Explore our handcrafted collection</p>
      </div>
      <ShopPageContent />
    </div>
  );
}
