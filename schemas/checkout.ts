import { z } from "zod";

export const contactInfoSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number").optional(),
});

export const deliveryAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  line1: z.string().min(1, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  county: z.string().optional(),
  postcode: z.string().min(3, "Postcode is required").max(10),
  country: z.string().min(1, "Country is required"),
});

export const deliveryMethodSchema = z.object({
  method: z.enum(["standard", "express", "same-day", "collection"]),
  date: z.string().optional(),
  timeSlot: z.string().optional(),
});

export const giftOptionsSchema = z.object({
  giftMessage: z.string().max(500).optional(),
  giftWrapping: z.boolean().optional(),
  ribbonColour: z.string().optional(),
});

export const checkoutSchema = z.object({
  contact: contactInfoSchema,
  delivery: deliveryAddressSchema,
  deliveryMethod: deliveryMethodSchema,
  giftOptions: giftOptionsSchema.optional(),
  couponCode: z.string().optional(),
});

export const couponValidationSchema = z.object({
  code: z.string().min(1, "Coupon code is required").max(50),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  body: z.string().min(10, "Review must be at least 10 characters").max(2000),
  photos: z.array(z.string().url()).max(5).default([]),
});

export type ContactInfoInput = z.infer<typeof contactInfoSchema>;
export type DeliveryAddressInput = z.infer<typeof deliveryAddressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
