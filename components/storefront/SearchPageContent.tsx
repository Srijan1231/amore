"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-4">Search</h1>
      </div>

      <div className="relative mb-8">
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
        <div>
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

      {query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Showing results for &ldquo;<strong>{query}</strong>&rdquo;
          </p>
          <Link href={`/shop?search=${encodeURIComponent(query)}`} className="text-primary hover:underline mt-2 inline-block">
            View all results in Shop
          </Link>
        </div>
      )}
    </div>
  );
}
