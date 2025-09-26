import { Button } from "@/components/ui/button";
import { Heart, Mail, Phone, MapPin, Leaf, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black">AyurSutra</h3>
                <p className="text-sm text-slate-400 font-medium">Healing Management</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              Bridging ancient Ayurvedic wisdom with modern healthcare technology 
              for comprehensive Panchakarma patient management.
            </p>
            <div className="flex items-center space-x-3 text-sm">
              <div className="p-2 bg-emerald-100/20 rounded-lg">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-slate-300 font-medium">Certified Ayurvedic Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <nav className="space-y-4">
              <a href="#features" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Features
              </a>
              <a href="#about" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                About Us
              </a>
              <a href="#pricing" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Pricing
              </a>
              <a href="#contact" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Contact
              </a>
            </nav>
          </div>

          {/* For Practitioners */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">For Practitioners</h4>
            <nav className="space-y-4">
              <a href="/schedule" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Practitioner Dashboard
              </a>
              <a href="/schedule" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Therapy Scheduling
              </a>
              <a href="#analytics" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Patient Analytics
              </a>
              <a href="#support" className="block text-slate-300 hover:text-emerald-400 font-medium transition-colors duration-200">
                Support Center
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-emerald-100/20 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Email</p>
                  <p className="text-slate-300 font-semibold">hello@ayursutra.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-emerald-100/20 rounded-lg">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Phone</p>
                  <p className="text-slate-300 font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-emerald-100/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Address</p>
                  <p className="text-slate-300 font-semibold">Wellness District, Health City</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 bg-gradient-to-r from-emerald-600/20 to-emerald-800/20 rounded-3xl border border-emerald-500/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-6 font-medium">Get the latest updates on Ayurvedic practices and platform features.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-8 text-sm text-slate-400">
              <span>© 2024 AyurSutra. All rights reserved.</span>
              <a href="#privacy" className="hover:text-emerald-400 transition-colors duration-200 font-medium">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-emerald-400 transition-colors duration-200 font-medium">
                Terms of Service
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-400 font-medium">Made with</span>
              <Heart className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-400 font-medium">for healers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;