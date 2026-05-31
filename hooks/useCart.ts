"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

export function useCart() {
  const store = useCartStore();

  const addToCart = (product: Product, quantity = 1, variantId?: string | null, personalisation?: string | null) => {
    store.addItem(product, quantity, variantId, personalisation);
  };

  const removeFromCart = (productId: string, variantId?: string | null) => {
    store.removeItem(productId, variantId);
  };

  const updateItemQuantity = (productId: string, quantity: number, variantId?: string | null) => {
    store.updateQuantity(productId, quantity, variantId);
  };

  const freeShippingThreshold = 50;
  const subtotal = store.getSubtotal();
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  return {
    items: store.items,
    itemCount: store.getItemCount(),
    subtotal,
    couponCode: store.couponCode,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart: store.clearCart,
    setCouponCode: store.setCouponCode,
    freeShippingThreshold,
    remainingForFreeShipping,
    qualifiesForFreeShipping,
  };
}
