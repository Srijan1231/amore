"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Gift, Sparkles, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

type ProductWithRating = Product & { avgRating: number; reviewCount: number };

const questions = [
  {
    id: "occasion",
    question: "What's the occasion?",
    options: [
      { value: "birthday", label: "Birthday", emoji: "🎂" },
      { value: "anniversary", label: "Anniversary", emoji: "💍" },
      { value: "just-because", label: "Just Because", emoji: "💕" },
      { value: "sympathy", label: "Sympathy", emoji: "🕊️" },
      { value: "mothers-day", label: "Mother's Day", emoji: "👩" },
      { value: "other", label: "Other", emoji: "🎁" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: [
      { value: "under-30", label: "Under £30", emoji: "💷" },
      { value: "30-50", label: "£30–£50", emoji: "💷" },
      { value: "50-80", label: "£50–£80", emoji: "💷" },
      { value: "80-plus", label: "£80+", emoji: "💷" },
    ],
  },
  {
    id: "style",
    question: "What style do they prefer?",
    options: [
      { value: "classic", label: "Classic & Elegant", emoji: "🌹" },
      { value: "rustic", label: "Rustic & Natural", emoji: "🌿" },
      { value: "modern", label: "Modern & Bold", emoji: "✨" },
      { value: "boho", label: "Boho & Free-spirited", emoji: "🌸" },
    ],
  },
];

function budgetToRange(budget: string): { min: number; max: number } {
  switch (budget) {
    case "under-30": return { min: 0, max: 30 };
    case "30-50": return { min: 30, max: 50 };
    case "50-80": return { min: 50, max: 80 };
    case "80-plus": return { min: 80, max: 500 };
    default: return { min: 0, max: 500 };
  }
}

export default function GiftFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = async (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const range = budgetToRange(newAnswers.budget);
      const params = new URLSearchParams({
        minPrice: String(range.min),
        maxPrice: String(range.max),
        limit: "6",
        sort: "newest",
      });

      try {
        const res = await fetch(`/api/products?${params.toString()}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setRecommendations(json.data);
        }
      } catch {
        // fail silently
      } finally {
        setLoading(false);
        setShowResults(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Finding your perfect gifts...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-3">
            Your Perfect Gifts
          </h1>
          <p className="text-muted-foreground">
            Based on your answers, here are our top recommendations
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No products match these criteria right now.</p>
            <Link href="/shop" className="text-primary hover:underline">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {recommendations.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].altText ?? product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="font-semibold text-primary">{formatPrice(Number(product.price))}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" onClick={() => { setShowResults(false); setStep(0); setAnswers({}); setRecommendations([]); }}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <Gift className="h-10 w-10 text-primary mx-auto mb-3" />
        <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Gift Finder</h1>
        <p className="text-muted-foreground">Answer a few questions and we&apos;ll find the perfect gift</p>
      </div>

      <Progress value={progress} className="mb-8 h-2" />

      <Card>
        <CardContent className="p-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-6 text-center">
            {currentQuestion.question}
          </h2>

          <RadioGroup className="space-y-3" onValueChange={handleAnswer}>
            {currentQuestion.options.map((opt) => (
              <div key={opt.value} className="flex items-center gap-3 border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value={opt.value} id={opt.value} />
                <Label htmlFor={opt.value} className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="text-xl">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              {step + 1} / {questions.length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
