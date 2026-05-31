import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";
import { errorResponse } from "@/lib/api";

interface ClerkUserData {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name: string | null;
  last_name: string | null;
  phone_numbers: Array<{ phone_number: string }>;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      return errorResponse("Webhook secret not configured", 500);
    }

    const body = await request.text();
    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return errorResponse("Missing webhook signature headers", 400);
    }

    const wh = new Webhook(secret);
    const payload = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as { type: string; data: ClerkUserData };

    const { type, data } = payload;

    switch (type) {
      case "user.created": {
        await db.user.create({
          data: {
            clerkId: data.id,
            email: data.email_addresses[0]?.email_address ?? "",
            name: [data.first_name, data.last_name].filter(Boolean).join(" ") || null,
            phone: data.phone_numbers?.[0]?.phone_number ?? null,
          },
        });
        break;
      }

      case "user.updated": {
        await db.user.update({
          where: { clerkId: data.id },
          data: {
            email: data.email_addresses[0]?.email_address,
            name: [data.first_name, data.last_name].filter(Boolean).join(" ") || null,
            phone: data.phone_numbers?.[0]?.phone_number ?? null,
          },
        });
        break;
      }

      case "user.deleted": {
        await db.user.delete({ where: { clerkId: data.id } });
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch {
    return errorResponse("Webhook processing failed", 500);
  }
}
