"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const customers = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", orders: 5, totalSpent: "£324.95", lastOrder: "31 May 2025", status: "Active" },
  { id: "2", name: "Emma Thompson", email: "emma@example.com", orders: 3, totalSpent: "£189.97", lastOrder: "30 May 2025", status: "Active" },
  { id: "3", name: "James Roberts", email: "james@example.com", orders: 2, totalSpent: "£94.98", lastOrder: "29 May 2025", status: "Active" },
  { id: "4", name: "Lucy Mitchell", email: "lucy@example.com", orders: 8, totalSpent: "£567.92", lastOrder: "28 May 2025", status: "VIP" },
  { id: "5", name: "Oliver Williams", email: "oliver@example.com", orders: 1, totalSpent: "£49.99", lastOrder: "25 May 2025", status: "New" },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

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
              {filtered.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "VIP" ? "default" : "secondary"}>
                      {customer.status}
                    </Badge>
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
