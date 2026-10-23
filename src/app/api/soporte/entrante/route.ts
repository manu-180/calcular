import { NextRequest, NextResponse } from "next/server";
import { firmaValida, ingerir, traerRecibido } from "@/lib/soporte/ingesta";
import { servicio } from "@/lib/supabase/servicio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Webhook `email.received` de Resend para soporte@calcular.ar. Sólo guarda: quien responde es el
// agente de soporte (scripts/soporte). Un 500 hace que Resend reintente; la ingesta es idempotente
// por resend_id.
export async function POST(req: NextRequest) {
  const cuerpo = await req.text();
  const ok = firmaValida(
    process.env.RESEND_WEBHOOK_SECRET ?? "",
    req.headers.get("svix-id"),
    req.headers.get("svix-timestamp"),
    req.headers.get("svix-signature"),
    cuerpo,
  );
  if (!ok) return NextResponse.json({ error: "firma" }, { status: 401 });

  let evento: { type?: string; data?: { email_id?: string } };
  try {
    evento = JSON.parse(cuerpo);
  } catch {
    return NextResponse.json({ error: "json" }, { status: 400 });
  }
  if (evento.type !== "email.received" || !evento.data?.email_id) return NextResponse.json({ ok: true, ignorado: true });

  try {
    const rec = await traerRecibido(evento.data.email_id);
    const r = await ingerir(servicio(), rec);
    return NextResponse.json({ ok: true, hilo: r.hiloId, nuevo: r.nuevo });
  } catch (e) {
    console.error("[soporte/entrante]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "ingesta" }, { status: 500 });
  }
}
