import "server-only";
import { createHash } from "node:crypto";
import { cookies, headers } from "next/headers";
import { permitido } from "@/lib/limite";
import { COOKIE_SITIO } from "@/motor/hosts";
import { destinoSeguro } from "@/lib/auth/destino";
import { mercadoDeDesde, origenDeSitio, sitioDeHost, type OrigenAlta, type SitioCuenta } from "@/lib/auth/sitio";

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

const hostDelPedido = (h: Headers) => (h.get("x-forwarded-host") ?? h.get("host") ?? "").toLowerCase();

export async function sitioDelPedido(): Promise<SitioCuenta> {
  const [h, c] = await Promise.all([headers(), cookies()]);
  return sitioDeHost(hostDelPedido(h), c.get(COOKIE_SITIO.nombre)?.value);
}

// El país sale de la página de la que vino la persona (validada como cualquier destino), nunca de un
// campo que diga «mercado»: lo peor que puede hacer un valor fabricado es anotar otro país de la lista.
export function origenAlta(sitio: SitioCuenta, desde: unknown): OrigenAlta | undefined {
  if (sitio !== "intl") return undefined;
  return { sitio: "intl", mercado: mercadoDeDesde(destinoSeguro(desde, "", "intl")) };
}

// Ver origenDeSitio: nunca el Host a secas, siempre uno de la lista cerrada.
export async function origenDelSitio(): Promise<string> {
  const h = await headers();
  return origenDeSitio(await sitioDelPedido(), hostDelPedido(h));
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
  google: { ip: { max: 30, ventanaSeg: 900 }, email: { max: 10, ventanaSeg: 900 } },
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
