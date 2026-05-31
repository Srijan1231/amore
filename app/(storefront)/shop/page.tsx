import { Metadata } from "next";
import { ShopPageContent } from "@/components/storefront/ShopPageContent";

export const metadata: Metadata = {
  title: "Shop — Handmade Bouquets & Gifts | Amoré",
  description: "Browse our collection of handcrafted fresh bouquets, dried flower arrangements, and luxury gift hampers. Free delivery on orders over £50.",
};

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-2">Shop All</h1>
        <p className="text-muted-foreground">
          Discover handcrafted bouquets and gifts, made with love for every occasion
        </p>
      </div>
      <ShopPageContent />
    </div>
  );
}
