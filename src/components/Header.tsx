import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, LogOut, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser, clearAllData } from "@/lib/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getCurrentUser();

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This will remove all login sessions, therapy bookings, and chat history. This action cannot be undone.")) {
      clearAllData();
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-slate-900">AyurSutra</h1>
              <p className="text-xs text-slate-600 font-medium">Healing Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-slate-700 hover:text-emerald-600 font-semibold transition-colors duration-200">Home</a>
            <a href="/schedule" className="text-slate-700 hover:text-emerald-600 font-semibold transition-colors duration-200">Schedule</a>
            <a href="/chatbot" className="text-slate-700 hover:text-emerald-600 font-semibold transition-colors duration-200">Chatbot</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <a href="/login">
                  <Button variant="ghost" className="text-slate-700 hover:text-emerald-600 font-semibold">Sign In</Button>
                </a>
                <a href="/login">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                  </Button>
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-xl">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                  <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">{user.role}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleClearData}
                  className="border-red-300 text-red-700 hover:bg-red-50 font-semibold"
                  title="Clear all data"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Data
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { logoutUser(); window.location.href = "/"; }}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden mt-6 space-y-4 transition-all duration-300",
          isMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
        )}>
          <nav className="flex flex-col space-y-3">
            <a href="/" className="p-3 text-slate-700 hover:text-emerald-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200">Home</a>
            <a href="/schedule" className="p-3 text-slate-700 hover:text-emerald-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200">Schedule</a>
            <a href="/chatbot" className="p-3 text-slate-700 hover:text-emerald-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200">Chatbot</a>
          </nav>
          <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
            {!user ? (
              <>
                <a href="/login">
                  <Button variant="ghost" className="justify-start text-slate-700 hover:text-emerald-600 font-semibold">Sign In</Button>
                </a>
                <a href="/login">
                  <Button className="justify-start bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Get Started</Button>
                </a>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-xl">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                  <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">{user.role}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="justify-start border-red-300 text-red-700 hover:bg-red-50 font-semibold" 
                  onClick={handleClearData}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Data
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold" 
                  onClick={() => { logoutUser(); window.location.href = "/"; }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;