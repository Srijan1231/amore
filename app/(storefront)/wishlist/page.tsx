import { Metadata } from "next";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wishlist | Amoré",
  description: "Your saved items — handcrafted bouquets and gifts from Amoré.",
};

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-charcoal mb-8">My Wishlist</h1>

      <div className="text-center py-20">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-charcoal mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">
          Browse our collection and save items you love
        </p>
        <Link href="/shop" className={buttonVariants()}>
          Explore Products
        </Link>
      </div>
    </div>
  );
}
