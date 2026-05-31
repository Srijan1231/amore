"use client";

import { useState, useCallback, useMemo } from "react";
import type { Product } from "@/types";

export function useSearch(products: Product[] = []) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  }, [query, products]);

  const clearSearch = useCallback(() => setQuery(""), []);

  return {
    query,
    setQuery,
    results,
    clearSearch,
    hasResults: results.length > 0,
  };
}
