"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", transport: 4.5, food: 3.2, energy: 2.1 },
  { day: "Tue", transport: 3.8, food: 3.5, energy: 2.3 },
  { day: "Wed", transport: 6.2, food: 2.8, energy: 2.0 },
  { day: "Thu", transport: 4.0, food: 4.2, energy: 1.8 },
  { day: "Fri", transport: 3.5, food: 3.1, energy: 2.2 },
  { day: "Sat", transport: 2.1, food: 5.4, energy: 2.5 },
  { day: "Sun", transport: 1.5, food: 4.8, energy: 2.4 },
]

export function CarbonChart() {
  return (
    <ChartContainer
      config={{
        transport: {
          label: "Transport",
          color: "hsl(var(--chart-1))",
        },
        food: {
          label: "Food",
          color: "hsl(var(--chart-2))",
        },
        energy: {
          label: "Energy",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full w-full"
    >
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="transport"
          stackId="1"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorTransport)"
        />
        <Area
          type="monotone"
          dataKey="food"
          stackId="1"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorFood)"
        />
        <Area
          type="monotone"
          dataKey="energy"
          stackId="1"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          fillOpacity={0.1}
          fill="hsl(var(--chart-3))"
        />
      </AreaChart>
    </ChartContainer>
  )
}
