"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const featured = [
  {
    name: "Eternal Rose Bouquet",
    slug: "eternal-rose-bouquet",
    price: "£49.99",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600",
    tag: "Bestseller",
  },
  {
    name: "Lavender Dreams",
    slug: "lavender-dreams",
    price: "£29.99",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600",
    tag: "New",
  },
  {
    name: "Luxury Gift Hamper",
    slug: "luxury-gift-hamper",
    price: "£89.99",
    image: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=600",
    tag: "Popular",
  },
  {
    name: "Spring Garden Bouquet",
    slug: "spring-garden-bouquet",
    price: "£34.99",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600",
    tag: "Seasonal",
  },
];

export function FeaturedCollection() {
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
          {featured.map((product) => (
            <motion.div key={product.slug} variants={staggerItem}>
              <Link href={`/shop/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {product.tag}
                  </span>
                </div>
                <h3 className="font-medium text-charcoal group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground font-semibold">{product.price}</p>
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
