import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds | Amoré",
  description: "Learn about Amoré's returns and refunds policy for bouquets, gifts, and hampers.",
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-heading text-4xl font-bold text-charcoal mb-8">Returns &amp; Refunds</h1>
      <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal">
        <p>We want you to love every gift from Amoré. If something isn&apos;t right, we&apos;re here to help.</p>
        <h2>Non-Perishable Items</h2>
        <p>Preserved flowers, crochet bouquets, and gift items can be returned within 14 days of delivery for a full refund. Items must be in their original condition and packaging.</p>
        <h2>Fresh Flower Bouquets</h2>
        <p>Due to their perishable nature, fresh flower bouquets cannot be returned. However, if your flowers arrive damaged or wilted, please contact us within 24 hours with photos and we&apos;ll arrange a replacement or full refund.</p>
        <h2>Gift Hampers</h2>
        <p>If any items in your gift hamper arrive damaged, contact us within 48 hours. We&apos;ll replace the damaged items or provide a partial refund.</p>
        <h2>How to Return</h2>
        <ol>
          <li>Contact us at hello@amore-gifts.com with your order number</li>
          <li>We&apos;ll provide a prepaid return label</li>
          <li>Pack the item securely and drop off at your nearest post office</li>
          <li>Refunds are processed within 5–7 working days of receiving the return</li>
        </ol>
        <h2>Refund Processing</h2>
        <p>Refunds are issued to the original payment method. You&apos;ll receive an email confirmation once your refund has been processed.</p>
      </div>
    </div>
  );
}
