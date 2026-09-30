import "server-only";
import { redirect } from "next/navigation";
import { usuarioActual } from "@/lib/auth/sesion";
import { destinoSeguro } from "@/lib/auth/destino";

export function esAdminEmail(email: string | null | undefined): boolean {
  const lista = (process.env.ADMIN_EMAILS || "manunv97@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return !!email && lista.includes(email.trim().toLowerCase());
}

export async function requireAdmin(next: string): Promise<{ email: string }> {
  const usuario = await usuarioActual();
  if (!usuario) redirect(`/login?next=${encodeURIComponent(destinoSeguro(next, "/dashboard"))}`);
  if (!usuario.verificado || !esAdminEmail(usuario.email)) redirect("/cuenta?aviso=sin-permiso");
  return { email: usuario.email };
}
