import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Get the current session from the server
 * Use this in Server Components and Server Actions
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Get the current user from the session
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Require authentication - redirects to sign-in if not authenticated
 * Use this at the top of protected pages
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return session;
}

/**
 * Require admin role - redirects if not admin
 * Use this to protect admin-only pages
 */
export async function requireAdmin() {
  const session = await requireAuth();

  // Check if user has admin role (adjust based on your schema)
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return session;
}

/**
 * Check if user is authenticated (boolean)
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

/**
 * Check if user has a specific role
 */
export async function hasRole(role: string) {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Redirect authenticated users away from auth pages
 * Use this on sign-in/sign-up pages
 */
export async function redirectIfAuthenticated(redirectTo = "/") {
  const session = await getSession();

  if (session) {
    redirect(redirectTo);
  }
}

/**
 * Check if user owns a resource
 * Useful for authorization checks
 */
export async function isResourceOwner(resourceUserId: string) {
  const user = await getCurrentUser();
  return user?.id === resourceUserId;
}

/**
 * Get user ID or throw error
 * Useful when you need to ensure user is authenticated
 */
export async function getUserId() {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  return user.id;
}

/**
 * Check multiple permissions
 */
export async function hasPermissions(permissions: string[]) {
  const user = await getCurrentUser();

  if (!user) return false;

  // Adjust this based on your permission system
  // Example: check if user.permissions includes all required permissions
  const userPermissions =
    (user as { permissions?: string[] }).permissions || [];
  return permissions.every((permission) =>
    userPermissions.includes(permission),
  );
}

/**
 * Format user display name
 */
export function formatUserName(user: { name?: string; email: string }) {
  return user.name || user.email.split("@")[0];
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: { name?: string; email: string }) {
  if (user.name) {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return user.email.slice(0, 2).toUpperCase();
}
