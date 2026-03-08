import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Card } from './Card';

const data = [
  { time: '00:00', level: 2.4, warning: 5 },
  { time: '04:00', level: 2.6, warning: 5 },
  { time: '08:00', level: 3.2, warning: 5 },
  { time: '12:00', level: 3.8, warning: 5 },
  { time: '16:00', level: 4.5, warning: 5 },
  { time: '20:00', level: 4.2, warning: 5 },
  { time: '24:00', level: 3.9, warning: 5 },
];

export function TrendGraph() {
  return (
    <Card title="Water Level Trends (24h)" subtitle="River Station: Marikina Bridge">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 8]}
              unit="m"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="level" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorLevel)" 
            />
            {/* Warning Line Mock */}
            <Line 
              type="monotone" 
              dataKey="warning" 
              stroke="#ef4444" 
              strokeDasharray="5 5" 
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
