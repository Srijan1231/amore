import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, Package, Repeat } from "lucide-react";

export default function AdminAnalyticsPage() {
  const metrics = [
    { title: "Revenue (30d)", value: "£12,450", change: "+12.5%", up: true, icon: DollarSign },
    { title: "Orders (30d)", value: "156", change: "+8.2%", up: true, icon: ShoppingCart },
    { title: "Avg Order Value", value: "£79.81", change: "+4.1%", up: true, icon: Package },
    { title: "New Customers", value: "42", change: "+15.4%", up: true, icon: Users },
    { title: "Conversion Rate", value: "3.2%", change: "-0.3%", up: false, icon: TrendingDown },
    { title: "Page Views", value: "8,421", change: "+22.1%", up: true, icon: Eye },
    { title: "Return Rate", value: "2.1%", change: "-0.5%", up: true, icon: Repeat },
    { title: "Cart Abandonment", value: "68%", change: "-3.2%", up: true, icon: ShoppingCart },
  ];

  const topProducts = [
    { name: "Romantic Red Roses", orders: 55, revenue: "£2,474.45" },
    { name: "Eternal Rose Bouquet", orders: 42, revenue: "£2,099.58" },
    { name: "Luxury Gift Hamper", orders: 31, revenue: "£2,789.69" },
    { name: "Spring Garden Bouquet", orders: 28, revenue: "£979.72" },
    { name: "Lavender Dreams", orders: 19, revenue: "£569.81" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Analytics</h1>
        <p className="text-muted-foreground mt-1">Performance overview for the last 30 days</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.revenue}</p>
                    <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
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
