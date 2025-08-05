import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Signal, Wifi, Battery, Thermometer } from 'lucide-react';

const StatusPanel = () => {
  const systemStatus = [
    { name: 'Communication', status: 'online', icon: Signal, value: '98%' },
    { name: 'Power System', status: 'normal', icon: Battery, value: '87%' },
    { name: 'Data Link', status: 'active', icon: Wifi, value: 'Strong' },
    { name: 'Temperature', status: 'nominal', icon: Thermometer, value: '23°C' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'normal':
      case 'active':
      case 'nominal':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">System Status</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full pulse-glow" />
          <span className="text-sm text-success font-medium">All Systems Operational</span>
        </div>
      </div>

      <div className="space-y-4">
        {systemStatus.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">{item.value}</span>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Update:</span>
          <span className="text-foreground font-mono">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default StatusPanel;