"use client";

import { motion } from "framer-motion";
import { Heart, Hand, Gift } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const values = [
  {
    icon: Hand,
    title: "Handcrafted",
    description: "Every bouquet is carefully arranged by our skilled artisans",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Each piece is created with intention and emotional care",
  },
  {
    icon: Gift,
    title: "Gift-Ready",
    description: "Beautifully wrapped and delivered to your door",
  },
];

export function BrandStoryStrip() {
  return (
    <section className="py-16 bg-background">
      <motion.div
        className="container mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="text-center"
              variants={staggerItem}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush/20 text-primary mb-4">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
