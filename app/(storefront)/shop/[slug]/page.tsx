import { Metadata } from "next";
import { ProductDetailContent } from "@/components/storefront/ProductDetailContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | Amoré`,
    description: `Shop the ${title} from Amoré — handcrafted with love. Free delivery on orders over £50.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Shop", href: "/shop" }, { label: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") }]} />
      <ProductDetailContent slug={slug} />
    </div>
  );
}
