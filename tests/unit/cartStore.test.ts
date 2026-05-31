import { describe, it, expect, beforeEach } from "vitest";
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

const mockProduct2: Product = {
  ...mockProduct,
  id: "prod-2",
  slug: "test-product-2",
  name: "Test Product 2",
  price: 49.99,
  sku: "TEST-002",
};

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], couponCode: null });
  });

  it("should start with an empty cart", () => {
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.couponCode).toBeNull();
  });

  it("should add an item", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 1);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].productId).toBe("prod-1");
  });

  it("should increment quantity when adding same item", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 1);
    useCartStore.getState().addItem(mockProduct, 2);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });

  it("should remove an item", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 1);
    useCartStore.getState().removeItem("prod-1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("should update quantity", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 1);
    useCartStore.getState().updateQuantity("prod-1", 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("should remove item when quantity set to 0", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 3);
    useCartStore.getState().updateQuantity("prod-1", 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("should clear the cart", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 1);
    useCartStore.getState().addItem(mockProduct2, 2);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("should set coupon code", () => {
    const { setCouponCode } = useCartStore.getState();
    setCouponCode("WELCOME10");
    expect(useCartStore.getState().couponCode).toBe("WELCOME10");
  });

  it("should get item count", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 2);
    useCartStore.getState().addItem(mockProduct2, 3);
    expect(useCartStore.getState().getItemCount()).toBe(5);
  });

  it("should calculate subtotal", () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, 2);
    expect(useCartStore.getState().getSubtotal()).toBeCloseTo(59.98);
  });
});
