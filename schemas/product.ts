import { z } from "zod";

export const productImageSchema = z.object({
  url: z.string().url(),
  altText: z.string().optional(),
  position: z.number().int().min(0).default(0),
});

export const productVariantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  value: z.string().min(1, "Variant value is required"),
  price: z.number().positive().optional(),
  inventory: z.number().int().min(0).default(0),
  sku: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  comparePrice: z.number().positive().optional(),
  categoryId: z.string().min(1, "Category is required"),
  inventory: z.number().int().min(0).default(0),
  sku: z.string().optional(),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(productImageSchema).default([]),
  variants: z.array(productVariantSchema).default([]),
});

export const updateProductSchema = createProductSchema.partial();

export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  sort: z.enum(["featured", "newest", "price-asc", "price-desc", "best-selling", "most-reviewed"]).default("featured"),
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(50).default(12),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductFilter = z.infer<typeof productFilterSchema>;
