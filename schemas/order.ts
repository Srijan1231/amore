import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  county: z.string().optional(),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().default("GB"),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1),
  personalisation: z.string().max(500).optional(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  shippingAddress: addressSchema,
  shippingMethod: z.enum(["standard", "express", "same-day", "collection"]),
  giftMessage: z.string().max(500).optional(),
  couponCode: z.string().optional(),
  guestEmail: z.string().email().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "FULFILLED", "DELIVERED", "CANCELLED", "REFUNDED"]),
  notes: z.string().optional(),
});

export const orderFilterSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "FULFILLED", "DELIVERED", "CANCELLED", "REFUNDED"]).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(50).default(20),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderFilter = z.infer<typeof orderFilterSchema>;
