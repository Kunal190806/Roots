"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { 
  Car, 
  Leaf, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  ArrowRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    id: 'intro',
    title: "Welcome to Trace",
    description: "Let's establish your carbon baseline. It takes 2 minutes and helps us personalize your journey.",
    icon: <Leaf className="w-12 h-12 text-primary" />
  },
  {
    id: 'transport',
    title: "How do you commute?",
    description: "Your transportation choice is often the biggest part of your footprint.",
    options: [
      { label: 'Mostly Driving (Gas)', icon: <Car />, impact: 'high' },
      { label: 'Public Transport', icon: <Car />, impact: 'medium' },
      { label: 'Cycling/Walking', icon: <Car />, impact: 'low' },
      { label: 'Electric Vehicle', icon: <Car />, impact: 'medium' }
    ]
  },
  {
    id: 'food',
    title: "Typical Diet",
    description: "Food production impacts biodiversity and climate significantly.",
    options: [
      { label: 'Meat Heavy', icon: <Utensils />, impact: 'high' },
      { label: 'Flexitarian', icon: <Utensils />, impact: 'medium' },
      { label: 'Vegetarian', icon: <Utensils />, impact: 'low' },
      { label: 'Vegan', icon: <Utensils />, impact: 'low' }
    ]
  },
  {
    id: 'energy',
    title: "Home Energy",
    description: "Do you use renewable energy sources at home?",
    options: [
      { label: 'Standard Grid', icon: <Zap />, impact: 'high' },
      { label: 'Partially Renewable', icon: <Zap />, impact: 'medium' },
      { label: 'Full Solar/Wind', icon: <Zap />, impact: 'low' }
    ]
  }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const progress = ((step + 1) / STEPS.length) * 100;

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const current = STEPS[step];

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center gap-8">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1 rounded-md">
                <Leaf className="w-4 h-4 text-background" />
              </div>
              <span className="font-headline font-bold text-lg">Trace</span>
            </Link>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Step {step + 1} of {STEPS.length}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </header>

        <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-6">
              {current.icon || <div className="p-4 bg-primary/10 rounded-2xl text-primary">{STEPS[step].options?.[0].icon}</div>}
            </div>
            <h2 className="font-headline text-3xl font-bold">{current.title}</h2>
            <p className="text-muted-foreground">{current.description}</p>
          </div>

          <div className="grid gap-3">
            {current.options ? (
              current.options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={nextStep}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    {opt.icon}
                  </div>
                  <span className="font-semibold">{opt.label}</span>
                </button>
              ))
            ) : (
              <Button size="lg" onClick={nextStep} className="w-full h-14 rounded-full text-lg font-bold bg-primary text-background hover:bg-primary/90 mt-4">
                Let's Go <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </main>

        <footer className="pt-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={prevStep} disabled={step === 0} className="text-muted-foreground">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            {step === STEPS.length - 1 && (
              <Link href="/dashboard" className="w-full">
                <Button size="lg" className="w-full h-14 rounded-full text-lg font-bold bg-accent text-background hover:bg-accent/90">
                  Calculate My Baseline
                </Button>
              </Link>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
