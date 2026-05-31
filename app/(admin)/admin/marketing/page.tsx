"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Ticket, Trash2 } from "lucide-react";

const coupons = [
  { code: "WELCOME10", type: "Percentage", value: "10%", minOrder: "£25", uses: "142/∞", status: "Active", expires: "Never" },
  { code: "FREESHIP", type: "Free Shipping", value: "—", minOrder: "£40", uses: "89/∞", status: "Active", expires: "Never" },
  { code: "LOVE20", type: "Fixed", value: "£20", minOrder: "£60", uses: "23/100", status: "Active", expires: "31 Dec 2025" },
  { code: "SUMMER15", type: "Percentage", value: "15%", minOrder: "£30", uses: "0/50", status: "Scheduled", expires: "31 Aug 2025" },
];

export default function AdminMarketingPage() {
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState("PERCENTAGE");

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
                <Input type="number" placeholder={newType === "PERCENTAGE" ? "10" : "5.00"} />
              </div>
              <div>
                <Label>Minimum Order Value (optional)</Label>
                <Input type="number" placeholder="25.00" />
              </div>
              <Button className="w-full">Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" /> Active Coupons
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                <TableRow key={coupon.code}>
                  <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                  <TableCell className="text-sm">{coupon.type}</TableCell>
                  <TableCell className="font-medium">{coupon.value}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{coupon.minOrder}</TableCell>
                  <TableCell className="text-sm">{coupon.uses}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{coupon.expires}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.status === "Active" ? "default" : "secondary"}>{coupon.status}</Badge>
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
        </CardContent>
      </Card>
    </div>
  );
}
