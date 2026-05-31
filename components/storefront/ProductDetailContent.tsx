"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Share2, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import { useCart } from "@/hooks/useCart";
import type { Product, ProductVariant, Review as ReviewType } from "@/types";

interface ProductDetailContentProps {
  slug: string;
}

type FullProduct = Product & {
  avgRating: number;
  reviewCount: number;
  reviews?: (ReviewType & { user?: { name: string | null } | null })[];
};

export function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const [product, setProduct] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [personalisation, setPersonalisation] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setProduct(json.data);
          if (json.data.variants?.length > 0) {
            setSelectedVariant(json.data.variants[0].id);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-heading font-semibold text-charcoal mb-2">Product not found</h2>
        <p className="text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  const currentVariant = product.variants?.find((v: ProductVariant) => v.id === selectedVariant);
  const currentPrice = currentVariant?.price ?? Number(product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, personalisation || null);
  };

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
          {product.images?.[selectedImage] && (
            <Image
              src={product.images[selectedImage].url}
              alt={product.images[selectedImage].altText ?? product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}
          {product.comparePrice && product.comparePrice > Number(product.price) && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {Math.round((1 - Number(product.price) / product.comparePrice) * 100)}% Off
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          {product.images?.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(i)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-transparent"}`}
            >
              <Image src={img.url} alt={img.altText ?? ""} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            {product.category?.name}
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
            {product.avgRating.toFixed(1)} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-charcoal">{formatPrice(currentPrice)}</span>
          {product.comparePrice && product.comparePrice > Number(product.price) && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">{product.description}</p>

        <Separator />

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div>
            <p className="font-medium mb-3">Size</p>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v: ProductVariant) => (
                <Button
                  key={v.id}
                  variant={selectedVariant === v.id ? "default" : "outline"}
                  onClick={() => setSelectedVariant(v.id)}
                  className="flex-1 min-w-[140px]"
                >
                  {v.value} — {formatPrice(Number(v.price ?? product.price))}
                </Button>
              ))}
            </div>
          </div>
        )}

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
          <Button size="lg" className="flex-1" onClick={handleAddToCart}>
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

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="pt-4">
            <h3 className="font-heading text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{review.user?.name ?? "Customer"}</span>
                    {review.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                  </div>
                  {review.title && <p className="font-medium text-sm">{review.title}</p>}
                  <p className="text-sm text-muted-foreground">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
        </Accordion>
      </div>
    </motion.div>
  );
}
