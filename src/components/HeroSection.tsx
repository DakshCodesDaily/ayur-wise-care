import { Button } from "@/components/ui/button";
import { Calendar, Users, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-ayurveda.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-healing overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Peaceful Ayurvedic therapy center with natural healing elements"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                <div className="w-2 h-2 bg-accent rounded-full animate-gentle-pulse" />
                <span className="text-sm font-medium text-accent">Traditional Healing • Modern Management</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Ayur
                </span>
                <span className="text-accent">Sutra</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Comprehensive Panchakarma patient management system that bridges ancient Ayurvedic wisdom 
                with modern healthcare technology for holistic healing experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Your Healing Journey
              </Button>
              <Button variant="gentle" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">1000+</p>
                <p className="text-xs text-muted-foreground">Patients Healed</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium text-foreground">5000+</p>
                <p className="text-xs text-muted-foreground">Sessions Booked</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-therapeutic/10 rounded-full w-fit mx-auto mb-2">
                  <Shield className="w-6 h-6 text-therapeutic" />
                </div>
                <p className="text-sm font-medium text-foreground">99.9%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-primary-glow/10 rounded-full w-fit mx-auto mb-2">
                  <Zap className="w-6 h-6 text-primary-glow" />
                </div>
                <p className="text-sm font-medium text-foreground">24/7</p>
                <p className="text-xs text-muted-foreground">AI Support</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative h-96 lg:h-[500px]">
            {/* Therapy Card */}
            <div className="absolute top-0 right-0 bg-card rounded-2xl p-6 shadow-card border border-border/50 w-64 animate-float">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Calendar className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Abhyanga Therapy</h3>
                  <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
                  <p className="text-xs text-accent mt-1">Dr. Priya Sharma</p>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="absolute bottom-10 left-0 bg-card rounded-2xl p-6 shadow-card border border-border/50 w-72 animate-float" style={{ animationDelay: '2s' }}>
              <h3 className="font-semibold text-card-foreground mb-3">Treatment Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Panchakarma Cycle</span>
                    <span className="text-foreground font-medium">7/14 days</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Next: Shirodhara session tomorrow
                </div>
              </div>
            </div>

            {/* Notification Card */}
            <div className="absolute top-1/3 right-1/4 bg-card rounded-xl p-4 shadow-card border border-border/50 w-56 animate-float" style={{ animationDelay: '4s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-gentle-pulse" />
                <span className="text-sm font-medium text-card-foreground">Reminder</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Take your prescribed herbs 30 minutes before your session
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;