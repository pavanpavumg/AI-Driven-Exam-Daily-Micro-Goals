import { WeeklyProgress } from '@/types/student';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: WeeklyProgress[];
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-card animate-fade-up delay-300">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Weekly Progress
      </h3>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(158, 35%, 45%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(158, 35%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="goalsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 40%, 55%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(200, 40%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(160, 10%, 45%)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(80, 30%, 99%)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(160, 20%, 20%)' }}
            />
            <Area
              type="monotone"
              dataKey="confidenceScore"
              stroke="hsl(158, 35%, 45%)"
              strokeWidth={2}
              fill="url(#confidenceGradient)"
              name="Confidence"
            />
            <Area
              type="monotone"
              dataKey="goalsCompleted"
              stroke="hsl(200, 40%, 55%)"
              strokeWidth={2}
              fill="url(#goalsGradient)"
              name="Goals"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Confidence</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-calm-sky-dark" />
          <span className="text-sm text-muted-foreground">Goals</span>
        </div>
      </div>
    </div>
  );
};
