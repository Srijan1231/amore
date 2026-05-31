import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalOrders,
      recentOrders,
      totalCustomers,
      totalProducts,
      pendingOrders,
    ] = await Promise.all([
      db.order.count(),
      db.order.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { total: true, status: true, createdAt: true },
      }),
      db.user.count({ where: { role: "CUSTOMER" } }),
      db.product.count({ where: { isPublished: true } }),
      db.order.count({ where: { status: "PENDING" } }),
    ]);

    const paidOrders = recentOrders.filter((o: { total: unknown; status: string; createdAt: Date }) => o.status !== "CANCELLED" && o.status !== "REFUNDED");
    const revenue = paidOrders.reduce((sum: number, o: { total: unknown; status: string; createdAt: Date }) => sum + Number(o.total), 0);
    const avgOrderValue = paidOrders.length > 0 ? revenue / paidOrders.length : 0;

    return successResponse({
      totalOrders,
      recentRevenue: revenue,
      avgOrderValue,
      totalCustomers,
      totalProducts,
      pendingOrders,
      recentOrderCount: recentOrders.length,
    });
  } catch {
    return errorResponse("Failed to fetch analytics", 500);
  }
}
