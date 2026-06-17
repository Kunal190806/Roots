import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, BarChart3, Zap, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-20 flex items-center border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Leaf className="w-5 h-5 text-background" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight">Trace</span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">Methodology</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">Your Impact</Link>
        </nav>
        <div className="ml-auto md:ml-8 flex items-center gap-4">
          <Link href="/onboarding">
            <Button className="bg-primary hover:bg-primary/90 text-background font-semibold px-6 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8">
            <Zap className="w-3 h-3" />
            PERSONALIZED SUSTAINABILITY
          </div>
          
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-[1.1]">
            Small Actions, <span className="text-primary italic">Global</span> Impact.
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Trace analyzes your daily habits to provide a tailored roadmap to a carbon-neutral lifestyle. Measure your footprint and grow your impact today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold shadow-lg shadow-primary/20 bg-primary text-background hover:bg-primary/90">
                Start My Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-semibold border-border/50 bg-secondary/50 hover:bg-secondary">
                View Demo Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-20 w-full max-w-5xl aspect-video rounded-2xl border border-border/50 bg-card overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
            <img 
              src="https://picsum.photos/seed/trace-dashboard/1024/576" 
              alt="Trace Dashboard Preview" 
              className="w-full h-full object-cover opacity-80"
              data-ai-hint="clean dashboard"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl font-bold mb-4">Sophisticated Insights, Personal Care</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We combine environmental science with behavioral psychology to make sustainable living accessible for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-primary" />,
                  title: "Impact Analyzer",
                  description: "Real-time carbon estimation based on your meals, commutes, and daily lifestyle logs."
                },
                {
                  icon: <BarChart3 className="w-6 h-6 text-primary" />,
                  title: "Visual Data Stories",
                  description: "Understand your footprint through elegant, interactive visualizations that show your progress over time."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-primary" />,
                  title: "Adaptive Goal Setting",
                  description: "Dynamic targets that adjust based on your habits and preferences for sustained change."
                }
              ].map((feature, i) => (
                <div key={i} className="bento-card group">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 border-t border-border/50 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full -z-10" />
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-3xl p-12 text-center">
            <Globe className="w-12 h-12 text-primary mx-auto mb-8 animate-pulse" />
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">Join 10k+ people tracing their way to a greener future.</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Ready to take the first step towards your carbon-neutral journey? It takes less than 2 minutes to get your baseline.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="h-14 px-12 rounded-full text-lg font-semibold bg-primary text-background hover:bg-primary/90">
                Start Free Onboarding
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border/50 bg-background text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1 rounded">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
            <span className="font-headline text-lg font-bold text-foreground">Trace</span>
          </div>
          <p>© 2024 Trace Sustainability. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
