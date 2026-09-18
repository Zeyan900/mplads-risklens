"use client";

const ADMIN_STORAGE_KEY = "nigrani_admin_authenticated";
const ADMIN_ID = "Prototype20";
const ADMIN_PASS = "Admintest@1234";

export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true" || localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function loginAdmin(id: string, pass: string, remember: boolean = false): { success: boolean; error?: string } {
  if (id.trim() === ADMIN_ID && pass.trim() === ADMIN_PASS) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      if (remember) {
        localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      }
      window.dispatchEvent(new Event("nigrani_admin_auth_change"));
    }
    return { success: true };
  }
  return { success: false, error: "Invalid Admin ID or Password. Please check provided prototype credentials." };
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    window.dispatchEvent(new Event("nigrani_admin_auth_change"));
  }
}
