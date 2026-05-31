"use client";

import { motion } from "framer-motion";
import { Hand, Truck, MessageSquareHeart, Leaf } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const reasons = [
  { icon: Hand, title: "Handmade", desc: "Every piece crafted by skilled artisans" },
  { icon: Truck, title: "Same-Day Delivery", desc: "Order before 1pm for same-day delivery" },
  { icon: MessageSquareHeart, title: "Custom Messages", desc: "Free personalised message card" },
  { icon: Leaf, title: "Eco Packaging", desc: "Sustainable, recyclable packaging" },
];

export function WhyAmore() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center mb-12">
          Why Choose Amoré
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((r) => (
            <motion.div key={r.title} className="text-center" variants={staggerItem}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage/20 text-sage mb-4">
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-charcoal mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
