import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Amoré",
  description: "Read the terms and conditions for using Amoré's website and services.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-heading text-4xl font-bold text-charcoal mb-8">Terms &amp; Conditions</h1>
      <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal">
        <p>Last updated: May 2025</p>
        <h2>1. Introduction</h2>
        <p>Welcome to Amoré (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). These Terms and Conditions govern your use of our website amore-gifts.com and any purchases made through it.</p>
        <h2>2. Products &amp; Ordering</h2>
        <p>All products are subject to availability. We reserve the right to modify product descriptions, prices, and availability without notice. Substitutions may be made for fresh flower arrangements based on seasonal availability.</p>
        <h2>3. Pricing &amp; Payment</h2>
        <p>All prices are displayed in British Pounds Sterling (GBP) and include VAT where applicable. Payment is processed securely through Stripe.</p>
        <h2>4. Delivery</h2>
        <p>We offer Standard (2–3 working days), Express (next day), and Same-Day delivery options within the United Kingdom. Delivery dates are estimates and not guaranteed.</p>
        <h2>5. Returns &amp; Refunds</h2>
        <p>Non-perishable items may be returned within 14 days. Fresh flowers cannot be returned. Please see our <a href="/returns">Returns &amp; Refunds</a> policy for full details.</p>
        <h2>6. Contact</h2>
        <p>For questions about these terms, please contact us at hello@amore-gifts.com.</p>
      </div>
    </div>
  );
}
