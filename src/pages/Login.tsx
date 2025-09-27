import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser, type UserRole, type MedicalHistory, type ContactInfo } from "@/lib/auth";
import { User, Stethoscope, Shield, Plus, X } from "lucide-react";

const roles: UserRole[] = ["patient", "practitioner", "admin"];

const commonDiseases = [
  "Diabetes", "Hypertension", "Heart Disease", "Asthma", "Arthritis", 
  "Thyroid Disorders", "Migraine", "Depression", "Anxiety", "Obesity"
];

const geneticDiseases = [
  "Sickle Cell Anemia", "Thalassemia", "Hemophilia", "Cystic Fibrosis",
  "Huntington's Disease", "Muscular Dystrophy", "Down Syndrome", "Turner Syndrome"
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"basic" | "medical" | "contact">("basic");
  const [formData, setFormData] = useState({
    name: "",
    role: "patient" as UserRole,
    phone: "",
    email: "",
    address: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: ""
    },
    medicalHistory: {
      chronicDiseases: [] as string[],
      allergies: [] as string[],
      medications: [] as string[],
      surgeries: [] as string[],
      familyHistory: [] as string[],
      geneticDiseases: [] as string[],
      bloodType: "",
      height: "",
      weight: "",
      age: 0,
      gender: "male" as "male" | "female" | "other",
      pregnancyStatus: "not-pregnant" as "pregnant" | "not-pregnant" | "unknown",
      lastMedicalCheckup: ""
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === "basic") {
      setStep("medical");
      return;
    }
    if (step === "medical") {
      setStep("contact");
      return;
    }
    
    // Final submission
    const medicalHistory: MedicalHistory = formData.medicalHistory;
    const contactInfo: ContactInfo = {
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      emergencyContact: formData.emergencyContact
    };
    
    loginUser(formData.name || "Guest", formData.role, medicalHistory, contactInfo);
    const redirect = formData.role === "patient" ? "/schedule" : formData.role === "practitioner" ? "/schedule" : "/";
    navigate(redirect, { replace: true });
  }

  function addToArray(field: string, value: string) {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: [...(prev.medicalHistory[field as keyof typeof prev.medicalHistory] as string[]), value]
      }
    }));
  }

  function removeFromArray(field: string, index: number) {
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: (prev.medicalHistory[field as keyof typeof prev.medicalHistory] as string[]).filter((_, i) => i !== index)
      }
    }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to AyurSutra</CardTitle>
          <CardDescription>Choose your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <Button key={r} type="button" variant={r === role ? "therapeutic" : "outline"} onClick={() => setRole(r)}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full" variant="hero">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;




