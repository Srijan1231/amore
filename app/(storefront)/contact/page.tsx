import { Metadata } from "next";
import { ContactPageContent } from "@/components/storefront/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us | Amoré",
  description: "Get in touch with the Amoré team. We're here to help with orders, custom requests, and corporate gifting enquiries.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-3">Get in Touch</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Have a question about your order, need help choosing the perfect gift, or want to discuss corporate gifting? We&apos;d love to hear from you.
        </p>
      </div>
      <ContactPageContent />
    </div>
  );
}
