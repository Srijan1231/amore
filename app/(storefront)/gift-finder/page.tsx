"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Gift, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

const recommendations = [
  { name: "Eternal Rose Bouquet", slug: "eternal-rose-bouquet", price: "£49.99", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600", match: 98 },
  { name: "Lavender Dreams", slug: "lavender-dreams", price: "£29.99", image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600", match: 95 },
  { name: "Luxury Gift Hamper", slug: "luxury-gift-hamper", price: "£89.99", image: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=600", match: 92 },
];

export default function GiftFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {recommendations.map((rec) => (
            <Link key={rec.slug} href={`/shop/${rec.slug}`} className="group">
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={rec.image} alt={rec.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {rec.match}% Match
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium group-hover:text-primary transition-colors">{rec.name}</h3>
                  <p className="font-semibold text-primary">{rec.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => { setShowResults(false); setStep(0); setAnswers({}); }}>
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
