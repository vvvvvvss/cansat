import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Signal, 
  Wifi, 
  Battery, 
  Thermometer, 
  Rocket,
  Parachute,
  MapPin,
  Camera,
  Radio
} from 'lucide-react';

const EnhancedStatusPanel = () => {
  const missionPhases = [
    { name: 'Pre-Launch', status: 'complete', icon: MapPin },
    { name: 'Launch', status: 'complete', icon: Rocket },
    { name: 'Ascent', status: 'active', icon: Signal },
    { name: 'Peak', status: 'pending', icon: Thermometer },
    { name: 'Descent', status: 'pending', icon: Parachute },
    { name: 'Recovery', status: 'pending', icon: MapPin }
  ];

  const systemStatus = [
    { name: 'Communication', status: 'online', icon: Radio, value: '98%', signal: -65 },
    { name: 'Power System', status: 'normal', icon: Battery, value: '87%', voltage: 3.7 },
    { name: 'Data Link', status: 'active', icon: Wifi, value: 'Strong', rssi: -45 },
    { name: 'Sensors', status: 'nominal', icon: Thermometer, value: '23°C', count: 8 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
      case 'online':
      case 'normal':
      case 'active':
      case 'nominal':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'text-success';
      case 'active':
        return 'text-primary';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Mission Phase Tracker */}
      <Card className="data-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Mission Phases</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full pulse-glow" />
            <span className="text-sm text-primary font-medium">Phase 3 Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {missionPhases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  phase.status === 'complete' ? 'bg-success/20' :
                  phase.status === 'active' ? 'bg-primary/20' : 'bg-muted/20'
                }`}>
                  <Icon className={`w-4 h-4 ${getPhaseColor(phase.status)}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${getPhaseColor(phase.status)}`}>
                      {phase.name}
                    </span>
                    <Badge className={getStatusColor(phase.status)} variant="secondary">
                      {phase.status}
                    </Badge>
                  </div>
                  {phase.status === 'active' && (
                    <Progress value={65} className="mt-2 h-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Enhanced System Status */}
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
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <div className="text-xs text-muted-foreground">
                      {item.name === 'Communication' && `Signal: ${item.signal} dBm`}
                      {item.name === 'Power System' && `Voltage: ${item.voltage}V`}
                      {item.name === 'Data Link' && `RSSI: ${item.rssi} dBm`}
                      {item.name === 'Sensors' && `Active: ${item.count} sensors`}
                    </div>
                  </div>
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

        {/* Battery Details */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Battery Status</span>
            <span className="text-sm text-muted-foreground">87%</span>
          </div>
          <Progress value={87} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Estimated: 2h 15m remaining</span>
            <span>3.7V / 4.2V</span>
          </div>
        </div>

        {/* Signal Strength */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Signal Strength</span>
            <span className="text-sm text-muted-foreground">-65 dBm</span>
          </div>
          <Progress value={75} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Excellent signal quality</span>
            <span>Range: 12.5 km</span>
          </div>
        </div>
      </Card>

      {/* Communication Status */}
      <Card className="data-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Radio className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Communication</h3>
            <p className="text-xs text-muted-foreground">Data transmission status</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Packets Sent</span>
            <span className="text-sm text-foreground font-mono">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Packets Lost</span>
            <span className="text-sm text-foreground font-mono">3 (0.2%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Data Rate</span>
            <span className="text-sm text-foreground font-mono">9.6 kbps</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Contact</span>
            <span className="text-sm text-success font-mono">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedStatusPanel;