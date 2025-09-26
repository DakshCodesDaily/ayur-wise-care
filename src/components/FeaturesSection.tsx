import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Bell, 
  Activity, 
  BarChart3, 
  MessageCircle, 
  Shield, 
  Bot,
  Clock,
  Heart,
  Stethoscope,
  Leaf
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automated therapy booking with conflict detection and intelligent scheduling algorithms.",
    color: "accent",
    gradient: "bg-gradient-accent"
  },
  {
    icon: Bell,
    title: "Intelligent Notifications",
    description: "Multi-channel reminders for diet, preparation steps, and recovery via app, SMS, and email.",
    color: "therapeutic",
    gradient: "bg-gradient-therapeutic"
  },
  {
    icon: Activity,
    title: "Real-Time Tracking",
    description: "Monitor ongoing sessions and track patient progress with detailed therapy timelines.",
    color: "primary",
    gradient: "bg-gradient-primary"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive health indicators with visual progress tracking and practitioner reports.",
    color: "accent",
    gradient: "bg-gradient-accent"
  },
  {
    icon: MessageCircle,
    title: "Feedback Integration",
    description: "Patient symptom reporting with AI-powered therapy plan adjustments.",
    color: "therapeutic",
    gradient: "bg-gradient-therapeutic"
  },
  {
    icon: Bot,
    title: "AI Ayurveda Assistant",
    description: "Multilingual chatbot for Ayurvedic guidance, remedies, and lifestyle recommendations.",
    color: "primary",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "HIPAA-compliant data protection with end-to-end encryption for patient privacy.",
    color: "accent",
    gradient: "bg-gradient-accent"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-healing">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Holistic Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Complete Panchakarma
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Management</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Ayurvedic practitioners with modern tools while preserving the ancient wisdom 
            of traditional healing practices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-smooth group hover:scale-105"
            >
              <div className="space-y-4">
                <div className={`p-3 ${feature.gradient} rounded-xl w-fit group-hover:shadow-glow transition-smooth`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-primary text-primary-foreground border-none shadow-glow max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Heart className="w-12 h-12 animate-gentle-pulse" />
              </div>
              <h3 className="text-2xl font-bold">Ready to Transform Your Practice?</h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                Join thousands of Ayurvedic practitioners who trust AyurSutra for their patient management needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button variant="healing" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="gentle" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;