import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { cargarPanel } from "@/lib/panel/datos";
import { senalesDeLecturas } from "@/lib/panel/senales";

// Las oportunidades del panel van a Kairo todos los días y el ejecutor las resuelve hasta producción.
// Mandar la misma oportunidad dos veces no hace nada (Kairo la reconoce por la clave) y si Kairo ya
// tiene dos de calcular en curso contesta 429: la que sobra vuelve mañana, no se pierde.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const KAIRO = "https://manager.theapexweb.com/api/kairo/senal";

function autorizado(req: NextRequest): boolean {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;
  const recibido = req.headers.get("authorization") ?? "";
  const esperado = `Bearer ${secreto}`;
  if (recibido.length !== esperado.length) return false;
  return timingSafeEqual(Buffer.from(recibido), Buffer.from(esperado));
}

async function registrar(detalle: string): Promise<void> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/activity_log`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        session_id: `${new Date().toISOString().slice(0, 10)}-cron`,
        category: "kairo",
        title: "oportunidades del panel a Kairo",
        detail: detalle,
        project_slug: "calcular-ar",
      }),
    });
  } catch {
    // Al mejor esfuerzo: lo que importa ya se mandó.
  }
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  const token = process.env.KAIRO_SENALES_TOKEN;
  if (!token) return NextResponse.json({ ok: false, error: "falta KAIRO_SENALES_TOKEN" }, { status: 500 });

  const panel = await cargarPanel("30d", "ar");
  const senales = senalesDeLecturas(panel.lecturas);

  const resultados: { clave: string; status: number; estado?: string; nuevo?: boolean }[] = [];
  for (const s of senales) {
    try {
      const r = await fetch(KAIRO, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      const cuerpo = (await r.json().catch(() => ({}))) as { estado?: string; nuevo?: boolean };
      resultados.push({ clave: s.clave_origen, status: r.status, estado: cuerpo.estado, nuevo: cuerpo.nuevo });
    } catch {
      resultados.push({ clave: s.clave_origen, status: 0 });
    }
  }

  const nuevas = resultados.filter((r) => r.nuevo).map((r) => r.clave);
  const fallidas = resultados.filter((r) => r.status !== 200 && r.status !== 429);
  const detalle = senales.length
    ? `${senales.length} oportunidades; nuevas en Kairo: ${nuevas.join(", ") || "ninguna"}${fallidas.length ? `; fallaron: ${fallidas.map((f) => `${f.clave} (${f.status})`).join(", ")}` : ""}`
    : "ninguna oportunidad en el panel";
  await registrar(detalle);

  return NextResponse.json({ ok: fallidas.length === 0, oportunidades: senales.length, resultados }, { status: fallidas.length ? 502 : 200 });
}
