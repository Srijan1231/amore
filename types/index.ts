export type Role = "CUSTOMER" | "EDITOR" | "ADMIN";
export type OrderStatus = "PENDING" | "PROCESSING" | "FULFILLED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type PaymentStatus = "PENDING" | "PAID" | "PARTIALLY_REFUNDED" | "REFUNDED" | "FAILED";
export type DiscountType = "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: Role;
  clerkId: string | null;
  createdAt: Date;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  images: ProductImage[];
  variants: ProductVariant[];
  categoryId: string;
  category?: Category;
  inventory: number;
  sku: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  tags: string[];
  seo?: SEOMeta | null;
  reviews?: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  price: number | null;
  inventory: number;
  sku: string | null;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  position: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  children?: Category[];
  products?: Product[];
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null;
  user?: User | null;
  guestEmail: string | null;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress?: Address;
  addressId: string;
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  discount: number;
  total: number;
  couponId: string | null;
  coupon?: Coupon | null;
  giftMessage: string | null;
  paymentIntent: string | null;
  paymentStatus: PaymentStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  variantId: string | null;
  quantity: number;
  price: number;
  personalisation: string | null;
}

export interface Address {
  id: string;
  userId: string | null;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string | null;
  city: string;
  county: string | null;
  postcode: string;
  country: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string | null;
  user?: User | null;
  rating: number;
  title: string | null;
  body: string;
  photos: string[];
  isVerified: boolean;
  isPublished: boolean;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrderValue: number | null;
  maxUses: number | null;
  useCount: number;
  startsAt: Date | null;
  expiresAt: Date | null;
  isActive: boolean;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: Date;
}

export interface SEOMeta {
  id: string;
  productId: string | null;
  title: string;
  description: string;
  ogImage: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  authorId: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
  personalisation: string | null;
  product?: Product;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    cursor?: string | null;
  };
}
