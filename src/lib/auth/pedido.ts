import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { permitido } from "@/lib/limite";

const SITIO = "https://calcular.ar";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizarEmail(crudo: FormDataEntryValue | null | undefined): string | null {
  const e = (typeof crudo === "string" ? crudo : "").trim().toLowerCase();
  return e.length <= 254 && EMAIL_RE.test(e) ? e : null;
}

export async function ipDelPedido(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (xff || h.get("x-real-ip") || "sin-ip").slice(0, 64);
}

// El origen de los enlaces sale de una lista cerrada y nunca del Host a secas: un Host
// inyectado mandaría el token_hash de otra persona a un dominio ajeno.
export async function origenDelSitio(): Promise<string> {
  if (process.env.VERCEL_ENV === "production") return SITIO;
  const h = await headers();
  const host = (h.get("x-forwarded-host") ?? h.get("host") ?? "").toLowerCase();
  if (/^(localhost|127\.0\.0\.1)(:\d{2,5})?$/.test(host)) return `http://${host}`;
  if (/^[a-z0-9-]+\.vercel\.app$/.test(host)) return `https://${host}`;
  return SITIO;
}

const huella = (v: string) => createHash("sha256").update(v).digest("hex").slice(0, 24);

export const huellaAlta = (tokenHash: string) => createHash("sha256").update(`alta:${tokenHash}`).digest("base64url");

type Regla = { max: number; ventanaSeg: number };

export const LIMITES = {
  registro: { ip: { max: 10, ventanaSeg: 3600 }, email: { max: 3, ventanaSeg: 3600 } },
  clave: { ip: { max: 20, ventanaSeg: 900 }, email: { max: 8, ventanaSeg: 900 } },
  enlace: { ip: { max: 10, ventanaSeg: 3600 }, email: { max: 3, ventanaSeg: 3600 } },
  recuperar: { ip: { max: 10, ventanaSeg: 3600 }, email: { max: 3, ventanaSeg: 3600 } },
  confirmar: { ip: { max: 30, ventanaSeg: 900 }, email: { max: 10, ventanaSeg: 900 } },
} satisfies Record<string, { ip: Regla; email: Regla }>;

export type Accion = keyof typeof LIMITES;

// El mail va hasheado: la tabla de límites no tiene por qué guardar direcciones.
export async function limitePorIp(accion: Accion): Promise<boolean> {
  const r = LIMITES[accion].ip;
  return permitido(`auth:${accion}:ip:${huella(await ipDelPedido())}`, r.max, r.ventanaSeg);
}

export async function limitePorEmail(accion: Accion, email: string): Promise<boolean> {
  const r = LIMITES[accion].email;
  return permitido(`auth:${accion}:email:${huella(email)}`, r.max, r.ventanaSeg);
}
