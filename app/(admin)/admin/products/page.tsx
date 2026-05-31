"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const products = [
  { id: "1", name: "Eternal Rose Bouquet", sku: "AMR-DRY-001", price: "£49.99", inventory: 25, status: "Published", category: "Dried & Preserved", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=100", orders: 42 },
  { id: "2", name: "Spring Garden Bouquet", sku: "AMR-FRH-001", price: "£34.99", inventory: 40, status: "Published", category: "Fresh Bouquets", image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=100", orders: 28 },
  { id: "3", name: "Lavender Dreams", sku: "AMR-DRY-002", price: "£29.99", inventory: 35, status: "Published", category: "Dried & Preserved", image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=100", orders: 19 },
  { id: "4", name: "Romantic Red Roses", sku: "AMR-FRH-002", price: "£44.99", inventory: 30, status: "Published", category: "Fresh Bouquets", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=100", orders: 55 },
  { id: "5", name: "Luxury Gift Hamper", sku: "AMR-GFT-001", price: "£89.99", inventory: 15, status: "Published", category: "Gift Hampers", image: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=100", orders: 31 },
  { id: "6", name: "Wildflower Meadow", sku: "AMR-FRH-003", price: "£32.99", inventory: 20, status: "Draft", category: "Fresh Bouquets", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=100", orders: 14 },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Products</h1>
          <p className="text-muted-foreground mt-1">{products.length} products</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>
                    <span className={`text-sm ${product.inventory < 20 ? "text-destructive" : "text-muted-foreground"}`}>
                      {product.inventory}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === "Published" ? "default" : "secondary"}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.orders}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
