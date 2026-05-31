"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/storefront/ProductCard";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

type ProductWithRating = Product & { avgRating: number; reviewCount: number };

const suggestions = [
  { name: "Roses", href: "/shop?search=roses" },
  { name: "Anniversary", href: "/shop?search=anniversary" },
  { name: "Dried Flowers", href: "/shop?category=dried-preserved" },
  { name: "Gift Hampers", href: "/shop?category=gift-hampers" },
  { name: "Under £30", href: "/shop?maxPrice=30" },
  { name: "Same-Day Delivery", href: "/shop" },
];

export function SearchPageContent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/products?search=${encodeURIComponent(query)}&limit=12`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            setResults(json.data);
          } else {
            setResults([]);
          }
          setSearched(true);
        })
        .catch(() => { setResults([]); setSearched(true); })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">Search</h1>
      </div>

      <div className="relative mb-8 max-w-2xl mx-auto">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for bouquets, gifts, occasions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 text-lg"
          autoFocus
        />
      </div>

      {!query && (
        <div className="max-w-2xl mx-auto">
          <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">
            Popular Searches
          </h2>
          <div className="flex flex-wrap gap-3">
            {suggestions.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="px-4 py-2 bg-cream rounded-full text-sm text-charcoal hover:bg-blush/30 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-2">
            No results found for &ldquo;<strong>{query}</strong>&rdquo;
          </p>
          <Link href="/shop" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            {results.length} results for &ldquo;<strong>{query}</strong>&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
