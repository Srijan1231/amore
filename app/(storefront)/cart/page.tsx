import { Metadata } from "next";
import { CartPageContent } from "@/components/storefront/CartPageContent";

export const metadata: Metadata = {
  title: "Your Cart | Amoré",
  description: "Review your shopping cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-charcoal mb-8">Your Cart</h1>
      <CartPageContent />
    </div>
  );
}
