"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/storefront/ProductCard";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

type ProductWithRating = Product & { avgRating: number; reviewCount: number };

export default function WishlistPage() {
  const [items, setItems] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setItems(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-8">My Wishlist</h1>
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-charcoal mb-8">My Wishlist</h1>

      {items.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
