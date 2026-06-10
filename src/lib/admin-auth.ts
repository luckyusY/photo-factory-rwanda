import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "pfr-admin";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "photo-factory-dev-secret"
  );
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export function adminToken() {
  return createHmac("sha256", secret())
    .update("photo-factory-admin-session")
    .digest("hex");
}

export function checkCredentials(email: string, password: string) {
  if (!adminConfigured()) return false;
  return (
    email.trim().toLowerCase() === process.env.ADMIN_EMAIL!.toLowerCase() &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const expected = adminToken();
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
