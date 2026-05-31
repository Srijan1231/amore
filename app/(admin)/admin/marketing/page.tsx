"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Ticket, Trash2, Loader2 } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  minOrderValue: number | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt: string | null;
  startsAt: string | null;
}

export default function AdminMarketingPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState("PERCENTAGE");
  const [newValue, setNewValue] = useState("");
  const [newMinOrder, setNewMinOrder] = useState("");

  const fetchCoupons = useCallback(() => {
    fetch("/api/admin/marketing")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setCoupons(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const handleCreate = async () => {
    if (!newCode || !newValue) return;
    setCreating(true);

    try {
      const res = await fetch("/api/admin/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCode.toUpperCase(),
          type: newType,
          value: parseFloat(newValue),
          minOrderValue: newMinOrder ? parseFloat(newMinOrder) : undefined,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setNewCode("");
        setNewValue("");
        setNewMinOrder("");
        fetchCoupons();
      }
    } catch {
      // handle error silently
    } finally {
      setCreating(false);
    }
  };

  const formatType = (type: string) => {
    switch (type) {
      case "PERCENTAGE": return "Percentage";
      case "FIXED": return "Fixed";
      case "FREE_SHIPPING": return "Free Shipping";
      default: return type;
    }
  };

  const formatValue = (coupon: Coupon) => {
    if (coupon.type === "PERCENTAGE") return `${coupon.value}%`;
    if (coupon.type === "FREE_SHIPPING") return "—";
    return formatPrice(coupon.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Marketing</h1>
          <p className="text-muted-foreground mt-1">Manage discount codes and promotions</p>
        </div>
        <Dialog>
          <DialogTrigger render={<Button />}>
            <Plus className="h-4 w-4 mr-2" /> Create Coupon
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Coupon Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Coupon Code</Label>
                <Input value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())} placeholder="e.g. SUMMER25" />
              </div>
              <div>
                <Label>Discount Type</Label>
                <Select value={newType} onValueChange={(v) => { if (v) setNewType(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount</SelectItem>
                    <SelectItem value="FREE_SHIPPING">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value</Label>
                <Input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder={newType === "PERCENTAGE" ? "10" : "5.00"} />
              </div>
              <div>
                <Label>Minimum Order Value (optional)</Label>
                <Input type="number" value={newMinOrder} onChange={(e) => setNewMinOrder(e.target.value)} placeholder="25.00" />
              </div>
              <Button className="w-full" onClick={handleCreate} disabled={creating}>
                {creating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Create Coupon
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" /> Coupons
          </CardTitle>
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
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Min Order</TableHead>
                  <TableHead>Uses</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                    <TableCell className="text-sm">{formatType(coupon.type)}</TableCell>
                    <TableCell className="font-medium">{formatValue(coupon)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {coupon.minOrderValue ? formatPrice(coupon.minOrderValue) : "—"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {coupon.usedCount}/{coupon.maxUses ?? "∞"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {coupon.expiresAt ? formatDate(coupon.expiresAt) : "Never"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={coupon.isActive ? "default" : "secondary"}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
