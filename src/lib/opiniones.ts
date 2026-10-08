// Sin "server-only": lo usan el formulario (límites y textos), las Server Actions y
// scripts/check_opiniones.ts. Los límites tienen que coincidir con los checks de la tabla
// ca_opiniones (supabase/migrations/20261007120000_ca_opiniones.sql); el check lo verifica.

export const TIPOS_OPINION = ["idea", "error", "otra"] as const;
export type TipoOpinion = (typeof TIPOS_OPINION)[number];

export const ESTADOS_OPINION = ["nueva", "leida", "resuelta"] as const;
export type EstadoOpinion = (typeof ESTADOS_OPINION)[number];

export const MIN_MENSAJE = 5;
export const MAX_MENSAJE = 2000;
export const MAX_DESDE = 120;
export const TOPE_DIARIO = 10;

export const NOMBRE_TIPO: Record<TipoOpinion, string> = {
  idea: "Una idea",
  error: "Algo anda mal",
  otra: "Otra cosa",
};

export const NOMBRE_ESTADO: Record<EstadoOpinion, string> = {
  nueva: "Recibida",
  leida: "Leída",
  resuelta: "Resuelta",
};

export type Opinion = {
  id: string;
  tipo: TipoOpinion;
  mensaje: string;
  desde: string | null;
  estado: EstadoOpinion;
  created_at: string;
};

export type OpinionAdmin = Opinion & { email: string | null };

export type EstadoEnvio = {
  estado: "inicial" | "ok" | "error";
  mensaje?: string;
  errores?: { tipo?: string; mensaje?: string };
  valores?: { tipo: string; mensaje: string };
  enviada?: Opinion;
};

export const ENVIO_INICIAL: EstadoEnvio = { estado: "inicial" };

export const esTipo = (v: unknown): v is TipoOpinion => typeof v === "string" && (TIPOS_OPINION as readonly string[]).includes(v);
export const esEstado = (v: unknown): v is EstadoOpinion => typeof v === "string" && (ESTADOS_OPINION as readonly string[]).includes(v);

// Mismo criterio que el check de la tabla: largo, sin espacios de borde y sin caracteres de
// control salvo saltos de línea y tabulación (un \u0000 rompe el insert de Postgres).
export function limpiarMensaje(crudo: unknown): string {
  if (typeof crudo !== "string") return "";
  return crudo.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export function largoMensaje(texto: string): number {
  return Array.from(texto).length;
}

// Sólo el path: la query puede traer datos de un cálculo y no hace falta para saber de qué
// página vino. «//x» y «/\x» el navegador los lee como otro sitio y el panel las usa de enlace.
export function rutaDeOrigen(crudo: unknown): string | null {
  if (typeof crudo !== "string" || !crudo.startsWith("/") || crudo.length > 300) return null;
  if (crudo.startsWith("//") || crudo.startsWith("/\\") || /[\u0000-\u001f\u007f\\]/.test(crudo)) return null;
  let url: URL;
  try {
    url = new URL(crudo, "https://calcular.ar");
  } catch {
    return null;
  }
  if (url.origin !== "https://calcular.ar") return null;
  const ruta = url.pathname;
  if (ruta.length > MAX_DESDE || ruta.startsWith("//") || /%2f|%5c/i.test(ruta)) return null;
  return ruta;
}

export type TextosValidacion = { errorTipo: string; errorCorto: string; errorLargo: (max: number) => string };

const VALIDACION_AR: TextosValidacion = {
  errorTipo: "Elegí de qué se trata.",
  errorCorto: "Contanos un poco más, así lo entendemos bien.",
  errorLargo: (max) => `Usá hasta ${max.toLocaleString("es-AR")} caracteres. Si te queda largo, mandalo en dos partes.`,
};

export function validarOpinion(fd: { tipo: unknown; mensaje: unknown }, t: TextosValidacion = VALIDACION_AR): {
  ok: boolean;
  tipo: TipoOpinion | null;
  mensaje: string;
  errores: EstadoEnvio["errores"];
} {
  const tipo = esTipo(fd.tipo) ? fd.tipo : null;
  const mensaje = limpiarMensaje(fd.mensaje);
  const errores: NonNullable<EstadoEnvio["errores"]> = {};
  if (!tipo) errores.tipo = t.errorTipo;
  const largo = largoMensaje(mensaje);
  if (largo < MIN_MENSAJE) errores.mensaje = t.errorCorto;
  else if (largo > MAX_MENSAJE) errores.mensaje = t.errorLargo(MAX_MENSAJE);
  return { ok: Object.keys(errores).length === 0, tipo, mensaje, errores };
}
