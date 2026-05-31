"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations";

const testimonials = [
  {
    name: "Sarah J.",
    location: "London",
    rating: 5,
    text: "The Eternal Rose Bouquet is absolutely stunning! My wife was speechless. They still look perfect after 6 months.",
    product: "Eternal Rose Bouquet",
    verified: true,
  },
  {
    name: "Emma T.",
    location: "Manchester",
    rating: 5,
    text: "Best birthday gift I've ever received! The hamper was beautifully presented and the flowers were gorgeous.",
    product: "Luxury Gift Hamper",
    verified: true,
  },
  {
    name: "James R.",
    location: "Bristol",
    rating: 5,
    text: "Ordered for Mother's Day - the bouquet was even more beautiful than the photos. Mum was so happy!",
    product: "Mother's Day Special",
    verified: true,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Loved by Our Customers
          </h2>
          <p className="text-muted-foreground">Real reviews from real people</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((review) => (
            <motion.div key={review.name} variants={staggerItem}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-blush mb-3" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                    {review.verified && (
                      <span className="text-xs bg-sage/20 text-sage px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
