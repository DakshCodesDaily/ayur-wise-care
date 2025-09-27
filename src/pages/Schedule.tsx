import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { generateTherapyNotifications } from "@/lib/notifications";
import { Calendar, Clock, User, Stethoscope, Plus, Edit, Trash2, TrendingUp, Activity, CheckCircle2 } from "lucide-react";

type TherapySession = {
  id: string;
  patientName: string;
  practitionerName: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  therapy: string;
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  notes?: string;
  progress?: number; // 0-100
};

type PatientProgress = {
  id: string;
  patientName: string;
  totalSessions: number;
  completedSessions: number;
  currentTherapy: string;
  progress: number;
  lastSession: string;
  nextSession?: string;
};

const STORAGE_KEY = "ayursutra.therapy.sessions";

function loadSessions(): TherapySession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TherapySession[]) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: TherapySession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function isConflict(a: TherapySession, b: TherapySession) {
  if (a.date !== b.date) return false;
  if (a.practitionerName !== b.practitionerName) return false;
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const aStart = toMinutes(a.start);
  const aEnd = toMinutes(a.end);
  const bStart = toMinutes(b.start);
  const bEnd = toMinutes(b.end);
  return Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
}

const practitioners = ["Dr. Sharma", "Dr. Iyer", "Therapist Rao"]; // seed

const therapyTypes = [
  "Abhyanga (Oil Massage)",
  "Shirodhara (Oil Pouring)",
  "Basti (Enema Therapy)",
  "Vamana (Therapeutic Vomiting)",
  "Virechana (Purgation)",
  "Nasya (Nasal Therapy)",
  "Raktamokshana (Bloodletting)",
  "Udvartana (Herbal Powder Massage)",
  "Pizhichil (Oil Bath)",
  "Kizhi (Herbal Bundle Massage)"
];

const PROGRESS_STORAGE_KEY = "ayursutra.patient.progress";

function loadPatientProgress(): PatientProgress[] {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PatientProgress[]) : [];
  } catch {
    return [];
  }
}

function savePatientProgress(progress: PatientProgress[]) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

const Schedule = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [sessions, setSessions] = useState<TherapySession[]>(loadSessions());
  const [patientProgress, setPatientProgress] = useState<PatientProgress[]>(loadPatientProgress());
  const [activeTab, setActiveTab] = useState<"schedule" | "progress" | "analytics">("schedule");
  const [form, setForm] = useState({
    patientName: user?.role === "patient" ? user.name : "",
    practitionerName: practitioners[0],
    date: "",
    start: "10:00",
    end: "11:00",
    therapy: therapyTypes[0],
    notes: "",
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    savePatientProgress(patientProgress);
  }, [patientProgress]);

  const mySessions = useMemo(() => {
    if (!user) return [] as TherapySession[];
    if (user.role === "patient") return sessions.filter((s) => s.patientName === user.name);
    if (user.role === "practitioner") return sessions.filter((s) => s.practitionerName === user.name || practitioners.includes(user.name));
    return sessions;
  }, [sessions, user]);

  function book() {
    const newItem: TherapySession = {
      id: Math.random().toString(36).slice(2, 10),
      patientName: form.patientName || user?.name || "",
      practitionerName: form.practitionerName,
      date: form.date,
      start: form.start,
      end: form.end,
      therapy: form.therapy,
      status: "scheduled",
      notes: form.notes,
      progress: 0,
    };
    if (!newItem.date) return alert("Please select date");
    if (isNaN(Date.parse(newItem.date))) return alert("Invalid date");

    const conflict = sessions.some((s) => isConflict(s, newItem));
    if (conflict) return alert("Time conflict for selected practitioner.");
    
    setSessions((prev) => [...prev, newItem]);
    
    // Update patient progress
    updatePatientProgress(newItem.patientName, newItem.therapy);
    
    // Generate therapy notifications
    const notifications = generateTherapyNotifications(newItem.therapy, newItem.date);
    notifications.forEach(notification => {
      // Store notifications in localStorage
      const existingNotifications = JSON.parse(localStorage.getItem("ayursutra.notifications") || "[]");
      existingNotifications.push(notification);
      localStorage.setItem("ayursutra.notifications", JSON.stringify(existingNotifications));
    });
    
    // Reset form
    setForm({
      patientName: user?.role === "patient" ? user.name : "",
      practitionerName: practitioners[0],
      date: "",
      start: "10:00",
      end: "11:00",
      therapy: therapyTypes[0],
      notes: "",
    });
  }

  function updatePatientProgress(patientName: string, therapy: string) {
    const existing = patientProgress.find(p => p.patientName === patientName);
    if (existing) {
      setPatientProgress(prev => prev.map(p => 
        p.patientName === patientName 
          ? { ...p, totalSessions: p.totalSessions + 1, currentTherapy: therapy }
          : p
      ));
    } else {
      const newProgress: PatientProgress = {
        id: Math.random().toString(36).slice(2, 10),
        patientName,
        totalSessions: 1,
        completedSessions: 0,
        currentTherapy: therapy,
        progress: 0,
        lastSession: new Date().toISOString().split('T')[0],
      };
      setPatientProgress(prev => [...prev, newProgress]);
    }
  }

  function remove(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  function reschedule(id: string, date: string, start: string, end: string) {
    const current = sessions.find((s) => s.id === id);
    if (!current) return;
    const updated: TherapySession = { ...current, date, start, end };
    if (sessions.some((s) => s.id !== id && isConflict(s, updated))) {
      return alert("New time conflicts with another session.");
    }
    setSessions((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {user?.role === "patient" ? "My Therapy Sessions" : "Therapy Management"}
          </h1>
          <p className="text-slate-600 mt-2">
            {user?.role === "patient" 
              ? "Book and track your Panchakarma therapy sessions" 
              : "Manage patient schedules and track progress"
            }
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === "schedule" ? "default" : "outline"}
            onClick={() => setActiveTab("schedule")}
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </Button>
          <Button 
            variant={activeTab === "progress" ? "default" : "outline"}
            onClick={() => setActiveTab("progress")}
            className="flex items-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Progress</span>
          </Button>
          {user?.role === "practitioner" && (
            <Button 
              variant={activeTab === "analytics" ? "default" : "outline"}
              onClick={() => setActiveTab("analytics")}
              className="flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </Button>
          )}
        </div>
      </div>

      {/* Schedule Tab */}
      {activeTab === "schedule" && (
        <>
          {/* Booking Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>{user?.role === "patient" ? "Book New Session" : "Add Therapy Session"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user?.role !== "patient" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Patient Name</Label>
                    <Input 
                      value={form.patientName} 
                      onChange={(e) => setForm({ ...form, patientName: e.target.value })} 
                      placeholder="Enter patient name"
                      className="rounded-xl"
                    />
                  </div>
                )}
                {user?.role === "patient" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Patient Name</Label>
                    <Input value={form.patientName} readOnly className="rounded-xl bg-slate-50" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Practitioner</Label>
                  <select
                    className="h-10 w-full rounded-xl border border-slate-300 bg-background px-3 focus:border-emerald-500 focus:ring-emerald-500"
                    value={form.practitionerName}
                    onChange={(e) => setForm({ ...form, practitionerName: e.target.value })}
                  >
                    {practitioners.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Therapy Type</Label>
                  <select
                    className="h-10 w-full rounded-xl border border-slate-300 bg-background px-3 focus:border-emerald-500 focus:ring-emerald-500"
                    value={form.therapy}
                    onChange={(e) => setForm({ ...form, therapy: e.target.value })}
                  >
                    {therapyTypes.map((therapy) => (
                      <option key={therapy} value={therapy}>{therapy}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date</Label>
                  <Input 
                    type="date" 
                    value={form.date} 
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Start Time</Label>
                  <Input 
                    type="time" 
                    value={form.start} 
                    onChange={(e) => setForm({ ...form, start: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">End Time</Label>
                  <Input 
                    type="time" 
                    value={form.end} 
                    onChange={(e) => setForm({ ...form, end: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label className="text-sm font-semibold">Notes</Label>
                  <Input 
                    value={form.notes} 
                    onChange={(e) => setForm({ ...form, notes: e.target.value })} 
                    placeholder="Additional notes or special instructions"
                    className="rounded-xl"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <Button 
                    onClick={book} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {user?.role === "patient" ? "Book Session" : "Add Session"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sessions List */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mySessions.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">No sessions scheduled yet</p>
                    <p className="text-slate-400">Book your first therapy session above</p>
                  </div>
                )}
                {mySessions
                  .slice()
                  .sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start))
                  .map((s) => (
                    <div key={s.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all duration-300">
                      <div className="grid md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-emerald-100 rounded-xl">
                              <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{s.patientName}</p>
                              <p className="text-sm text-slate-600">{s.practitionerName}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-slate-600">Therapy</p>
                          <p className="font-medium text-slate-900">{s.therapy}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-slate-600">Date</p>
                          <p className="font-medium text-slate-900">{new Date(s.date).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-slate-600">Time</p>
                          <p className="font-medium text-slate-900">{s.start} - {s.end}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Badge 
                            className={`${
                              s.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                              s.status === "completed" ? "bg-green-100 text-green-700" :
                              s.status === "in-progress" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}
                          >
                            {s.status}
                          </Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const date = prompt("New date (YYYY-MM-DD)", s.date) || s.date;
                              const start = prompt("New start (HH:mm)", s.start) || s.start;
                              const end = prompt("New end (HH:mm)", s.end) || s.end;
                              reschedule(s.id, date, start, end);
                            }}
                            className="rounded-lg"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => remove(s.id)}
                            className="rounded-lg text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Progress Tab */}
      {activeTab === "progress" && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Patient Progress Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {patientProgress.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">No patient progress data yet</p>
                  <p className="text-slate-400">Progress will be tracked as sessions are completed</p>
                </div>
              )}
              {patientProgress.map((patient) => (
                <div key={patient.id} className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <p className="text-sm text-slate-600">Patient</p>
                      <p className="font-bold text-slate-900">{patient.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Current Therapy</p>
                      <p className="font-medium text-slate-900">{patient.currentTherapy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Sessions</p>
                      <p className="font-medium text-slate-900">{patient.completedSessions}/{patient.totalSessions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Progress</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${patient.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-900">{patient.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tab (Practitioner only) */}
      {activeTab === "analytics" && user?.role === "practitioner" && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{sessions.length}</p>
                  <p className="text-sm text-slate-600">Total Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {sessions.filter(s => s.status === "completed").length}
                  </p>
                  <p className="text-sm text-slate-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{patientProgress.length}</p>
                  <p className="text-sm text-slate-600">Active Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Schedule;


