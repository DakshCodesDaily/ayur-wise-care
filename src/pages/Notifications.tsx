import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Heart, 
  Leaf, 
  Utensils,
  Activity,
  Sun,
  Moon,
  Droplets
} from "lucide-react";
import { 
  getNotificationsForTherapy, 
  getUnreadNotifications, 
  markNotificationAsRead,
  getTipsForTherapy,
  getTipsByCategory,
  type TherapyNotification,
  type TherapyTip
} from "@/lib/notifications";

const NotificationIcon = ({ type, priority }: { type: string; priority: string }) => {
  const iconClass = `w-5 h-5 ${
    priority === "high" ? "text-red-500" : 
    priority === "medium" ? "text-yellow-500" : 
    "text-green-500"
  }`;
  
  switch (type) {
    case "pre-therapy":
      return <Clock className={iconClass} />;
    case "post-therapy":
      return <CheckCircle className={iconClass} />;
    case "reminder":
      return <Bell className={iconClass} />;
    case "tip":
      return <Info className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

const TipIcon = ({ category }: { category: string }) => {
  const iconClass = "w-5 h-5 text-emerald-600";
  
  switch (category) {
    case "diet":
      return <Utensils className={iconClass} />;
    case "lifestyle":
      return <Activity className={iconClass} />;
    case "preparation":
      return <Sun className={iconClass} />;
    case "recovery":
      return <Moon className={iconClass} />;
    case "general":
      return <Heart className={iconClass} />;
    default:
      return <Leaf className={iconClass} />;
  }
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<"notifications" | "tips">("notifications");
  const [selectedTherapy, setSelectedTherapy] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [notifications, setNotifications] = useState<TherapyNotification[]>([]);
  const [tips, setTips] = useState<TherapyTip[]>([]);

  const therapyTypes = [
    "All", "Abhyanga", "Shirodhara", "Basti", "Vamana", "Virechana", 
    "Nasya", "Raktamokshana", "Udvartana", "Pizhichil", "Kizhi"
  ];

  const tipCategories = [
    "All", "diet", "lifestyle", "preparation", "recovery", "general"
  ];

  useEffect(() => {
    if (activeTab === "notifications") {
      const allNotifications = getUnreadNotifications();
      const filtered = selectedTherapy === "All" 
        ? allNotifications 
        : getNotificationsForTherapy(selectedTherapy);
      setNotifications(filtered);
    } else {
      const allTips = getTipsForTherapy(selectedTherapy === "All" ? "General" : selectedTherapy);
      const filtered = selectedCategory === "All" 
        ? allTips 
        : getTipsByCategory(selectedCategory);
      setTips(filtered);
    }
  }, [activeTab, selectedTherapy, selectedCategory]);

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Therapy Guidance</h1>
          <p className="text-slate-600 mt-2">
            Pre and post-therapy notifications, tips, and guidance for your healing journey
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === "notifications" ? "default" : "outline"}
            onClick={() => setActiveTab("notifications")}
            className="flex items-center space-x-2"
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </Button>
          <Button 
            variant={activeTab === "tips" ? "default" : "outline"}
            onClick={() => setActiveTab("tips")}
            className="flex items-center space-x-2"
          >
            <Heart className="w-4 h-4" />
            <span>Tips & Guidance</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-semibold text-slate-700">Therapy:</label>
          <select 
            className="h-10 rounded-xl border border-slate-300 bg-background px-3 focus:border-emerald-500"
            value={selectedTherapy}
            onChange={(e) => setSelectedTherapy(e.target.value)}
          >
            {therapyTypes.map(therapy => (
              <option key={therapy} value={therapy}>{therapy}</option>
            ))}
          </select>
        </div>
        
        {activeTab === "tips" && (
          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold text-slate-700">Category:</label>
            <select 
              className="h-10 rounded-xl border border-slate-300 bg-background px-3 focus:border-emerald-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {tipCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No notifications</p>
                <p className="text-slate-400">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-slate-100 rounded-xl">
                      <NotificationIcon type={notification.type} priority={notification.priority} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{notification.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${
                              notification.priority === "high" ? "bg-red-100 text-red-700" :
                              notification.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}
                          >
                            {notification.priority}
                          </Badge>
                          <Badge variant="outline">{notification.timing}</Badge>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-3">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <span>Therapy: {notification.therapy}</span>
                          <span>•</span>
                          <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                        >
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === "tips" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.length === 0 ? (
            <Card className="col-span-full shadow-lg">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No tips available</p>
                <p className="text-slate-400">Try selecting a different therapy or category</p>
              </CardContent>
            </Card>
          ) : (
            tips.map((tip) => (
              <Card key={tip.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <TipIcon category={tip.category} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{tip.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {tip.category}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              tip.importance === "critical" ? "bg-red-100 text-red-700" :
                              tip.importance === "important" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}
                          >
                            {tip.importance}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{tip.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Therapy: {tip.therapy}</span>
                      <span>Timing: {tip.timing}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
