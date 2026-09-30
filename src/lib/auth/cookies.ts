import { COOKIE_PISTA } from "@/lib/sesion-cliente";

// Sin "server-only": lo importa proxy.ts, que no compila con la condición react-server.

const EN_PRODUCCION = process.env.NODE_ENV === "production";

// Misma vida que la cookie de sesión de @supabase/ssr (DEFAULT_COOKIE_OPTIONS.maxAge): si la
// pista durara menos, el header diría «Ingresar» con la sesión todavía viva.
const VIDA_SEG = 400 * 24 * 60 * 60;

// httpOnly porque en el navegador no corre Supabase (decisión 5 del SPEC): nadie en el cliente
// necesita leer el token, así que un XSS no se lo puede llevar.
export const OPCIONES_COOKIE_SESION = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: true,
  secure: EN_PRODUCCION,
};

export const OPCIONES_PISTA = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: false,
  secure: EN_PRODUCCION,
  maxAge: VIDA_SEG,
};

// Ata el mail de alta al navegador que hizo el registro: guarda la huella del token (no el
// token) y sólo viaja a /auth. Ver confirmarEnlace.
export const COOKIE_ALTA = "ca_alta";
export const OPCIONES_ALTA = {
  path: "/auth",
  sameSite: "lax" as const,
  httpOnly: true,
  secure: EN_PRODUCCION,
  maxAge: 24 * 60 * 60,
};

type Almacen = {
  set: (nombre: string, valor: string, opciones?: typeof OPCIONES_PISTA) => unknown;
  delete: (nombre: string) => unknown;
};

export function ponerPista(almacen: Almacen) {
  almacen.set(COOKIE_PISTA, "1", OPCIONES_PISTA);
}

export function borrarPista(almacen: Almacen) {
  almacen.delete(COOKIE_PISTA);
}

export function tieneCookiesDeSesion(nombres: string[]): boolean {
  return nombres.some((n) => n.startsWith("sb-") && n.includes("-auth-token"));
}
