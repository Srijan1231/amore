"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types";

const sampleProducts: (Product & { avgRating: number; reviewCount: number })[] = [
  { id: "1", slug: "eternal-rose-bouquet", name: "Eternal Rose Bouquet", description: "", price: 49.99, comparePrice: 65, images: [{ id: "1", productId: "1", url: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600", altText: "Eternal Rose Bouquet", position: 0 }], variants: [], categoryId: "2", category: { id: "2", slug: "dried-preserved", name: "Dried & Preserved", description: null, imageUrl: null, parentId: null }, inventory: 25, sku: "AMR-DRY-001", isPublished: true, publishedAt: new Date(), tags: ["roses", "bestseller"], createdAt: new Date(), updatedAt: new Date(), avgRating: 4.9, reviewCount: 42 },
  { id: "2", slug: "spring-garden-bouquet", name: "Spring Garden Bouquet", description: "", price: 34.99, comparePrice: null, images: [{ id: "2", productId: "2", url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600", altText: "Spring Garden Bouquet", position: 0 }], variants: [], categoryId: "1", category: { id: "1", slug: "fresh-bouquets", name: "Fresh Bouquets", description: null, imageUrl: null, parentId: null }, inventory: 40, sku: "AMR-FRH-001", isPublished: true, publishedAt: new Date(), tags: ["spring", "fresh"], createdAt: new Date(), updatedAt: new Date(), avgRating: 4.5, reviewCount: 28 },
  { id: "3", slug: "lavender-dreams", name: "Lavender Dreams", description: "", price: 29.99, comparePrice: null, images: [{ id: "3", productId: "3", url: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600", altText: "Lavender Dreams", position: 0 }], variants: [], categoryId: "2", category: { id: "2", slug: "dried-preserved", name: "Dried & Preserved", description: null, imageUrl: null, parentId: null }, inventory: 35, sku: "AMR-DRY-002", isPublished: true, publishedAt: new Date(), tags: ["lavender", "dried"], createdAt: new Date(), updatedAt: new Date(), avgRating: 4.7, reviewCount: 19 },
  { id: "4", slug: "romantic-red-roses", name: "Romantic Red Roses", description: "", price: 44.99, comparePrice: 55, images: [{ id: "4", productId: "4", url: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600", altText: "Romantic Red Roses", position: 0 }], variants: [], categoryId: "1", category: { id: "1", slug: "fresh-bouquets", name: "Fresh Bouquets", description: null, imageUrl: null, parentId: null }, inventory: 30, sku: "AMR-FRH-002", isPublished: true, publishedAt: new Date(), tags: ["roses", "romantic"], createdAt: new Date(), updatedAt: new Date(), avgRating: 4.8, reviewCount: 55 },
  { id: "5", slug: "luxury-gift-hamper", name: "Luxury Gift Hamper", description: "", price: 89.99, comparePrice: 110, images: [{ id: "5", productId: "5", url: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=600", altText: "Luxury Gift Hamper", position: 0 }], variants: [], categoryId: "3", category: { id: "3", slug: "gift-hampers", name: "Gift Hampers", description: null, imageUrl: null, parentId: null }, inventory: 15, sku: "AMR-GFT-001", isPublished: true, publishedAt: new Date(), tags: ["luxury", "hamper"], createdAt: new Date(), updatedAt: new Date(), avgRating: 5.0, reviewCount: 31 },
  { id: "6", slug: "wildflower-meadow", name: "Wildflower Meadow", description: "", price: 32.99, comparePrice: null, images: [{ id: "6", productId: "6", url: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600", altText: "Wildflower Meadow", position: 0 }], variants: [], categoryId: "1", category: { id: "1", slug: "fresh-bouquets", name: "Fresh Bouquets", description: null, imageUrl: null, parentId: null }, inventory: 20, sku: "AMR-FRH-003", isPublished: true, publishedAt: new Date(), tags: ["wildflower", "natural"], createdAt: new Date(), updatedAt: new Date(), avgRating: 4.6, reviewCount: 14 },
];

const categories = [
  { slug: "all", name: "All" },
  { slug: "fresh-bouquets", name: "Fresh Bouquets" },
  { slug: "dried-preserved", name: "Dried & Preserved" },
  { slug: "gift-hampers", name: "Gift Hampers" },
];

export function ShopPageContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 150]);

  const filtered = useMemo(() => {
    let result = sampleProducts;

    if (category !== "all") {
      result = result.filter((p) => p.category?.slug === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }

    result = result.filter(
      (p) => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "most-reviewed":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [search, category, sort, priceRange]);

  const activeFilters = [];
  if (category !== "all") activeFilters.push(category);
  if (priceRange[0] > 0 || priceRange[1] < 150) activeFilters.push(`£${priceRange[0]}–£${priceRange[1]}`);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-3">
          {/* Category filter */}
          <Select value={category} onValueChange={(v) => { if (v) setCategory(v); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sort} onValueChange={(v) => { if (v) setSort(v); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="most-reviewed">Most Reviewed</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="sm:hidden" />}>
              <SlidersHorizontal className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Filters</SheetTitle>
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  {categories.map((c) => (
                    <div key={c.slug} className="flex items-center gap-2 mb-2">
                      <Checkbox
                        checked={category === c.slug}
                        onCheckedChange={() => setCategory(c.slug)}
                        id={`cat-${c.slug}`}
                      />
                      <Label htmlFor={`cat-${c.slug}`}>{c.name}</Label>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    min={0}
                    max={150}
                    step={5}
                    value={priceRange}
                    onValueChange={(v) => setPriceRange(Array.isArray(v) ? [...v] : [v])}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    £{priceRange[0]} — £{priceRange[1]}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {activeFilters.map((f) => (
            <Badge key={f} variant="secondary" className="gap-1">
              {f}
              <X className="h-3 w-3 cursor-pointer" onClick={() => { setCategory("all"); setPriceRange([0, 150]); }} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={() => { setCategory("all"); setPriceRange([0, 150]); setSearch(""); }}>
            Clear all
          </Button>
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-muted-foreground mb-6">{filtered.length} products</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">No products match your filters</p>
          <Button variant="outline" onClick={() => { setCategory("all"); setPriceRange([0, 150]); setSearch(""); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
