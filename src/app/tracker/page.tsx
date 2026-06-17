"use client"

import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, Utensils, Car, Zap, Leaf, AlertCircle, BookOpen } from 'lucide-react';
import { predictCarbonFootprint } from '@/ai/flows/carbon-footprint-prediction';
import type { CarbonFootprintPredictionOutput } from '@/ai/flows/carbon-footprint-prediction';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useAuth } from '@/firebase';
import { checkUsageLimit, incrementUsage } from '@/lib/usage-limit';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TrackerPage() {
  const [log, setLog] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CarbonFootprintPredictionOutput | null>(null);
  const [usageRemaining, setUsageRemaining] = useState<number | null>(null);
  const { toast } = useToast();
  const db = useFirestore();
  const auth = useAuth();
  const user = auth?.currentUser;

  const userId = user?.uid || 'anonymous_guest';

  useEffect(() => {
    if (db && userId) {
      checkUsageLimit(db, userId).then(res => setUsageRemaining(res.remaining));
    }
  }, [db, userId]);

  const handleAnalyze = async () => {
    if (!log.trim() || !db) return;
    
    setIsAnalyzing(true);
    try {
      const { allowed, remaining } = await checkUsageLimit(db, userId);
      
      if (!allowed) {
        toast({
          variant: "destructive",
          title: "Daily Limit Reached",
          description: "You've shared 5 records today. Please come back tomorrow to keep tracking!",
        });
        setIsAnalyzing(false);
        return;
      }

      const output = await predictCarbonFootprint({ dailyActivitiesDescription: log });
      setResult(output);
      
      await incrementUsage(db, userId);
      setUsageRemaining(remaining - 1);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "We couldn't process your record. Please try again.",
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
          <h1 className="font-headline text-xl font-bold tracking-tight">Impact Journal</h1>
        </header>

        <main className="p-6 max-w-4xl mx-auto w-full space-y-8">
          {usageRemaining !== null && usageRemaining <= 0 && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Daily Limit Reached</AlertTitle>
              <AlertDescription>
                You've reached your journal entries for today. Your counter will reset tomorrow.
              </AlertDescription>
            </Alert>
          )}

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-headline text-2xl font-bold">What did you do today?</h2>
              </div>
              {usageRemaining !== null && (
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-secondary/50 px-3 py-1 rounded-full">
                  {usageRemaining} entries left
                </span>
              )}
            </div>
            <p className="text-muted-foreground">
              Describe your meals, transport, and energy use. We'll translate your day into environmental impact.
            </p>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Card className="relative border-border/50 bg-card rounded-2xl overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <Textarea 
                    placeholder="Example: I had a vegetarian lunch, cycled to the store (2 miles), and kept the lights off most of the evening."
                    className="min-h-[160px] p-6 border-none focus-visible:ring-0 text-lg resize-none bg-transparent"
                    value={log}
                    onChange={(e) => setLog(e.target.value)}
                    disabled={usageRemaining !== null && usageRemaining <= 0}
                  />
                  <div className="p-4 flex justify-between items-center bg-secondary/30 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">Estimates are based on standard carbon emission factors.</p>
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing || !log.trim() || (usageRemaining !== null && usageRemaining <= 0)}
                      className="bg-primary text-background font-bold px-6 rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      Calculate Impact
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
                  <h3 className="font-headline text-lg font-bold mb-6">Breakdown</h3>
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
                    <Sparkles className="w-4 h-4 text-primary" /> Observations
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
                  Save to History
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
