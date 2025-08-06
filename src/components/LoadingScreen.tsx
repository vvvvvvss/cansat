import { useEffect, useState } from 'react';
import { Satellite, Signal, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const loadingSteps = [
    'Initializing Mission Control...',
    'Connecting to CanSat...',
    'Establishing Communication Link...',
    'Loading Telemetry Data...',
    'Calibrating Sensors...',
    'Mission Control Ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        
        if (stepIndex < loadingSteps.length) {
          setCurrentStep(loadingSteps[stepIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto glow-effect">
              <Satellite className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Signal className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              CanSat Mission Control
            </h1>
            <p className="text-muted-foreground">
              Advanced satellite telemetry dashboard
            </p>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
            <span className="text-sm text-muted-foreground">
              {currentStep}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
              progress > 20 ? 'bg-success pulse-glow' : 'bg-muted'
            }`} />
            <div className="text-xs text-muted-foreground">Sensors</div>
          </div>
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
              progress > 50 ? 'bg-success pulse-glow' : 'bg-muted'
            }`} />
            <div className="text-xs text-muted-foreground">Comms</div>
          </div>
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
              progress > 80 ? 'bg-success pulse-glow' : 'bg-muted'
            }`} />
            <div className="text-xs text-muted-foreground">Data</div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;