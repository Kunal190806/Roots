import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Car, 
  Utensils, 
  Zap, 
  TrendingDown, 
  Trophy, 
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  Globe
} from 'lucide-react';
import { CarbonChart } from '@/components/dashboard/CarbonChart';
import { ActivityList } from '@/components/dashboard/ActivityList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-border/50 sticky top-0 z-40 bg-background/80 backdrop-blur-md">
          <h1 className="font-headline text-xl font-bold tracking-tight">Impact Overview</h1>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/tracker">
              <Button className="bg-primary text-background font-semibold rounded-full px-4 h-9">
                <PlusCircle className="w-4 h-4 mr-2" /> Log Activity
              </Button>
            </Link>
          </div>
        </header>

        <main className="p-6 space-y-8">
          {/* Top Level Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bento-card">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-[10px] font-bold text-accent border-accent/30 bg-accent/5">
                  -12% VS LAST MONTH
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">Monthly Footprint</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-headline font-bold">142.5</h3>
                  <span className="text-muted-foreground text-sm">kg CO2e</span>
                </div>
              </div>
            </div>

            <div className="bento-card">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">Daily Average</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-headline font-bold">4.7</h3>
                  <span className="text-muted-foreground text-sm">kg CO2e</span>
                </div>
              </div>
            </div>

            <div className="bento-card">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">Active Streaks</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-headline font-bold">14</h3>
                  <span className="text-muted-foreground text-sm">days</span>
                </div>
              </div>
            </div>

            <div className="bento-card">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">Tree Offset</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-headline font-bold">6.2</h3>
                  <span className="text-muted-foreground text-sm">trees equivalent</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2 bento-card flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-headline text-xl font-bold">Progress Trends</h2>
                  <p className="text-muted-foreground text-sm">Your weekly carbon distribution</p>
                </div>
                <select className="bg-secondary/50 border-none rounded-md px-3 py-1.5 text-xs font-medium focus:ring-1 ring-primary">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div className="flex-1 w-full">
                <CarbonChart />
              </div>
            </div>

            {/* Smart Insights Bento */}
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Trace Smart Insights</span>
                  </div>
                  <CardTitle className="text-lg font-headline">Impactful Swap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Based on your travel patterns this week, we suggest switching your 5-mile commute to an E-bike twice a week.
                  </p>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary rounded-lg">
                        <Car className="w-4 h-4 text-background" />
                      </div>
                      <span className="text-xs font-medium">To E-bike</span>
                    </div>
                    <Badge className="bg-accent text-background border-none text-[10px] font-bold">
                      -4.2kg SAVED
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full rounded-full text-xs font-bold border-primary/30 hover:bg-primary/10">
                    Adopt this habit
                  </Button>
                </CardContent>
              </Card>

              <div className="bento-card">
                <h3 className="font-headline text-lg font-bold mb-4">Category Impact</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Food & Meals', icon: <Utensils className="w-4 h-4" />, value: 45, color: 'bg-primary' },
                    { label: 'Transport', icon: <Car className="w-4 h-4" />, value: 30, color: 'bg-accent' },
                    { label: 'Energy', icon: <Zap className="w-4 h-4" />, value: 20, color: 'bg-blue-400' },
                    { label: 'Others', icon: <Leaf className="w-4 h-4" />, value: 5, color: 'bg-muted' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </div>
                        <span>{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-1.5 bg-secondary" indicatorClassName={item.color} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bento-card">
              <h3 className="font-headline text-lg font-bold mb-6">Recent Activity</h3>
              <ActivityList />
              <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10">
                View All Records <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="bento-card flex flex-col">
              <h3 className="font-headline text-lg font-bold mb-6">Personal Goals</h3>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="p-4 rounded-xl bg-secondary/30 flex flex-col items-center text-center justify-center border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                    <Leaf className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1">Consistency</p>
                  <p className="text-[10px] text-muted-foreground">Log 14 days in a row</p>
                  <Progress value={80} className="h-1 mt-4 w-full" />
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 flex flex-col items-center text-center justify-center border border-border/50 opacity-60">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1">Impact Chef</p>
                  <p className="text-[10px] text-muted-foreground">Log 10 plant-based meals</p>
                  <Progress value={40} className="h-1 mt-4 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
