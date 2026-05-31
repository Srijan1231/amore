"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import type { Product, Category, ApiResponse } from "@/types";

type ProductWithRating = Product & { avgRating: number; reviewCount: number };

interface ShopPageContentProps {
  initialCategory?: string;
  initialSearch?: string;
}

export function ShopPageContent({ initialCategory, initialSearch }: ShopPageContentProps) {
  const [products, setProducts] = useState<ProductWithRating[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch ?? "");
  const [category, setCategory] = useState(initialCategory ?? "all");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [total, setTotal] = useState(0);
  const { addToCart } = useCart();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "all") params.set("category", category);
      if (search) params.set("search", search);
      if (sort !== "featured") params.set("sort", sort);
      if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]));
      if (priceRange[1] < 150) params.set("maxPrice", String(priceRange[1]));
      params.set("limit", "24");

      const res = await fetch(`/api/products?${params.toString()}`);
      const json: ApiResponse<ProductWithRating[]> = await res.json();
      if (json.success && json.data) {
        setProducts(json.data);
        setTotal(json.meta?.total ?? json.data.length);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, priceRange]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const activeFilters: string[] = [];
  if (category !== "all") activeFilters.push(category);
  if (priceRange[0] > 0 || priceRange[1] < 150) activeFilters.push(`£${priceRange[0]}–£${priceRange[1]}`);

  const allCategories = [{ slug: "all", name: "All" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

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
          <Select value={category} onValueChange={(v) => { if (v) setCategory(v); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => { if (v) setSort(v); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="sm:hidden" />}>
              <SlidersHorizontal className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Filters</SheetTitle>
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  {allCategories.map((c) => (
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
      <p className="text-sm text-muted-foreground mb-6">{total} products</p>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">No products match your filters</p>
          <Button variant="outline" onClick={() => { setCategory("all"); setPriceRange([0, 150]); setSearch(""); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
