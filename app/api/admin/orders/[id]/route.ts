import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api";
import { updateOrderStatusSchema } from "@/schemas/order";

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await db.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: { include: { images: true } } } },
        user: true,
        shippingAddress: true,
        coupon: true,
      },
    });

    if (!order) return errorResponse("Order not found", 404);

    return successResponse({
      ...order,
      subtotal: Number(order.subtotal),
      total: Number(order.total),
      shippingCost: Number(order.shippingCost),
      discount: Number(order.discount),
    });
  } catch {
    return errorResponse("Failed to fetch order", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateOrderStatusSchema.safeParse(body);

    if (!parsed.success) return errorResponse("Invalid data");

    const order = await db.order.update({
      where: { id },
      data: {
        status: parsed.data.status,
        notes: parsed.data.notes,
      },
    });

    return successResponse(order);
  } catch {
    return errorResponse("Failed to update order", 500);
  }
}
