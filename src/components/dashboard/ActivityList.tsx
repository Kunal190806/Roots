import { Utensils, Car, Zap, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    title: 'Plant-based Dinner',
    category: 'Food',
    icon: <Utensils className="w-4 h-4" />,
    time: '2 hours ago',
    impact: '-1.5kg',
    impactType: 'saving'
  },
  {
    id: 2,
    title: 'Commute to Office (EV)',
    category: 'Transport',
    icon: <Car className="w-4 h-4" />,
    time: '6 hours ago',
    impact: '+0.8kg',
    impactType: 'cost'
  },
  {
    id: 3,
    title: 'Smart Thermostat Active',
    category: 'Energy',
    icon: <Zap className="w-4 h-4" />,
    time: 'Today, 9:00 AM',
    impact: '-2.1kg',
    impactType: 'saving'
  },
  {
    id: 4,
    title: 'Groceries (Local Market)',
    category: 'Shopping',
    icon: <ShoppingBag className="w-4 h-4" />,
    time: 'Yesterday',
    impact: '-0.5kg',
    impactType: 'saving'
  }
];

export function ActivityList() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50 group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-background transition-colors">
              {activity.icon}
            </div>
            <div>
              <p className="text-sm font-semibold">{activity.title}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{activity.category} • {activity.time}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`font-bold border-none text-xs ${
              activity.impactType === 'saving' 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground bg-secondary'
            }`}
          >
            {activity.impact}
          </Badge>
        </div>
      ))}
    </div>
  );
}
