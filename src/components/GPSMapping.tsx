import { Card } from '@/components/ui/card';
import { MapPin, Crosshair, Navigation2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const GPSMapping = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock GPS coordinates
  const gpsData = [
    { lat: 40.7128, lng: -74.0060, label: 'Launch Site', type: 'launch' },
    { lat: 40.7200, lng: -74.0000, label: 'Waypoint 1', type: 'waypoint' },
    { lat: 40.7300, lng: -73.9900, label: 'Peak Altitude', type: 'peak' },
    { lat: 40.7250, lng: -73.9850, label: 'Current Position', type: 'current' },
    { lat: 40.7180, lng: -73.9800, label: 'Predicted Landing', type: 'predicted' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map background (simplified grid)
    ctx.strokeStyle = 'hsl(220 15% 15%)';
    ctx.lineWidth = 1;
    
    // Draw grid lines
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Convert GPS coordinates to canvas coordinates (simplified)
    const minLat = Math.min(...gpsData.map(p => p.lat));
    const maxLat = Math.max(...gpsData.map(p => p.lat));
    const minLng = Math.min(...gpsData.map(p => p.lng));
    const maxLng = Math.max(...gpsData.map(p => p.lng));

    const toCanvasCoords = (lat: number, lng: number) => {
      const x = ((lng - minLng) / (maxLng - minLng)) * (canvas.width - 40) + 20;
      const y = ((maxLat - lat) / (maxLat - minLat)) * (canvas.height - 40) + 20;
      return { x, y };
    };

    // Draw flight path
    ctx.strokeStyle = 'hsl(195 100% 55%)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    
    gpsData.slice(0, -1).forEach((point, index) => {
      const coords = toCanvasCoords(point.lat, point.lng);
      if (index === 0) {
        ctx.moveTo(coords.x, coords.y);
      } else {
        ctx.lineTo(coords.x, coords.y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw predicted path
    const currentCoords = toCanvasCoords(gpsData[3].lat, gpsData[3].lng);
    const predictedCoords = toCanvasCoords(gpsData[4].lat, gpsData[4].lng);
    
    ctx.strokeStyle = 'hsl(38 92% 50%)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(currentCoords.x, currentCoords.y);
    ctx.lineTo(predictedCoords.x, predictedCoords.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw GPS points
    gpsData.forEach((point, index) => {
      const coords = toCanvasCoords(point.lat, point.lng);
      
      const colors = {
        launch: 'hsl(142 76% 36%)',
        waypoint: 'hsl(199 89% 48%)',
        peak: 'hsl(38 92% 50%)',
        current: 'hsl(195 100% 55%)',
        predicted: 'hsl(0 84% 60%)'
      };

      ctx.fillStyle = colors[point.type as keyof typeof colors];
      
      // Draw point
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, point.type === 'current' ? 8 : 6, 0, 2 * Math.PI);
      ctx.fill();

      // Add glow for current position
      if (point.type === 'current') {
        ctx.shadowColor = colors[point.type];
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw labels
      ctx.fillStyle = 'hsl(215 25% 60%)';
      ctx.font = '11px sans-serif';
      ctx.fillText(point.label, coords.x + 12, coords.y - 8);
    });

  }, []);

  return (
    <Card className="data-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">GPS Mapping</h3>
          <p className="text-sm text-muted-foreground">Real-time position tracking</p>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-background/50 rounded-lg border border-border"
        />
        
        <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border">
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <Crosshair className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Predicted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Navigation2 className="w-3 h-3 text-success" />
              <span className="text-muted-foreground">Launch</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Current Position</div>
          <div className="font-mono text-sm text-foreground">
            40.7250°N, 73.9850°W
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Distance from Launch</div>
          <div className="font-mono text-sm text-foreground">
            2.3 km
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GPSMapping;