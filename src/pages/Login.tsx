import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser, type UserRole } from "@/lib/auth";

const roles: UserRole[] = ["patient", "practitioner", "admin"];

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("patient");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginUser(name || "Guest", role);
    const redirect = role === "patient" ? "/schedule" : role === "practitioner" ? "/schedule" : "/";
    navigate(redirect, { replace: true });
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




