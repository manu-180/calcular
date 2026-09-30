import "server-only";
import { FROM, mailCuenta, sendSingle, type MailCuenta } from "@/lib/email";
import { servicio } from "@/lib/supabase/servicio";
import { origenDelSitio } from "@/lib/auth/pedido";
import { permitido } from "@/lib/limite";

const DIA_SEG = 24 * 60 * 60;
// Tope por buzón para TODOS los mails de cuenta, sumados: por encima de esto alguien está usando
// los formularios para escribirle a un tercero.
const TOPE_DIARIO_POR_EMAIL = 8;

export type TipoEnlace = "signup" | "magiclink" | "recovery";

export async function urlConfirmar(tokenHash: string, tipo: TipoEnlace, next: string): Promise<string> {
  const u = new URL("/auth/confirmar", await origenDelSitio());
  u.searchParams.set("token_hash", tokenHash);
  u.searchParams.set("type", tipo);
  u.searchParams.set("next", next);
  return u.toString();
}

// Pasado un tope, el mail no sale pero se informa «enviado»: devolver error delataría qué
// casillas tienen cuenta (el aviso «sin-cuenta» y el enlace de entrada tendrían respuestas distintas).
export async function mandarMail(tipo: MailCuenta, email: string, url: string): Promise<boolean> {
  // «sin-cuenta» promete «no te vamos a volver a escribir por esto»: uno por día y por buzón.
  if (tipo === "sin-cuenta" && !(await permitido(`mail-sin-cuenta:${email}`, 1, DIA_SEG))) {
    console.warn("[auth] mail «sin-cuenta» omitido: ya salió uno hoy a ese buzón");
    return true;
  }
  if (!(await permitido(`mail-cuenta:${email}`, TOPE_DIARIO_POR_EMAIL, DIA_SEG))) {
    console.warn(`[auth] mail «${tipo}» omitido: tope diario del buzón`);
    return true;
  }
  const m = mailCuenta(tipo, url);
  try {
    const ok = await sendSingle({ from: FROM, to: [email], subject: m.asunto, html: m.html, text: m.texto });
    if (!ok) console.error(`[auth] Resend rechazó el mail «${tipo}»`);
    return ok;
  } catch (e) {
    console.error(`[auth] no pude mandar el mail «${tipo}»`, e);
    return false;
  }
}

// Un enlace de entrada para una cuenta que YA existe. Sin el chequeo previo de existencia,
// generateLink('magiclink') con un mail nuevo crea el usuario en silencio (lo convierte en alta).
export async function mandarEnlaceEntrada(
  email: string,
  tipoMail: Extract<MailCuenta, "entrar" | "ya-tenias" | "confirmar">,
  next: string,
): Promise<{ ok: boolean; userId?: string }> {
  const { data, error } = await servicio().auth.admin.generateLink({ type: "magiclink", email });
  if (error || !data.properties?.hashed_token) {
    console.error("[auth] generateLink magiclink:", error?.code ?? error?.message ?? "sin token");
    return { ok: false };
  }
  const tipo = data.properties.verification_type === "signup" ? "signup" : "magiclink";
  const url = await urlConfirmar(data.properties.hashed_token, tipo, next);
  return { ok: await mandarMail(tipoMail, email, url), userId: data.user?.id };
}

export async function mandarSinCuenta(email: string): Promise<boolean> {
  return mandarMail("sin-cuenta", email, new URL("/registro", await origenDelSitio()).toString());
}
