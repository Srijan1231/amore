"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface Customer {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  _count: { orders: number };
  orders: { total: number; createdAt: string }[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/customers?limit=100")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setCustomers(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = search
    ? customers.filter((c) =>
        (c.name?.toLowerCase().includes(search.toLowerCase())) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      )
    : customers;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal">Customers</h1>
        <p className="text-muted-foreground mt-1">{customers.length} registered customers</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((customer) => {
                  const totalSpent = customer.orders.reduce((sum: number, o: { total: number }) => sum + Number(o.total), 0);
                  const lastOrderDate = customer.orders.length > 0 ? customer.orders[0].createdAt : null;
                  const status = customer._count.orders >= 5 ? "VIP" : customer._count.orders >= 1 ? "Active" : "New";

                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{customer.name ?? "—"}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{customer._count.orders}</TableCell>
                      <TableCell className="font-medium">{formatPrice(totalSpent)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {lastOrderDate ? formatDate(lastOrderDate) : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status === "VIP" ? "default" : "secondary"}>
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
