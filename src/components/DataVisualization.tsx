import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Mountain, Thermometer, Gauge } from 'lucide-react';

// Mock data for demonstration
const generateMockData = () => {
  const data = [];
  const now = Date.now();
  
  for (let i = 0; i < 50; i++) {
    const time = now - (49 - i) * 60000; // 1 minute intervals
    data.push({
      time: new Date(time).toLocaleTimeString(),
      altitude: 1000 + Math.sin(i * 0.1) * 500 + i * 200,
      temperature: 25 + Math.sin(i * 0.2) * 10 - i * 0.3,
      pressure: 101.3 - i * 0.8 + Math.random() * 2,
      timestamp: time
    });
  }
  
  return data;
};

const DataVisualization = () => {
  const data = generateMockData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)} ${entry.name === 'altitude' ? 'm' : entry.name === 'temperature' ? '°C' : 'kPa'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Visualization</h3>
          <p className="text-sm text-muted-foreground">Real-time sensor data trends</p>
        </div>
      </div>

      <Tabs defaultValue="altitude" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="altitude" className="flex items-center space-x-2">
            <Mountain className="w-4 h-4" />
            <span>Altitude</span>
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4" />
            <span>Temperature</span>
          </TabsTrigger>
          <TabsTrigger value="pressure" className="flex items-center space-x-2">
            <Gauge className="w-4 h-4" />
            <span>Pressure</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="altitude" className="mt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="altitudeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(195 100% 55%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(195 100% 55%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="altitude"
                  stroke="hsl(195 100% 55%)"
                  fillOpacity={1}
                  fill="url(#altitudeGradient)"
                  strokeWidth={2}
                  name="Altitude"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="temperature" className="mt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(38 92% 50%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(38 92% 50%)', strokeWidth: 2, r: 4 }}
                  name="Temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="pressure" className="mt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="hsl(142 76% 36%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(142 76% 36%)', strokeWidth: 2, r: 4 }}
                  name="Pressure"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default DataVisualization;