import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { esRutaCalculo, validarCampos, type Campos } from "@/lib/formulario";
import { usuarioActual, type Usuario } from "@/lib/auth/sesion";
import { clienteServidor } from "@/lib/supabase/servidor";
import { permitido } from "@/lib/limite";

export const COLUMNAS = "id,path,titulo,campos,resumen,created_at,updated_at";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_CUERPO = 16 * 1024;

export type Codigo = "sesion" | "invalido" | "limite" | "maximo" | "no_disponible" | "no_existe" | "error" | "origen";

export function responder(cuerpo: unknown, status = 200, extra?: Record<string, string>) {
  return NextResponse.json(cuerpo, {
    status,
    headers: { "Cache-Control": "private, no-store", ...extra },
  });
}

export function fallar(codigo: Codigo, error: string, status: number, extra?: Record<string, string>) {
  return responder({ ok: false, codigo, error }, status, extra);
}

export function pathValido(p: unknown): p is string {
  return esRutaCalculo(p);
}

export function idValido(id: unknown): id is string {
  return typeof id === "string" && UUID.test(id);
}

export function textoLimpio(t: unknown, max: number): string | null {
  if (typeof t !== "string") return null;
  const s = Array.from(t, (ch) => {
    const c = ch.charCodeAt(0);
    return c < 32 || c === 127 || c === 0x2028 || c === 0x2029 ? " " : ch;
  })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
  return s && s.length <= max ? s : null;
}

export function camposValidos(c: unknown): Campos | null {
  return validarCampos(c);
}

// Las cookies de sesión son SameSite=Lax, pero se chequea el Origin igual: es gratis y
// cierra cualquier POST cruzado que un navegador viejo deje pasar.
export function origenValido(req: NextRequest): boolean {
  const origen = req.headers.get("origin");
  if (!origen) return true;
  try {
    return new URL(origen).host === (req.headers.get("x-forwarded-host") || req.headers.get("host"));
  } catch {
    return false;
  }
}

export async function leerJson(req: NextRequest): Promise<Record<string, unknown> | null> {
  const largo = Number(req.headers.get("content-length") || 0);
  if (largo > MAX_CUERPO) return null;
  try {
    const texto = await req.text();
    if (texto.length > MAX_CUERPO) return null;
    const x = JSON.parse(texto);
    return x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

type Contexto = { usuario: Usuario; sb: Awaited<ReturnType<typeof clienteServidor>> };

export async function conSesion(
  clave: string,
  max: number
): Promise<{ ok: true; ctx: Contexto } | { ok: false; res: NextResponse }> {
  let usuario: Usuario | null = null;
  try {
    usuario = await usuarioActual();
  } catch {
    usuario = null;
  }
  if (!usuario) {
    return { ok: false, res: fallar("sesion", "Ingresá a tu cuenta para seguir.", 401) };
  }
  if (!(await permitido(`${clave}:${usuario.id}`, max, 60))) {
    return {
      ok: false,
      res: fallar("limite", "Fueron muchos pedidos seguidos. Esperá un minuto y probá de nuevo.", 429, {
        "Retry-After": "60",
      }),
    };
  }
  try {
    return { ok: true, ctx: { usuario, sb: await clienteServidor() } };
  } catch {
    return { ok: false, res: noDisponible() };
  }
}

export function noDisponible() {
  return fallar(
    "no_disponible",
    "Todavía estamos terminando de preparar esta parte. Probá de nuevo en un rato.",
    503
  );
}

type ErrorDb = { code?: string; message?: string } | null | undefined;

export function errorDb(e: ErrorDb, accion: string) {
  const code = e?.code || "";
  const msg = e?.message || "";
  if (["42P01", "PGRST205", "PGRST202", "PGRST204"].includes(code) || /does not exist|schema cache/i.test(msg))
    return noDisponible();
  if (code === "P0001" || /m[aá]xim|l[ií]mite|limit/i.test(msg))
    return fallar(
      "maximo",
      "Ya tenés 200 cálculos guardados, que es el máximo. Borrá alguno desde Mi cuenta y volvé a intentar.",
      409
    );
  if (code === "23514" || code === "22001" || code === "22P02")
    return fallar("invalido", "Ese cálculo no se puede guardar así. Revisá el nombre y probá otra vez.", 400);
  if (code === "42501") return fallar("sesion", "No tenés permiso para hacer eso. Ingresá de nuevo.", 403);
  return fallar("error", `No pudimos ${accion}. Probá de nuevo en un rato.`, 500);
}
