export type UserRole = "patient" | "practitioner" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};

const AUTH_KEY = "ayursutra.auth.user";

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function loginUser(name: string, role: UserRole): AuthUser {
  const user: AuthUser = {
    id: `${role}-${Math.random().toString(36).slice(2, 10)}`,
    name: name || (role === "patient" ? "Patient" : role === "practitioner" ? "Practitioner" : "Admin"),
    role,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function clearAllData(): void {
  // Clear all AyurSutra related data
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem("ayursutra.therapy.sessions");
  localStorage.removeItem("ayursutra.chat.messages");
  localStorage.removeItem("ayursutra.user.preferences");
  
  // Clear any other potential data
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('ayursutra.') || key.startsWith('ayur-')) {
      localStorage.removeItem(key);
    }
  });
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

export function hasRole(roles: UserRole | UserRole[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  const allowed = Array.isArray(roles) ? roles : [roles];
  return allowed.includes(user.role);
}


