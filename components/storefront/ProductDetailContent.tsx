"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Share2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface ProductDetailContentProps {
  slug: string;
}

const product = {
  name: "Eternal Rose Bouquet",
  price: 49.99,
  comparePrice: 65.00,
  images: [
    "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
    "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800",
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800",
  ],
  description: "Looking for the perfect anniversary gift? Our Eternal Rose Bouquet is handcrafted with preserved roses that last up to 3 years — no watering required. Each bloom is carefully selected and preserved at peak beauty.",
  variants: [
    { id: "s", name: "Small (6 roses)", price: 39.99 },
    { id: "m", name: "Medium (12 roses)", price: 49.99 },
    { id: "l", name: "Large (24 roses)", price: 79.99 },
  ],
  avgRating: 4.9,
  reviewCount: 42,
  inventory: 25,
  category: "Dried & Preserved",
  tags: ["roses", "preserved", "anniversary"],
};

export function ProductDetailContent(_props: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [personalisation, setPersonalisation] = useState("");

  const currentVariant = product.variants.find((v) => v.id === selectedVariant);
  const currentPrice = currentVariant?.price ?? product.price;

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.comparePrice && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {Math.round((1 - product.price / product.comparePrice) * 100)}% Off
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-transparent"}`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
            {product.name}
          </h1>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(product.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.avgRating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-charcoal">{formatPrice(currentPrice)}</span>
          {product.comparePrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">{product.description}</p>

        <Separator />

        {/* Variants */}
        <div>
          <p className="font-medium mb-3">Size</p>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v) => (
              <Button
                key={v.id}
                variant={selectedVariant === v.id ? "default" : "outline"}
                onClick={() => setSelectedVariant(v.id)}
                className="flex-1 min-w-[140px]"
              >
                {v.name} — {formatPrice(v.price)}
              </Button>
            ))}
          </div>
        </div>

        {/* Personalisation */}
        <div>
          <p className="font-medium mb-2">Message Card (optional)</p>
          <Textarea
            placeholder="Write a heartfelt message..."
            value={personalisation}
            onChange={(e) => setPersonalisation(e.target.value)}
            maxLength={500}
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">{personalisation.length}/500</p>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center border rounded-lg">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button size="lg" className="flex-1">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart — {formatPrice(currentPrice * quantity)}
          </Button>
          <Button size="lg" variant="outline" className="shrink-0" aria-label="Add to wishlist">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-sage" />
            <span>Free delivery £50+</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RotateCcw className="h-4 w-4 text-sage" />
            <span>Free returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-sage" />
            <span>Secure checkout</span>
          </div>
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 pt-2">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Share:</span>
          <Button variant="ghost" size="sm">Pinterest</Button>
          <Button variant="ghost" size="sm">Instagram</Button>
          <Button variant="ghost" size="sm">WhatsApp</Button>
        </div>

        {/* Accordion Details */}
        <Accordion className="w-full">
          <AccordionItem value="care">
            <AccordionTrigger>Care & Packaging</AccordionTrigger>
            <AccordionContent>
              <p>Our preserved roses require no water or sunlight. Keep away from direct sunlight and humidity for the longest lasting results. Delivered in our signature eco-friendly gift box.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="delivery">
            <AccordionTrigger>Delivery Information</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm">
                <li>Standard Delivery: 2–3 working days — £4.99</li>
                <li>Express Delivery: Next day — £9.99</li>
                <li>Same-Day Delivery: Order before 1pm — £14.99</li>
                <li>Free delivery on all orders over £50</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq">
            <AccordionTrigger>FAQs</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium">How long do preserved roses last?</p>
                  <p className="text-muted-foreground">Our preserved roses last 1–3 years with proper care.</p>
                </div>
                <div>
                  <p className="font-medium">Can I personalise the gift card?</p>
                  <p className="text-muted-foreground">Yes! Add your message in the personalisation field above.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
}
