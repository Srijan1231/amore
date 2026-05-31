"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Palette, Truck } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const steps = [
  {
    icon: MousePointerClick,
    step: "1",
    title: "Choose",
    description: "Browse our collection and find the perfect bouquet or gift",
  },
  {
    icon: Palette,
    step: "2",
    title: "Personalise",
    description: "Add a heartfelt message card and choose gift wrapping",
  },
  {
    icon: Truck,
    step: "3",
    title: "Delivered with Love",
    description: "We deliver beautifully wrapped to their door",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground">Three simple steps to the perfect gift</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.title}
              className="text-center relative"
              variants={staggerItem}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-lavender/20 text-primary mb-6 relative">
                <step.icon className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
