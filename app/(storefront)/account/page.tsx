import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Package, Heart, MapPin, User, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "My Account | Amoré",
  description: "Manage your Amoré account — view orders, wishlist, and saved addresses.",
};

const sections = [
  { icon: Package, title: "My Orders", desc: "Track your orders and view order history", href: "/account/orders" },
  { icon: Heart, title: "Wishlist", desc: "Items you've saved for later", href: "/wishlist" },
  { icon: MapPin, title: "Addresses", desc: "Manage your delivery addresses", href: "/account/addresses" },
  { icon: Settings, title: "Account Settings", desc: "Update your email, password, and preferences", href: "/account/settings" },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-blush/20 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold text-charcoal">My Account</h1>
          <p className="text-muted-foreground">Welcome back! Manage your account below.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((s) => (
          <Link key={s.title} href={s.href}>
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <s.icon className="h-5 w-5 text-primary" />
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
