"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, Clock, Loader2 } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface AnalyticsData {
  totalOrders: number;
  recentRevenue: number;
  avgOrderValue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrderCount: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  guestEmail: string | null;
  total: number;
  status: string;
  createdAt: string;
  user?: { name: string | null; email: string | null } | null;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics").then((r) => r.json()),
      fetch("/api/admin/orders?limit=5").then((r) => r.json()),
    ])
      .then(([analyticsJson, ordersJson]) => {
        if (analyticsJson.success) setAnalytics(analyticsJson.data);
        if (ordersJson.success) setOrders(ordersJson.data);
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

  const stats = [
    { title: "Total Revenue", value: formatPrice(analytics?.recentRevenue ?? 0), change: `${analytics?.recentOrderCount ?? 0} orders`, icon: DollarSign },
    { title: "Orders", value: String(analytics?.totalOrders ?? 0), change: `${analytics?.pendingOrders ?? 0} pending`, icon: ShoppingCart },
    { title: "Products", value: String(analytics?.totalProducts ?? 0), change: "published", icon: Package },
    { title: "Customers", value: String(analytics?.totalCustomers ?? 0), change: "registered", icon: Users },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to Amoré admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-sage flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-sm">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{order.user?.name ?? order.guestEmail ?? "Guest"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatPrice(order.total)}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === "DELIVERED" ? "bg-sage/20 text-sage" :
                        order.status === "PROCESSING" ? "bg-lavender/20 text-lavender" :
                        order.status === "FULFILLED" ? "bg-blush/20 text-blush" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
