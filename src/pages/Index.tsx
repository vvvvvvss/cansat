import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DataCard from '@/components/DataCard';
import StatusPanel from '@/components/StatusPanel';
import { 
  Thermometer, 
  Gauge, 
  Mountain, 
  Zap, 
  Wind, 
  Navigation,
  Activity,
  Satellite
} from 'lucide-react';

const Index = () => {
  // Mock data for demonstration
  const sensorData = [
    {
      title: 'Temperature',
      value: '23.5',
      unit: '°C',
      icon: Thermometer,
      status: 'normal' as const,
      trend: 'stable' as const
    },
    {
      title: 'Pressure',
      value: '101.3',
      unit: 'kPa',
      icon: Gauge,
      status: 'normal' as const,
      trend: 'down' as const
    },
    {
      title: 'Altitude',
      value: '12,450',
      unit: 'm',
      icon: Mountain,
      status: 'normal' as const,
      trend: 'up' as const
    },
    {
      title: 'Voltage',
      value: '3.7',
      unit: 'V',
      icon: Zap,
      status: 'warning' as const,
      trend: 'down' as const
    },
    {
      title: 'Wind Speed',
      value: '15.2',
      unit: 'm/s',
      icon: Wind,
      status: 'normal' as const,
      trend: 'stable' as const
    },
    {
      title: 'GPS Signal',
      value: '8',
      unit: 'sats',
      icon: Navigation,
      status: 'normal' as const,
      trend: 'up' as const
    },
    {
      title: 'Acceleration',
      value: '9.81',
      unit: 'm/s²',
      icon: Activity,
      status: 'normal' as const,
      trend: 'stable' as const
    },
    {
      title: 'Signal Strength',
      value: '-78',
      unit: 'dBm',
      icon: Satellite,
      status: 'normal' as const,
      trend: 'up' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Main Dashboard */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Live Telemetry Data</h2>
          <p className="text-muted-foreground">Real-time sensor readings from your CanSat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {sensorData.map((sensor, index) => (
                <DataCard
                  key={index}
                  title={sensor.title}
                  value={sensor.value}
                  unit={sensor.unit}
                  icon={sensor.icon}
                  status={sensor.status}
                  trend={sensor.trend}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <StatusPanel />
          </div>
        </div>

        {/* Mission Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="data-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Mission Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Launch</span>
                <span className="text-sm text-success font-medium">Complete</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ascent</span>
                <span className="text-sm text-primary font-medium">In Progress</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deployment</span>
                <span className="text-sm text-muted-foreground font-medium">Pending</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Recovery</span>
                <span className="text-sm text-muted-foreground font-medium">Scheduled</span>
              </div>
            </div>
          </div>

          <div className="data-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Communication</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Frequency</span>
                <span className="text-sm text-foreground font-mono">433.050 MHz</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Data Rate</span>
                <span className="text-sm text-foreground font-mono">9600 bps</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Protocol</span>
                <span className="text-sm text-foreground font-mono">LoRa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Range</span>
                <span className="text-sm text-foreground font-mono">15 km</span>
              </div>
            </div>
          </div>

          <div className="data-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payload Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Camera</span>
                <span className="text-sm text-success font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sensors</span>
                <span className="text-sm text-success font-medium">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm text-primary font-medium">76% Used</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Experiments</span>
                <span className="text-sm text-success font-medium">Running</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;