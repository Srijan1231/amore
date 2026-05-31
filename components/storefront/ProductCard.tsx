"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product & { avgRating?: number; reviewCount?: number };
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isInWishlist?: boolean;
}

export function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist }: ProductCardProps) {
  const mainImage = product.images?.[0];
  const hasDiscount = product.comparePrice && product.comparePrice > Number(product.price);

  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
          {mainImage && (
            <Image
              src={mainImage.url}
              alt={mainImage.altText ?? product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}

          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Sale
            </Badge>
          )}

          {product.inventory <= 5 && product.inventory > 0 && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              Only {product.inventory} left
            </Badge>
          )}

          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-primary/90 backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.();
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                onToggleWishlist?.();
              }}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current text-red-500" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category?.name}
          </p>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatPrice(Number(product.price))}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(Number(product.comparePrice))}
              </span>
            )}
          </div>
          {(product.avgRating ?? 0) > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {(product.avgRating ?? 0).toFixed(1)} ({product.reviewCount})
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
