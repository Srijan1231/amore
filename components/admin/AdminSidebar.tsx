"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
  Megaphone,
  Settings,
  Store,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "CMS", href: "/admin/cms", icon: FileText },
  { name: "Marketing", href: "/admin/marketing", icon: Megaphone },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "sticky top-0 h-screen bg-charcoal text-cream flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-cream/10">
        {!collapsed && (
          <Link href="/admin" className="font-heading text-xl font-bold text-blush">
            Amoré
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-cream/70 hover:text-cream hover:bg-cream/10 shrink-0"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-cream/70 hover:text-cream hover:bg-cream/10"
              )}
              title={collapsed ? link.name : undefined}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Storefront Link */}
      <div className="p-4 border-t border-cream/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-cream/50 hover:text-cream hover:bg-cream/10 text-sm transition-colors"
        >
          <Store className="h-5 w-5 shrink-0" />
          {!collapsed && <span>View Store</span>}
        </Link>
      </div>
    </aside>
  );
}
