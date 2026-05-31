import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, Clock } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "£12,450", change: "+12.5%", icon: DollarSign },
    { title: "Orders", value: "156", change: "+8.2%", icon: ShoppingCart },
    { title: "Products", value: "42", change: "+3", icon: Package },
    { title: "Customers", value: "289", change: "+15.4%", icon: Users },
  ];

  const recentOrders = [
    { id: "AMR-00156", customer: "Sarah J.", total: "£89.99", status: "Processing", time: "2 hours ago" },
    { id: "AMR-00155", customer: "Emma T.", total: "£49.99", status: "Fulfilled", time: "5 hours ago" },
    { id: "AMR-00154", customer: "James R.", total: "£64.99", status: "Delivered", time: "1 day ago" },
    { id: "AMR-00153", customer: "Guest", total: "£34.99", status: "Pending", time: "1 day ago" },
    { id: "AMR-00152", customer: "Lucy M.", total: "£129.99", status: "Delivered", time: "2 days ago" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to Amoré admin</p>
      </div>

      {/* Stats Grid */}
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
                <TrendingUp className="h-3 w-3" /> {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{order.total}</p>
                  <div className="flex items-center gap-2 justify-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "Delivered" ? "bg-sage/20 text-sage" :
                      order.status === "Processing" ? "bg-lavender/20 text-lavender" :
                      order.status === "Fulfilled" ? "bg-blush/20 text-blush" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {order.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
