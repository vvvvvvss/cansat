import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DataCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

const DataCard = ({ title, value, unit, icon: Icon, status, trend }: DataCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <Card className="data-card p-6 scan-line animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
        </div>
        {trend && (
          <span className={`text-2xl ${getStatusColor()}`}>
            {getTrendIcon()}
          </span>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className={`text-3xl font-bold ${getStatusColor()}`}>
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      
      <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            status === 'normal' ? 'bg-success' : 
            status === 'warning' ? 'bg-warning' : 'bg-destructive'
          }`}
          style={{ width: '75%' }}
        />
      </div>
    </Card>
  );
};

export default DataCard;