import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { INFLACION_DEFAULT, TNA_FALLBACK } from "@/data/plazofijo";
import { IPC_SERIE } from "@/data/ipc-serie";
import {
  compararIpc,
  compararTna,
  resumir,
  traerIpc,
  traerTna,
  type Hallazgo,
} from "@/lib/datos-vivos";

// Los datos se hornean en el build: este cron compara lo que ESTE deployment sirve contra lo que
// las fuentes publican hoy. Importar desde @/data no es un atajo, es el punto — son exactamente
// los valores que ve el usuario en las páginas estáticas.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function sb(path: string, init: RequestInit = {}): Promise<Response> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("Faltan SUPABASE_URL / SUPABASE_SERVICE_KEY");
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...((init.headers as Record<string, string>) ?? {}),
    },
  });
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function cuerpoMensaje(hallazgos: Hallazgo[]): string {
  const lineas = hallazgos
    .filter((h) => h.severidad !== "ok")
    .map((h) =>
      `${h.severidad === "accion" ? "🔴" : "🟡"} ${h.dato}\n` +
      `   el sitio sirve: ${h.sirve}\n` +
      `   la fuente dice: ${h.fuente}\n` +
      `   ${h.detalle}` +
      (h.accion ? `\n   → ${h.accion}` : ""),
    );
  return (
    "El cron diario comparó lo que calcular.ar sirve contra las fuentes oficiales y encontró " +
    "diferencias.\n\nLas páginas son estáticas: el dato nuevo NO llega al sitio hasta que se " +
    "redeploye.\n\n" +
    lineas.join("\n\n") +
    "\n\n— /api/cron/datos-vivos"
  );
}

/** Idempotencia: si ya hay un aviso sin leer por lo mismo, no se apila otro cada día. */
async function yaAvisado(subject: string): Promise<boolean> {
  const res = await sb(
    `/messages?sender=eq.claude&read_at=is.null&subject=eq.${encodeURIComponent(subject)}&select=id&limit=1`,
    { headers: { Prefer: "return=representation" } },
  );
  // Si no se puede consultar, se asume avisado: mejor un aviso de menos que uno duplicado cada día.
  if (!res.ok) return true;
  return ((await res.json()) as unknown[]).length > 0;
}

async function registrar(categoria: string, titulo: string, detalle: string): Promise<void> {
  const res = await sb("/activity_log", {
    method: "POST",
    body: JSON.stringify({
      session_id: `${hoyISO()}-cron`,
      category: categoria,
      title: titulo,
      detail: detalle,
      project_slug: "calcular-ar",
    }),
  });
  if (!res.ok) {
    throw new Error(`activity_log respondió ${res.status}: la corrida no puede darse por registrada`);
  }
}

function autorizado(req: NextRequest): boolean {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;
  const recibido = req.headers.get("authorization") ?? "";
  const esperado = `Bearer ${secreto}`;
  if (recibido.length !== esperado.length) return false;
  return timingSafeEqual(Buffer.from(recibido), Buffer.from(esperado));
}

export async function GET(req: NextRequest) {
  if (!process.env.CRON_SECRET) {
    console.error("[datos-vivos] CRON_SECRET no configurado: el cron queda cerrado, no abierto");
    return NextResponse.json({ error: "CRON_SECRET no configurado" }, { status: 500 });
  }
  if (!autorizado(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Timeouts cortos y en paralelo: el techo de una function del plan Hobby es más chico que la
    // paciencia de datos.gob.ar, y una fuente lenta no puede dejar la corrida sin veredicto.
    const [tna, ipc] = await Promise.all([traerTna(8_000), traerIpc(12_000)]);

    const hallazgos: Hallazgo[] = [
      compararTna(TNA_FALLBACK, tna),
      ...compararIpc(INFLACION_DEFAULT, IPC_SERIE, ipc),
    ];
    const { severidadMax, linea } = resumir(hallazgos);

    if (severidadMax !== "ok") {
      await registrar("datos", linea, JSON.stringify(hallazgos));
    }

    let aviso: "enviado" | "duplicado" | "no-hacia-falta" = "no-hacia-falta";
    if (severidadMax === "accion") {
      const subject = linea.replace(/^🔴 /, "");
      if (await yaAvisado(subject)) {
        aviso = "duplicado";
      } else {
        const res = await sb("/messages", {
          method: "POST",
          body: JSON.stringify({
            sender: "claude",
            subject,
            body: cuerpoMensaje(hallazgos),
            requires_action: true,
          }),
        });
        if (!res.ok) throw new Error(`no pude insertar el aviso: HTTP ${res.status}`);
        aviso = "enviado";
      }
    }

    return NextResponse.json({ ok: true, severidad: severidadMax, resumen: linea, aviso, hallazgos });
  } catch (e) {
    // Fail-loud: un detector que se rompe en silencio es peor que no tener detector.
    const detalle = e instanceof Error ? e.message : String(e);
    try {
      await registrar("datos", "🔴 El cron de datos vivos falló", detalle);
    } catch {
      // Si Supabase tampoco responde, el 500 y los logs de Vercel son lo único que queda.
    }
    return NextResponse.json({ ok: false, error: detalle }, { status: 500 });
  }
}
