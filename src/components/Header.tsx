import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-full shadow-glow animate-gentle-pulse">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary">AyurSutra</h1>
              <p className="text-xs text-muted-foreground">Healing Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button variant="hero">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden mt-4 space-y-4 transition-all duration-300",
          isMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
        )}>
          <nav className="flex flex-col space-y-2">
            <a href="#features" className="p-2 text-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#about" className="p-2 text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#contact" className="p-2 text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>
          <div className="flex flex-col space-y-2 pt-4 border-t border-border">
            <Button variant="ghost" className="justify-start">Sign In</Button>
            <Button variant="hero" className="justify-start">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;