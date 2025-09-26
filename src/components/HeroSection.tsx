import { Button } from "@/components/ui/button";
import { Calendar, Users, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-ayurveda.jpg";
import { getCurrentUser } from "@/lib/auth";

const HeroSection = () => {
  const user = getCurrentUser();
  const primaryHref = user ? (user.role === "patient" || user.role === "practitioner" ? "/schedule" : "/") : "/login";
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/40 to-amber-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200/50 shadow-lg">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">AI-Powered • Traditional Wisdom</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] text-slate-900">
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  Ayur
                </span>
                <br />
                <span className="text-slate-800">Sutra</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
                Revolutionary Panchakarma management platform that seamlessly integrates 
                ancient Ayurvedic wisdom with cutting-edge technology for complete healing experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={primaryHref}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Begin Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="/chatbot">
                <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Try AI Assistant
                </Button>
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <div className="p-3 bg-emerald-100 rounded-2xl w-fit mx-auto mb-3">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">2.5K+</p>
                <p className="text-sm text-slate-600 font-medium">Patients Healed</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <div className="p-3 bg-amber-100 rounded-2xl w-fit mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">8.2K+</p>
                <p className="text-sm text-slate-600 font-medium">Sessions</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <div className="p-3 bg-blue-100 rounded-2xl w-fit mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">99.9%</p>
                <p className="text-sm text-slate-600 font-medium">Uptime</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <div className="p-3 bg-purple-100 rounded-2xl w-fit mx-auto mb-3">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">24/7</p>
                <p className="text-sm text-slate-600 font-medium">AI Support</p>
              </div>
            </div>
          </div>

          {/* Right Content - Modern Cards */}
          <div className="relative h-[600px]">
            {/* Main Therapy Card */}
            <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 w-80 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Abhyanga Therapy</h3>
                  <p className="text-slate-600 font-medium">Today, 2:00 PM</p>
                  <p className="text-emerald-600 font-semibold mt-1">Dr. Priya Sharma</p>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 w-96 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Treatment Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-600 font-medium">Panchakarma Cycle</span>
                    <span className="text-slate-900 font-bold">7/14 days</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-lg" style={{ width: '50%' }} />
                  </div>
                </div>
                <div className="text-sm text-slate-600 font-medium bg-slate-50 p-3 rounded-xl">
                  Next: Shirodhara session tomorrow
                </div>
              </div>
            </div>

            {/* Notification Card */}
            <div className="absolute top-1/3 right-1/4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-amber-200/50 w-64 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-amber-800">Reminder</span>
              </div>
              <p className="text-sm text-amber-700 font-medium">
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