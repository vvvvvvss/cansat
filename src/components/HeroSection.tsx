import { Button } from '@/components/ui/button';
import { Play, Download, ExternalLink } from 'lucide-react';
import heroImage from '@/assets/cansat-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="CanSat satellite in space"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
              <span className="text-sm text-primary font-medium">Mission Status: Active</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            CanSat
            <span className="block text-transparent bg-gradient-primary bg-clip-text">
              Mission Control
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Real-time monitoring and data visualization for satellite telemetry. 
            Track altitude, temperature, pressure, and more with our advanced dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground glow-effect">
              <Play className="w-5 h-5 mr-2" />
              Start Monitoring
            </Button>
            <Button variant="outline" size="lg" className="border-primary/50 text-foreground hover:bg-primary/10">
              <Download className="w-5 h-5 mr-2" />
              Download Data
            </Button>
            <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
              <ExternalLink className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15km</div>
              <div className="text-sm text-muted-foreground">Max Altitude</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1s</div>
              <div className="text-sm text-muted-foreground">Data Refresh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;