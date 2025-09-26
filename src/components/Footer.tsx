import { Button } from "@/components/ui/button";
import { Heart, Mail, Phone, MapPin, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary-foreground/10 rounded-full">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AyurSutra</h3>
                <p className="text-xs text-primary-foreground/70">Healing Management</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Bridging ancient Ayurvedic wisdom with modern healthcare technology 
              for comprehensive Panchakarma patient management.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Leaf className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground/80">Certified Ayurvedic Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#features" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Features
              </a>
              <a href="#about" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                About Us
              </a>
              <a href="#pricing" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Pricing
              </a>
              <a href="#contact" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Contact
              </a>
            </nav>
          </div>

          {/* For Practitioners */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">For Practitioners</h4>
            <nav className="space-y-2">
              <a href="#dashboard" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Practitioner Dashboard
              </a>
              <a href="#scheduling" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Therapy Scheduling
              </a>
              <a href="#analytics" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Patient Analytics
              </a>
              <a href="#support" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Support Center
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Email</p>
                  <p className="text-sm font-medium">hello@ayursutra.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Phone</p>
                  <p className="text-sm font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Address</p>
                  <p className="text-sm font-medium">Wellness District, Health City</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
              <span>© 2024 AyurSutra. All rights reserved.</span>
              <a href="#privacy" className="hover:text-primary-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary-foreground transition-smooth">
                Terms of Service
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-primary-foreground/80">Made with</span>
              <Heart className="w-4 h-4 text-accent animate-gentle-pulse" />
              <span className="text-sm text-primary-foreground/80">for healers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;