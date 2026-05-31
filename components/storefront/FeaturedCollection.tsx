"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Product } from "@/types";

type FeaturedProduct = Product & { avgRating: number; reviewCount: number };

export function FeaturedCollection() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=4&sort=newest")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-cream/30">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Our Favourites
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Hand-picked selections our customers love most
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div key={product.slug} variants={staggerItem}>
              <Link href={`/shop/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted mb-3">
                  {product.images?.[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].altText ?? product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                  {product.comparePrice && product.comparePrice > Number(product.price) && (
                    <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                      Sale
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-charcoal group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground font-semibold">{formatPrice(Number(product.price))}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link href="/shop" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
