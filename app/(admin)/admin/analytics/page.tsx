"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface AnalyticsData {
  totalOrders: number;
  recentRevenue: number;
  avgOrderValue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrderCount: number;
}

interface TopProduct {
  id: string;
  name: string;
  slug: string;
  _count: { orderItems: number };
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics").then((r) => r.json()),
      fetch("/api/admin/products?limit=5&sort=orders").then((r) => r.json()),
    ])
      .then(([analyticsJson, productsJson]) => {
        if (analyticsJson.success) setData(analyticsJson.data);
        if (productsJson.success && Array.isArray(productsJson.data)) {
          setTopProducts(productsJson.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const metrics = [
    { title: "Revenue (30d)", value: formatPrice(data?.recentRevenue ?? 0), change: `${data?.recentOrderCount ?? 0} orders`, up: true, icon: DollarSign },
    { title: "Orders (30d)", value: String(data?.totalOrders ?? 0), change: `${data?.pendingOrders ?? 0} pending`, up: true, icon: ShoppingCart },
    { title: "Avg Order Value", value: formatPrice(data?.avgOrderValue ?? 0), change: "calculated", up: true, icon: Package },
    { title: "Customers", value: String(data?.totalCustomers ?? 0), change: "registered", up: true, icon: Users },
    { title: "Products", value: String(data?.totalProducts ?? 0), change: "published", up: true, icon: Package },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Analytics</h1>
        <p className="text-muted-foreground mt-1">Performance overview for the last 30 days</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs flex items-center gap-1 mt-1 ${metric.up ? "text-sage" : "text-destructive"}`}>
                {metric.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No product data yet</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{product._count.orderItems} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              Chart integration point (Recharts / Chart.js)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
