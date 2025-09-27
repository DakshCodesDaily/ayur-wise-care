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

const EnhancedLogin = () => {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-emerald-50">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">AyurSutra Registration</h1>
          </div>
          <CardDescription className="text-lg">
            {step === "basic" && "Create your account and choose your role"}
            {step === "medical" && "Tell us about your medical history"}
            {step === "contact" && "Provide your contact information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className={`flex items-center space-x-2 ${step === "basic" ? "text-emerald-600" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "basic" ? "bg-emerald-100" : "bg-slate-100"}`}>
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Basic Info</span>
            </div>
            <div className={`w-8 h-0.5 ${step === "medical" || step === "contact" ? "bg-emerald-500" : "bg-slate-300"}`} />
            <div className={`flex items-center space-x-2 ${step === "medical" ? "text-emerald-600" : step === "contact" ? "text-slate-400" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "medical" ? "bg-emerald-100" : "bg-slate-100"}`}>
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Medical</span>
            </div>
            <div className={`w-8 h-0.5 ${step === "contact" ? "bg-emerald-500" : "bg-slate-300"}`} />
            <div className={`flex items-center space-x-2 ${step === "contact" ? "text-emerald-600" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "contact" ? "bg-emerald-100" : "bg-slate-100"}`}>
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Contact</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === "basic" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    placeholder="Enter your full name" 
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Role</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((r) => (
                      <Button 
                        key={r} 
                        type="button" 
                        variant={formData.role === r ? "default" : "outline"} 
                        onClick={() => setFormData({...formData, role: r})}
                        className={`rounded-xl ${
                          formData.role === r 
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical History */}
            {step === "medical" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Age</Label>
                    <Input 
                      type="number" 
                      value={formData.medicalHistory.age} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        medicalHistory: {...formData.medicalHistory, age: parseInt(e.target.value) || 0}
                      })} 
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Gender</Label>
                    <select 
                      className="h-10 w-full rounded-xl border border-slate-300 bg-background px-3"
                      value={formData.medicalHistory.gender}
                      onChange={(e) => setFormData({
                        ...formData, 
                        medicalHistory: {...formData.medicalHistory, gender: e.target.value as "male" | "female" | "other"}
                      })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Height (cm)</Label>
                    <Input 
                      value={formData.medicalHistory.height} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        medicalHistory: {...formData.medicalHistory, height: e.target.value}
                      })} 
                      placeholder="170"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Weight (kg)</Label>
                    <Input 
                      value={formData.medicalHistory.weight} 
                      onChange={(e) => setFormData({
                        ...formData, 
                        medicalHistory: {...formData.medicalHistory, weight: e.target.value}
                      })} 
                      placeholder="70"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Blood Type</Label>
                    <select 
                      className="h-10 w-full rounded-xl border border-slate-300 bg-background px-3"
                      value={formData.medicalHistory.bloodType}
                      onChange={(e) => setFormData({
                        ...formData, 
                        medicalHistory: {...formData.medicalHistory, bloodType: e.target.value}
                      })}
                    >
                      <option value="">Select Blood Type</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Chronic Diseases */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Chronic Diseases</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.medicalHistory.chronicDiseases.map((disease, index) => (
                      <span key={index} className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        <span>{disease}</span>
                        <button type="button" onClick={() => removeFromArray("chronicDiseases", index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Add chronic disease" 
                      className="rounded-xl"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addToArray("chronicDiseases", e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <Button type="button" onClick={() => {
                      const input = document.querySelector('input[placeholder="Add chronic disease"]') as HTMLInputElement;
                      if (input) {
                        addToArray("chronicDiseases", input.value);
                        input.value = "";
                      }
                    }} className="rounded-xl">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {commonDiseases.map(disease => (
                      <Button 
                        key={disease} 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addToArray("chronicDiseases", disease)}
                        className="text-xs rounded-full"
                      >
                        {disease}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Genetic Diseases */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Genetic Diseases</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.medicalHistory.geneticDiseases.map((disease, index) => (
                      <span key={index} className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        <span>{disease}</span>
                        <button type="button" onClick={() => removeFromArray("geneticDiseases", index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Add genetic disease" 
                      className="rounded-xl"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addToArray("geneticDiseases", e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <Button type="button" onClick={() => {
                      const input = document.querySelector('input[placeholder="Add genetic disease"]') as HTMLInputElement;
                      if (input) {
                        addToArray("geneticDiseases", input.value);
                        input.value = "";
                      }
                    }} className="rounded-xl">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {geneticDiseases.map(disease => (
                      <Button 
                        key={disease} 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => addToArray("geneticDiseases", disease)}
                        className="text-xs rounded-full"
                      >
                        {disease}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Allergies</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.medicalHistory.allergies.map((allergy, index) => (
                      <span key={index} className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        <span>{allergy}</span>
                        <button type="button" onClick={() => removeFromArray("allergies", index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Input 
                    placeholder="Add allergy" 
                    className="rounded-xl"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray("allergies", e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === "contact" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Phone Number</Label>
                    <Input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      placeholder="+1 (555) 123-4567"
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Email</Label>
                    <Input 
                      type="email"
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      placeholder="your@email.com"
                      className="rounded-xl"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Address</Label>
                  <Input 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})} 
                    placeholder="Your complete address"
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-semibold">Emergency Contact</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-600">Name</Label>
                      <Input 
                        value={formData.emergencyContact.name} 
                        onChange={(e) => setFormData({
                          ...formData, 
                          emergencyContact: {...formData.emergencyContact, name: e.target.value}
                        })} 
                        placeholder="Emergency contact name"
                        className="rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-600">Phone</Label>
                      <Input 
                        value={formData.emergencyContact.phone} 
                        onChange={(e) => setFormData({
                          ...formData, 
                          emergencyContact: {...formData.emergencyContact, phone: e.target.value}
                        })} 
                        placeholder="Emergency phone"
                        className="rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-600">Relationship</Label>
                      <Input 
                        value={formData.emergencyContact.relationship} 
                        onChange={(e) => setFormData({
                          ...formData, 
                          emergencyContact: {...formData.emergencyContact, relationship: e.target.value}
                        })} 
                        placeholder="e.g., Spouse, Parent"
                        className="rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {step !== "basic" && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(step === "contact" ? "medical" : "basic")}
                  className="rounded-xl"
                >
                  Previous
                </Button>
              )}
              <div className="flex-1" />
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {step === "contact" ? "Complete Registration" : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLogin;
