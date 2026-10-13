import { NextRequest, NextResponse } from "next/server";
import { FROM, welcomeEmailHtml } from "@/lib/email";
import { ipDelPedido } from "@/lib/acceso-entrega";
import { permitido } from "@/lib/limite";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const RESEND_API = "https://api.resend.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendWelcome(email: string, token: string): Promise<void> {
  await fetch(`${RESEND_API}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      subject: "¡Bienvenido a CalculAR!",
      html: welcomeEmailHtml(token),
      headers: {
        "List-Unsubscribe": `<https://calcular.ar/api/unsubscribe?t=${token}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });
}

export async function POST(req: NextRequest) {
  // Cada alta nueva dispara el mail de bienvenida: sin cupo, un script usa el form para escribirle a
  // direcciones ajenas desde nuestro dominio.
  if (!(await permitido(`subscribe:${ipDelPedido(req.headers) ?? "sin-ip"}`, 5, 3600))) {
    return NextResponse.json({ error: "Demasiados intentos" }, { status: 429 });
  }

  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const { email: emailCrudo, source: sourceCrudo } = (cuerpo && typeof cuerpo === "object" ? cuerpo : {}) as Record<string, unknown>;

  if (typeof emailCrudo !== "string") {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  const email = emailCrudo.trim();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  const source = typeof sourceCrudo === "string" ? sourceCrudo.slice(0, 80) : "";

  // Generar token aquí para tenerlo antes del INSERT
  const unsubscribeToken = crypto.randomUUID();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      source: source || "unknown",
      unsubscribe_token: unsubscribeToken,
    }),
  });

  // 409 = email ya registrado — devolvemos éxito igual (no revelar datos)
  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ error: "Error al suscribir" }, { status: 500 });
  }

  // Solo enviar welcome a suscriptores nuevos
  if (res.status === 201 && process.env.RESEND_API_KEY) {
    sendWelcome(email.toLowerCase(), unsubscribeToken).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
