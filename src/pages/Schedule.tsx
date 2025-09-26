import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/auth";

type TherapySession = {
  id: string;
  patientName: string;
  practitionerName: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  therapy: string;
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

const Schedule = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [sessions, setSessions] = useState<TherapySession[]>(loadSessions());
  const [form, setForm] = useState({
    patientName: user?.role === "patient" ? user.name : "",
    practitionerName: practitioners[0],
    date: "",
    start: "10:00",
    end: "11:00",
    therapy: "Abhyanga",
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

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
    };
    if (!newItem.date) return alert("Please select date");
    if (isNaN(Date.parse(newItem.date))) return alert("Invalid date");

    const conflict = sessions.some((s) => isConflict(s, newItem));
    if (conflict) return alert("Time conflict for selected practitioner.");
    setSessions((prev) => [...prev, newItem]);
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
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{user?.role === "patient" ? "Book a Therapy Session" : "Manage Therapy Schedule"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-6 gap-3 items-end">
            {user?.role !== "patient" && (
              <div className="md:col-span-2">
                <Label>Patient Name</Label>
                <Input value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} placeholder="Patient" />
              </div>
            )}
            {user?.role === "patient" && (
              <div className="md:col-span-2">
                <Label>Patient Name</Label>
                <Input value={form.patientName} readOnly />
              </div>
            )}
            <div>
              <Label>Practitioner</Label>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3"
                value={form.practitionerName}
                onChange={(e) => setForm({ ...form, practitionerName: e.target.value })}
              >
                {practitioners.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <Label>Start</Label>
              <Input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
            </div>
            <div>
              <Label>End</Label>
              <Input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Therapy</Label>
              <Input value={form.therapy} onChange={(e) => setForm({ ...form, therapy: e.target.value })} placeholder="e.g. Abhyanga" />
            </div>
            <div>
              <Button onClick={book} variant="hero" className="w-full">
                {user?.role === "patient" ? "Book" : "Add"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mySessions.length === 0 && <p className="text-muted-foreground">No sessions yet.</p>}
            {mySessions
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start))
              .map((s) => (
                <div key={s.id} className="grid md:grid-cols-8 items-center gap-2 border rounded-md p-3">
                  <div className="md:col-span-2 font-medium">{s.patientName}</div>
                  <div>{s.practitionerName}</div>
                  <div>{s.therapy}</div>
                  <div>{s.date}</div>
                  <div>
                    {s.start} - {s.end}
                  </div>
                  <div className="flex gap-2 justify-end md:col-span-2">
                    <Button variant="outline" onClick={() => {
                      const date = prompt("New date (YYYY-MM-DD)", s.date) || s.date;
                      const start = prompt("New start (HH:mm)", s.start) || s.start;
                      const end = prompt("New end (HH:mm)", s.end) || s.end;
                      reschedule(s.id, date, start, end);
                    }}>Reschedule</Button>
                    <Button variant="destructive" onClick={() => remove(s.id)}>Cancel</Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;


