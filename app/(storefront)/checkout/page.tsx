import { Metadata } from "next";
import { CheckoutForm } from "@/components/storefront/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Amoré",
  description: "Complete your order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-heading text-3xl font-bold text-charcoal mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
