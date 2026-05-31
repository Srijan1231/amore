import { Metadata } from "next";
import Image from "next/image";
import { Heart, Leaf, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Amoré — Our Story | Handcrafted Gifts Made with Love",
  description: "Discover the story behind Amoré — a handmade gifting brand built on emotion, elegance, and artisan craft. Learn about our values and the makers behind every bouquet.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-cream to-blush/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-charcoal mb-6">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Amoré was born from a simple belief: that the most meaningful gifts are made by hand, 
            with love. Every bouquet we create carries the warmth of human touch and the beauty 
            of nature, transforming flowers into vessels of emotion.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800"
                alt="Amoré founder arranging bouquet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                Founded on Love
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                What started as a passion project — arranging flowers for friends and family — 
                has blossomed into a brand that touches lives across the country. Our founder 
                believed that in a world of mass production, there&apos;s still magic in 
                something made by hand.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, every Amoré bouquet is still crafted by skilled artisans who pour their 
                heart into every arrangement. We source the finest flowers, preserve them with 
                care, and wrap them with the kind of attention that turns a simple gift into 
                an unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Handmade Process */}
      <section className="py-20 bg-cream/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal mb-12">
            The Handmade Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1. Source", desc: "We hand-select the finest blooms from trusted growers who share our commitment to quality and sustainability." },
              { step: "2. Craft", desc: "Our artisans carefully arrange each bouquet by hand, ensuring every stem is placed with intention and artistry." },
              { step: "3. Deliver", desc: "Every order is wrapped in eco-friendly packaging and delivered with a personal touch to your door." },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <h3 className="font-heading text-xl font-semibold text-primary">{item.step}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-charcoal text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "Made with Love", desc: "Every piece is crafted with care and emotional intention" },
              { icon: Leaf, title: "Sustainability", desc: "Eco-friendly packaging and locally sourced materials" },
              { icon: Users, title: "Community", desc: "Supporting local artisans and small-batch producers" },
              { icon: Award, title: "Quality", desc: "Premium blooms and meticulous attention to detail" },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blush/20 text-primary mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
