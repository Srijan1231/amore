import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "@/hooks/useSearch";
import type { Product } from "@/types";

const makeProduct = (overrides: Partial<Product>): Product => ({
  id: "prod-1",
  slug: "test",
  name: "Test",
  description: "desc",
  price: 10,
  comparePrice: null,
  images: [],
  variants: [],
  categoryId: "cat-1",
  inventory: 10,
  sku: "SKU-1",
  isPublished: true,
  publishedAt: new Date(),
  tags: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const mockProducts: Product[] = [
  makeProduct({ id: "1", slug: "eternal-rose", name: "Eternal Rose Bouquet", description: "A beautiful dried rose", tags: ["romantic", "dried"] }),
  makeProduct({ id: "2", slug: "spring-garden", name: "Spring Garden Bouquet", description: "Fresh seasonal flowers", tags: ["fresh", "spring"] }),
  makeProduct({ id: "3", slug: "lavender-dreams", name: "Lavender Dreams", description: "Dried lavender arrangement", tags: ["dried", "calming"] }),
];

describe("useSearch", () => {
  it("should return no results when query is empty", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    expect(result.current.results).toHaveLength(0);
  });

  it("should filter by name", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    act(() => {
      result.current.setQuery("rose");
    });
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe("Eternal Rose Bouquet");
  });

  it("should filter by description", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    act(() => {
      result.current.setQuery("seasonal");
    });
    expect(result.current.results).toHaveLength(1);
  });

  it("should filter by tags", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    act(() => {
      result.current.setQuery("dried");
    });
    expect(result.current.results).toHaveLength(2);
  });

  it("should be case-insensitive", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    act(() => {
      result.current.setQuery("LAVENDER");
    });
    expect(result.current.results).toHaveLength(1);
  });

  it("should indicate hasResults correctly", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    act(() => {
      result.current.setQuery("nonexistent");
    });
    expect(result.current.hasResults).toBe(false);
  });

  it("should clear search", () => {
    const { result } = renderHook(() => useSearch(mockProducts));
    act(() => {
      result.current.setQuery("rose");
    });
    expect(result.current.results).toHaveLength(1);
    act(() => {
      result.current.clearSearch();
    });
    expect(result.current.query).toBe("");
    expect(result.current.results).toHaveLength(0);
  });
});
