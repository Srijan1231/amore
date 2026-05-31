"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Search, CheckCircle2, Truck, Box, Clock } from "lucide-react";

const statusSteps = [
  { status: "PENDING", label: "Order Placed", icon: Clock },
  { status: "PROCESSING", label: "Being Prepared", icon: Box },
  { status: "FULFILLED", label: "Shipped", icon: Truck },
  { status: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [tracked, setTracked] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <Package className="h-10 w-10 text-primary mx-auto mb-3" />
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Track Your Order</h1>
        <p className="text-muted-foreground">Enter your order number to see the latest status</p>
      </div>

      <div className="flex gap-3 mb-8">
        <Input
          placeholder="AMR-XXXXX-YYYY"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setTracked(!!orderNumber)}>
          <Search className="h-4 w-4 mr-2" /> Track
        </Button>
      </div>

      {tracked && (
        <Card>
          <CardHeader>
            <CardTitle>Order {orderNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {statusSteps.map((step, i) => (
                <div key={step.status} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= 1 ? "bg-sage text-white" : "bg-muted text-muted-foreground"}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`font-medium ${i <= 1 ? "text-charcoal" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    {i === 1 && <p className="text-sm text-muted-foreground">Your bouquet is being lovingly prepared</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
