// Ingesta de soporte@calcular.ar. Sin "server-only": la usan el webhook de Resend y los scripts del
// agente (scripts/soporte), que corren con tsx y reciben el cliente de Supabase por parámetro.

import { createHmac, timingSafeEqual } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const RESEND_API = "https://api.resend.com";
export const BUZON_SOPORTE = "soporte@calcular.ar";

export type Recibido = {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  subject?: string | null;
  text?: string | null;
  html?: string | null;
  message_id?: string | null;
  headers?: Record<string, string | string[]> | null;
  attachments?: { id: string; filename?: string; content_type?: string; size?: number }[];
  authentication?: Record<string, string> | null;
  created_at?: string;
};

// Resend firma con Svix: base64(HMAC-SHA256(secreto, `${id}.${timestamp}.${cuerpo}`)), secreto "whsec_<base64>".
// Tolerancia de 5 min contra replays; puede venir más de una firma separada por espacios ("v1,<b64>").
export function firmaValida(secreto: string, id: string | null, ts: string | null, firmas: string | null, cuerpo: string, ahoraSeg = Date.now() / 1000): boolean {
  if (!secreto || !id || !ts || !firmas) return false;
  const t = Number(ts);
  if (!Number.isFinite(t) || Math.abs(ahoraSeg - t) > 300) return false;
  const clave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const esperada = createHmac("sha256", clave).update(`${id}.${ts}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const b64 = f.split(",")[1];
    if (!b64) return false;
    const dada = Buffer.from(b64, "base64");
    return dada.length === esperada.length && timingSafeEqual(dada, esperada);
  });
}

export async function traerRecibido(id: string, apiKey = process.env.RESEND_API_KEY): Promise<Recibido> {
  const r = await fetch(`${RESEND_API}/emails/receiving/${encodeURIComponent(id)}?html_format=cid`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Resend receiving ${id}: HTTP ${r.status}`);
  return (await r.json()) as Recibido;
}

export function header(rec: Recibido, nombre: string): string | null {
  const h = rec.headers;
  if (!h) return null;
  const clave = Object.keys(h).find((k) => k.toLowerCase() === nombre.toLowerCase());
  if (!clave) return null;
  const v = h[clave];
  return Array.isArray(v) ? v.join(" ") : v;
}

export function direccion(desde: string): { email: string; nombre: string | null } {
  const m = desde.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  if (m) return { email: m[2].trim().toLowerCase(), nombre: m[1].trim() || null };
  return { email: desde.trim().toLowerCase(), nombre: null };
}

// Rebotes, fuera de oficina y listas: si el bot les contesta se arma un loop de mails entre robots.
export function esAutomatico(rec: Recibido): boolean {
  const { email } = direccion(rec.from);
  if (/^(mailer-daemon|postmaster|no-?reply|do-?not-?reply|bounce|notifications?)@/i.test(email)) return true;
  if (email.endsWith("@calcular.ar") || email.endsWith("@calcularya.com") || email.endsWith("@theapexweb.com")) return true;
  const auto = header(rec, "auto-submitted");
  if (auto && auto.toLowerCase() !== "no") return true;
  if (header(rec, "x-autoreply") || header(rec, "x-autorespond")) return true;
  if (header(rec, "list-id") || header(rec, "list-unsubscribe")) return true;
  const prec = header(rec, "precedence");
  return !!prec && /bulk|junk|list|auto_reply/i.test(prec);
}

export const MAIL_MANUEL = "manunv97@gmail.com";

// Las respuestas de Manuel a un aviso ("#<hilo>" en el asunto) son instrucciones para el agente. El From
// se falsifica fácil: sólo cuenta si Gmail lo firmó (DKIM o DMARC en pass, calculado por Resend).
export function esDeManuel(rec: Recibido): boolean {
  if (direccion(rec.from).email !== MAIL_MANUEL) return false;
  const a = rec.authentication;
  return !!a && (a.dkim === "pass" || a.dmarc === "pass");
}

export const asuntoBase = (s: string | null | undefined) =>
  (s ?? "").replace(/^\s*((re|fw|fwd|rv|res|aw|tr|sv)\s*:\s*)+/i, "").trim().toLowerCase();

async function hiloDe(db: SupabaseClient, rec: Recibido, email: string): Promise<number | null> {
  const refs = [header(rec, "in-reply-to"), header(rec, "references")]
    .filter(Boolean)
    .join(" ")
    .match(/<[^>]+>/g);
  if (refs?.length) {
    const { data } = await db.from("ca_soporte_mensajes").select("hilo_id").in("message_id", refs).limit(1);
    if (data?.[0]) return data[0].hilo_id as number;
  }
  const hace30 = new Date(Date.now() - 30 * 864e5).toISOString();
  const { data } = await db
    .from("ca_soporte_hilos")
    .select("id, asunto")
    .eq("email", email)
    .gte("updated_at", hace30)
    .order("updated_at", { ascending: false })
    .limit(10);
  const base = asuntoBase(rec.subject);
  return (data ?? []).find((h) => asuntoBase(h.asunto as string) === base)?.id ?? null;
}

export async function ingerir(db: SupabaseClient, rec: Recibido): Promise<{ hiloId: number; nuevo: boolean; duplicado: boolean }> {
  const { data: ya } = await db.from("ca_soporte_mensajes").select("hilo_id").eq("resend_id", rec.id).maybeSingle();
  if (ya) return { hiloId: ya.hilo_id as number, nuevo: false, duplicado: true };

  const { email, nombre } = direccion(rec.from);
  const deManuel = esDeManuel(rec);
  const automatico = !deManuel && esAutomatico(rec);
  let hiloDeAviso = deManuel ? Number(rec.subject?.match(/#(\d+)/)?.[1]) || null : null;
  if (hiloDeAviso) {
    const { data } = await db.from("ca_soporte_hilos").select("id").eq("id", hiloDeAviso).maybeSingle();
    if (!data) hiloDeAviso = null;
  }
  let hiloId = hiloDeAviso ?? (await hiloDe(db, rec, email));
  const nuevo = hiloId === null;
  if (hiloId === null) {
    const { data, error } = await db
      .from("ca_soporte_hilos")
      .insert({ email, nombre, asunto: rec.subject?.slice(0, 500) ?? null, estado: automatico ? "ignorado" : "pendiente" })
      .select("id")
      .single();
    if (error) throw error;
    hiloId = data.id as number;
  } else if (!automatico) {
    await db.from("ca_soporte_hilos").update({ estado: "pendiente", updated_at: new Date().toISOString() }).eq("id", hiloId);
  }

  const { error } = await db.from("ca_soporte_mensajes").insert({
    hilo_id: hiloId,
    direccion: deManuel && hiloDeAviso ? "interno" : "entrante",
    resend_id: rec.id,
    message_id: rec.message_id ?? header(rec, "message-id"),
    in_reply_to: header(rec, "in-reply-to"),
    referencias: header(rec, "references"),
    remitente: rec.from,
    destinatarios: rec.to,
    asunto: rec.subject ?? null,
    texto: rec.text ?? null,
    html: rec.html && rec.html.length < 500_000 ? rec.html : null,
    adjuntos: (rec.attachments ?? []).map((a) => ({ id: a.id, nombre: a.filename, tipo: a.content_type, peso: a.size })),
    autenticacion: rec.authentication ?? null,
    automatico,
  });
  if (error && error.code !== "23505") throw error;
  return { hiloId, nuevo, duplicado: error?.code === "23505" };
}
