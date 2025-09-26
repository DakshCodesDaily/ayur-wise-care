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
  TrendingUp,
  ArrowRight
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8 p-8">
      {/* Patient Dashboard */}
      <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Patient Portal</h3>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 rounded-full font-semibold">Active</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-emerald-200/50">
              <span className="text-slate-600 font-medium">Next Session</span>
              <div className="text-right">
                <p className="text-slate-900 font-bold">Shirodhara</p>
                <p className="text-emerald-600 text-sm font-semibold">Tomorrow 2:00 PM</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-emerald-200/50">
              <span className="text-slate-600 font-medium">Progress</span>
              <div className="text-right">
                <p className="text-slate-900 font-bold">Day 7/14</p>
                <div className="w-20 h-2 bg-emerald-200 rounded-full mt-1">
                  <div className="w-1/2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-slate-600 font-medium">Practitioner</span>
              <p className="text-slate-900 font-bold">Dr. Priya Sharma</p>
            </div>
          </div>

          <div className="pt-4">
            <a href="/schedule" className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Calendar className="w-5 h-5 mr-2" />
                Book Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Practitioner Dashboard */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Practitioner Hub</h3>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 rounded-full font-semibold">Online</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-blue-200/50">
              <span className="text-slate-600 font-medium">Today's Sessions</span>
              <p className="text-slate-900 font-bold">8 scheduled</p>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-blue-200/50">
              <span className="text-slate-600 font-medium">Active Patients</span>
              <p className="text-slate-900 font-bold">24 ongoing</p>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-slate-600 font-medium">Pending Reviews</span>
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <p className="text-slate-900 font-bold">3 new</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a href="/schedule" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Activity className="w-5 h-5 mr-2" />
                View Schedule
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Admin Dashboard */}
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100/50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Admin Analytics</h3>
            </div>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1 rounded-full font-semibold">Live</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-purple-200/50">
              <span className="text-slate-600 font-medium">Total Sessions</span>
              <p className="text-slate-900 font-bold">1,247 this month</p>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-purple-200/50">
              <span className="text-slate-600 font-medium">Patient Satisfaction</span>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <p className="text-slate-900 font-bold">97.8%</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-slate-600 font-medium">Revenue Growth</span>
              <p className="text-emerald-600 font-bold">+23% ↗</p>
            </div>
          </div>

          <div className="pt-4">
            <a href="/login" className="block">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Users className="w-5 h-5 mr-2" />
                Manage Users
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPreview;