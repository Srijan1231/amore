"use client";

import Link from "next/link";
import { ShoppingBag, Search, Heart, Menu, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections/all" },
  { name: "Gift Finder", href: "/gift-finder" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Announcement Bar */}
      <div className="bg-mauve text-primary-foreground text-center py-2 text-sm tracking-wide">
        Free delivery on orders over £50 | Use code <strong>WELCOME10</strong> for 10% off
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
            <SheetTrigger className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" render={<span />}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Amoré
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/search" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <Link href="/wishlist" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden sm:flex")} aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/account" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")} aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
