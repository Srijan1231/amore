"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

export function CartPageContent() {
  const {
    items,
    subtotal,
    couponCode,
    updateItemQuantity,
    removeFromCart,
    setCouponCode,
    freeShippingThreshold,
    remainingForFreeShipping,
    qualifiesForFreeShipping,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-semibold text-charcoal mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Discover our handcrafted bouquets and gifts</p>
        <Link href="/shop" className={cn(buttonVariants())}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shippingCost = qualifiesForFreeShipping ? 0 : 4.99;
  const total = subtotal + shippingCost;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {/* Free Shipping Progress */}
        {!qualifiesForFreeShipping && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for free shipping!
              </p>
              <Progress value={(subtotal / freeShippingThreshold) * 100} className="h-2" />
            </CardContent>
          </Card>
        )}

        {items.map((item) => (
          <Card key={`${item.productId}-${item.variantId}`}>
            <CardContent className="p-4 flex gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                {item.product?.images?.[0] && (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-charcoal">{item.product?.name ?? "Product"}</h3>
                {item.personalisation && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    Message: {item.personalisation}
                  </p>
                )}
                <p className="font-semibold mt-2">
                  {formatPrice(Number(item.product?.price ?? 0) * item.quantity)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.productId, item.variantId)}
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItemQuantity(item.productId, item.quantity - 1, item.variantId)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateItemQuantity(item.productId, item.quantity + 1, item.variantId)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div>
        <Card className="sticky top-24">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-heading text-xl font-semibold">Order Summary</h2>

            {/* Coupon */}
            <div className="flex gap-2">
              <Input
                placeholder="Discount code"
                value={couponCode ?? ""}
                onChange={(e) => setCouponCode(e.target.value || null)}
              />
              <Button variant="outline">Apply</Button>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{qualifiesForFreeShipping ? "Free" : formatPrice(shippingCost)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link href="/checkout" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <div className="flex items-center justify-center gap-4 pt-2">
              <span className="text-xs text-muted-foreground">Secure checkout</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
