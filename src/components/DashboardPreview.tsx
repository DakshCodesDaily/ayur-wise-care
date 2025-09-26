import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Activity, 
  Bell,
  User,
  Stethoscope,
  Clock,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 p-6">
      {/* Patient Dashboard */}
      <Card className="p-6 bg-gradient-to-br from-card to-accent-soft/20 border-accent/20 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Patient Portal</h3>
            </div>
            <Badge className="bg-accent/20 text-accent border-accent/30">Active</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Next Session</span>
              <div className="text-right">
                <p className="text-sm font-medium">Shirodhara</p>
                <p className="text-xs text-accent">Tomorrow 2:00 PM</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Progress</span>
              <div className="text-right">
                <p className="text-sm font-medium">Day 7/14</p>
                <div className="w-16 h-1 bg-muted rounded-full">
                  <div className="w-1/2 h-1 bg-gradient-primary rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Practitioner</span>
              <p className="text-sm font-medium">Dr. Priya Sharma</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button variant="hero" size="sm" className="flex-1">
              <Calendar className="w-4 h-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </Card>

      {/* Practitioner Dashboard */}
      <Card className="p-6 bg-gradient-to-br from-card to-therapeutic/20 border-therapeutic/20 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-therapeutic rounded-lg">
                <Stethoscope className="w-5 h-5 text-therapeutic-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Practitioner Hub</h3>
            </div>
            <Badge className="bg-therapeutic/20 text-therapeutic border-therapeutic/30">Online</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Today's Sessions</span>
              <p className="text-sm font-medium">8 scheduled</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Active Patients</span>
              <p className="text-sm font-medium">24 ongoing</p>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Pending Reviews</span>
              <div className="flex items-center space-x-1">
                <Bell className="w-3 h-3 text-accent" />
                <p className="text-sm font-medium">3 new</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button variant="healing" size="sm" className="flex-1">
              <Activity className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* Admin Dashboard */}
      <Card className="p-6 bg-gradient-to-br from-card to-primary/20 border-primary/20 shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-accent rounded-lg">
                <TrendingUp className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Admin Analytics</h3>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">Live</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Total Sessions</span>
              <p className="text-sm font-medium">1,247 this month</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Patient Satisfaction</span>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-accent" />
                <p className="text-sm font-medium">97.8%</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Revenue Growth</span>
              <p className="text-sm font-medium text-accent">+23% ↗</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button variant="gentle" size="sm" className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPreview;