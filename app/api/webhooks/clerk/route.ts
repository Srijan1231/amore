import { NextRequest } from "next/server";
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
    const body = await request.json();
    const { type, data } = body as { type: string; data: ClerkUserData };

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
