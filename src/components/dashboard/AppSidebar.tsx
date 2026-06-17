import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Leaf, 
  BarChart2, 
  Award, 
  Settings, 
  LogOut, 
  PlusCircle, 
  Lightbulb,
  User
} from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  const navItems = [
    { icon: <LayoutDashboard />, label: 'Overview', href: '/dashboard' },
    { icon: <PlusCircle />, label: 'Journal', href: '/tracker' },
    { icon: <BarChart2 />, label: 'Deep Dive', href: '/dashboard' },
    { icon: <Lightbulb />, label: 'Action Plan', href: '/recommendations' },
    { icon: <Award />, label: 'Achievements', href: '#' },
  ];

  return (
    <Sidebar variant="inset" className="border-r border-border/50">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1 rounded-lg">
            <Leaf className="w-5 h-5 text-background" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">Trace</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild tooltip={item.label} className="hover:bg-primary/10 hover:text-primary transition-colors py-6">
                <Link href={item.href} className="flex items-center gap-3">
                  <div className="[&>svg]:w-5 [&>svg]:h-5">{item.icon}</div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-2">
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-secondary/50">
              <Link href="#" className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-3 py-2 bg-secondary/30 rounded-xl mt-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold truncate">Alex Green</span>
                <span className="text-[10px] text-muted-foreground truncate">Impact Level 12</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
