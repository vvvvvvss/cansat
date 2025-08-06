import { Card } from '@/components/ui/card';
import { Navigation, MapPin, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';

const TrajectoryVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock trajectory data
  const trajectoryData = [
    { x: 50, y: 300, z: 0, phase: 'launch' },
    { x: 80, y: 280, z: 50, phase: 'ascent' },
    { x: 120, y: 240, z: 150, phase: 'ascent' },
    { x: 180, y: 180, z: 300, phase: 'ascent' },
    { x: 250, y: 120, z: 500, phase: 'peak' },
    { x: 320, y: 140, z: 400, phase: 'descent' },
    { x: 380, y: 200, z: 200, phase: 'descent' },
    { x: 420, y: 260, z: 50, phase: 'landing' },
    { x: 450, y: 290, z: 0, phase: 'recovery' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'hsl(220 15% 15%)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw trajectory path
    ctx.strokeStyle = 'hsl(195 100% 55%)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    trajectoryData.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw trajectory points
    trajectoryData.forEach((point, index) => {
      const colors = {
        launch: 'hsl(142 76% 36%)',
        ascent: 'hsl(195 100% 55%)',
        peak: 'hsl(38 92% 50%)',
        descent: 'hsl(199 89% 48%)',
        landing: 'hsl(0 84% 60%)',
        recovery: 'hsl(142 76% 36%)'
      };

      ctx.fillStyle = colors[point.phase as keyof typeof colors];
      ctx.beginPath();
      ctx.arc(point.x, point.y, index === trajectoryData.length - 1 ? 8 : 6, 0, 2 * Math.PI);
      ctx.fill();

      // Add glow effect for current position
      if (index === trajectoryData.length - 1) {
        ctx.shadowColor = colors[point.phase as keyof typeof colors];
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw altitude indicators
    ctx.fillStyle = 'hsl(215 25% 60%)';
    ctx.font = '12px monospace';
    trajectoryData.forEach((point, index) => {
      if (index % 2 === 0) {
        ctx.fillText(`${point.z}m`, point.x + 10, point.y - 10);
      }
    });

  }, []);

  return (
    <Card className="data-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Navigation className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">3D Trajectory</h3>
          <p className="text-sm text-muted-foreground">Flight path visualization</p>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-background/50 rounded-lg border border-border"
        />
        
        <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border">
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-muted-foreground">Launch</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Ascent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Peak</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-info"></div>
              <span className="text-muted-foreground">Descent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-muted-foreground">Landing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">12.5</div>
          <div className="text-xs text-muted-foreground">Max Alt (km)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">2.3</div>
          <div className="text-xs text-muted-foreground">Distance (km)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">45</div>
          <div className="text-xs text-muted-foreground">Duration (min)</div>
        </div>
      </div>
    </Card>
  );
};

export default TrajectoryVisualization;