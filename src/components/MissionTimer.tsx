import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MissionTimerProps {
  startTime?: Date;
  isActive?: boolean;
}

const MissionTimer = ({ startTime = new Date(), isActive = true }: MissionTimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(isActive);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <Card className="data-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Mission Timer</h3>
            <p className="text-xs text-muted-foreground">Elapsed Time</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTimer}
            className="h-8 w-8 p-0"
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTimer}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-4xl font-mono font-bold text-primary mb-2">
          {formatTime(elapsedTime)}
        </div>
        <div className="text-sm text-muted-foreground">
          {isRunning ? 'Mission Active' : 'Mission Paused'}
        </div>
      </div>
      
      <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
          style={{ width: `${Math.min((elapsedTime / 3600) * 100, 100)}%` }}
        />
      </div>
    </Card>
  );
};

export default MissionTimer;