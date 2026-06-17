import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TreeDeciduous, BarChart3, Zap, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-20 flex items-center border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
            <TreeDeciduous className="w-7 h-7" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter">
            Roots<span className="text-primary">.</span>
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">Methodology</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">Your Impact</Link>
        </nav>
        <div className="ml-auto md:ml-8 flex items-center gap-4">
          <Link href="/onboarding">
            <Button className="bg-primary hover:bg-primary/90 text-background font-semibold px-6 rounded-full">
              Start Growing
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8">
            <TreeDeciduous className="w-3 h-3" />
            NURTURE YOUR IMPACT
          </div>
          
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-[1.1]">
            Deepen Your <span className="text-primary italic">Roots</span> in a Greener World.
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Roots helps you understand the weight of your daily habits. Grow a personalized roadmap to a sustainable life, one step at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold shadow-lg shadow-primary/20 bg-primary text-background hover:bg-primary/90">
                Start My Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-semibold border-border/50 bg-secondary/50 hover:bg-secondary">
                Explore Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-20 w-full max-w-5xl aspect-video rounded-2xl border border-border/50 bg-card overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
            <Image 
              src="https://picsum.photos/seed/roots-dashboard/1024/576" 
              alt="Roots Dashboard Preview" 
              width={1024}
              height={576}
              className="w-full h-full object-cover opacity-80"
              unoptimized
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl font-bold mb-4">Thoughtful Insights, Personal Growth</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We bridge the gap between complex climate data and your everyday choices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <TreeDeciduous className="w-6 h-6 text-primary" />,
                  title: "Habit Tracker",
                  description: "Understand the carbon weight of your meals, commutes, and lifestyle choices instantly."
                },
                {
                  icon: <BarChart3 className="w-6 h-6 text-primary" />,
                  title: "Visual Growth",
                  description: "Watch your impact evolve through beautiful, interactive stories that celebrate your progress."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-primary" />,
                  title: "Adaptive Goals",
                  description: "Personalized targets that meet you where you are and help you grow at your own pace."
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
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">Join a community growing towards a better future.</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Ready to take the first step? It takes less than 2 minutes to establish your baseline.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="h-14 px-12 rounded-full text-lg font-semibold bg-primary text-background hover:bg-primary/90">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border/50 bg-background text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-1.5">
            <TreeDeciduous className="w-5 h-5 text-primary" />
            <span className="font-headline text-lg font-bold text-foreground tracking-tighter">Roots.</span>
          </div>
          <p>© 2024 Roots Sustainability. Cultivating change.</p>
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
