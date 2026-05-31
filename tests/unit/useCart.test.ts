import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

const mockProduct: Product = {
  id: "prod-1",
  slug: "test-product",
  name: "Test Product",
  description: "A test product",
  price: 29.99,
  comparePrice: null,
  images: [],
  variants: [],
  categoryId: "cat-1",
  inventory: 10,
  sku: "TEST-001",
  isPublished: true,
  publishedAt: new Date(),
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("useCart", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], couponCode: null });
  });

  it("should start with empty cart", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
  });

  it("should add items to cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(mockProduct, 1);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.itemCount).toBe(1);
  });

  it("should calculate free shipping threshold", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.qualifiesForFreeShipping).toBe(false);
    expect(result.current.remainingForFreeShipping).toBe(50);
  });

  it("should qualify for free shipping when subtotal >= 50", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart({ ...mockProduct, price: 60 }, 1);
    });
    expect(result.current.qualifiesForFreeShipping).toBe(true);
    expect(result.current.remainingForFreeShipping).toBe(0);
  });
});
