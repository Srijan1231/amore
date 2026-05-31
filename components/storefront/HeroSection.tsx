"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { fadeInUp, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-cream via-background to-blush/20 overflow-hidden">
      {/* Ambient floral animation background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blush/30"
            style={{
              width: 100 + i * 40,
              height: 100 + i * 40,
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            Handcrafted with Love
          </p>
        </motion.div>

        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal mb-6 tracking-tight"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          Gifts That
          <br />
          <span className="text-primary italic">Speak Love</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Discover our collection of handmade bouquets, preserved flowers, and luxury
          gift hampers — each piece crafted with intention, gifted with feeling.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
            Shop Bouquets
          </Link>
          <Link href="/gift-finder" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "text-base px-8")}>
            Find the Perfect Gift
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
