"use client"

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Brain, Sparkles, Send, Loader2, Leaf, Car, Zap, Utensils } from 'lucide-react';
import { predictCarbonFootprint } from '@/ai/flows/carbon-footprint-prediction';
import type { CarbonFootprintPredictionOutput } from '@/ai/flows/carbon-footprint-prediction';
import { useToast } from '@/hooks/use-toast';

export default function TrackerPage() {
  const [log, setLog] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CarbonFootprintPredictionOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!log.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const output = await predictCarbonFootprint({ dailyActivitiesDescription: log });
      setResult(output);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error predicting your footprint. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-border/50 sticky top-0 z-40 bg-background/80 backdrop-blur-md">
          <h1 className="font-headline text-xl font-bold tracking-tight">AI Impact Analyzer</h1>
        </header>

        <main className="p-6 max-w-4xl mx-auto w-full space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-headline text-2xl font-bold">What did you do today?</h2>
            </div>
            <p className="text-muted-foreground">
              Describe your meals, transportation, and home energy usage in your own words. Trace's AI will calculate the carbon equivalent in real-time.
            </p>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Card className="relative border-border/50 bg-card rounded-2xl overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <Textarea 
                    placeholder="Example: I had a steak for lunch, took the bus to work (8 miles), and watched Netflix for 3 hours with the AC on."
                    className="min-h-[160px] p-6 border-none focus-visible:ring-0 text-lg resize-none bg-transparent"
                    value={log}
                    onChange={(e) => setLog(e.target.value)}
                  />
                  <div className="p-4 flex justify-between items-center bg-secondary/30 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">AI estimates are based on global carbon standards.</p>
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing || !log.trim()}
                      className="bg-primary text-background font-bold px-6 rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      Analyze Impact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {result && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bento-card bg-primary/10 border-primary/20 flex flex-col items-center justify-center py-10">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">Total Carbon</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-5xl font-headline font-bold">{result.totalCarbonEquivalentKgCO2e.toFixed(2)}</h3>
                    <span className="text-sm font-medium text-muted-foreground">kg CO2e</span>
                  </div>
                </Card>

                <Card className="md:col-span-2 bento-card">
                  <h3 className="font-headline text-lg font-bold mb-6">Impact Breakdown</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-secondary rounded-xl">
                        <Utensils className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Meals</p>
                        <p className="text-xl font-headline font-bold">{result.breakdown.meals.toFixed(2)}kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-secondary rounded-xl">
                        <Car className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Transport</p>
                        <p className="text-xl font-headline font-bold">{result.breakdown.transportation.toFixed(2)}kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-secondary rounded-xl">
                        <Zap className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Energy</p>
                        <p className="text-xl font-headline font-bold">{result.breakdown.energyUsage.toFixed(2)}kg</p>
                      </div>
                    </div>
                    {result.breakdown.other !== undefined && (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-secondary rounded-xl">
                          <Leaf className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Other</p>
                          <p className="text-xl font-headline font-bold">{result.breakdown.other.toFixed(2)}kg</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              <Card className="bento-card bg-secondary/20">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-headline flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" /> Trace Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed italic text-lg">
                    "{result.explanation}"
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4">
                <Button className="rounded-full px-8 bg-accent text-background font-bold hover:bg-accent/90">
                  Log to History
                </Button>
                <Button variant="outline" className="rounded-full px-8 border-border/50 hover:bg-secondary/50" onClick={() => setResult(null)}>
                  Clear
                </Button>
              </div>
            </section>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
