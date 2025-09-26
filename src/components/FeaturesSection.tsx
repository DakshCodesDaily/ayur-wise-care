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
  Leaf,
  ArrowRight,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automated therapy booking with conflict detection and intelligent scheduling algorithms.",
    color: "emerald",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    icon: Bell,
    title: "Intelligent Notifications",
    description: "Multi-channel reminders for diet, preparation steps, and recovery via app, SMS, and email.",
    color: "amber",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  {
    icon: Activity,
    title: "Real-Time Tracking",
    description: "Monitor ongoing sessions and track patient progress with detailed therapy timelines.",
    color: "blue",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive health indicators with visual progress tracking and practitioner reports.",
    color: "purple",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: MessageCircle,
    title: "Feedback Integration",
    description: "Patient symptom reporting with AI-powered therapy plan adjustments.",
    color: "rose",
    bgColor: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600"
  },
  {
    icon: Bot,
    title: "AI Ayurveda Assistant",
    description: "Multilingual chatbot for Ayurvedic guidance, remedies, and lifestyle recommendations.",
    color: "indigo",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600"
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "HIPAA-compliant data protection with end-to-end encryption for patient privacy.",
    color: "green",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-200/50 mb-8">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Advanced Features</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8">
            Complete Panchakarma
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Management Suite
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
            Empowering Ayurvedic practitioners with cutting-edge technology while preserving 
            the ancient wisdom of traditional healing practices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`p-8 ${feature.bgColor} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105 rounded-3xl`}
            >
              <div className="space-y-6">
                <div className={`p-4 ${feature.iconBg} rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-0 shadow-2xl max-w-4xl mx-auto rounded-3xl">
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="p-4 bg-white/20 rounded-2xl">
                  <Heart className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-4xl font-black">Ready to Transform Your Practice?</h3>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-medium">
                Join thousands of Ayurvedic practitioners who trust AyurSutra for their patient management needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                <a href="/login">
                  <Button className="bg-white text-emerald-700 hover:bg-white/90 px-8 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href="/schedule">
                  <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Schedule Demo
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;