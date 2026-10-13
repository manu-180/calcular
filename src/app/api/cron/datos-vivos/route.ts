import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { INFLACION_DEFAULT, TNA_FALLBACK } from "@/data/plazofijo";
import { IPC_SERIE } from "@/data/ipc-serie";
import { CANASTA_BASICA_ULTIMO } from "@/data/canasta-basica";
import {
  armarAviso,
  compararCanasta,
  compararIpc,
  compararMes,
  compararTna,
  resumir,
  traerCanasta,
  traerIpc,
  traerTna,
  vencidoPorCalendario,
  type Hallazgo,
} from "@/lib/datos-vivos";
import { revisarPaises } from "@/lib/datos-vivos-paises";
import { hoyAR, hoyDelBuild } from "@/lib/hoy";
import { FROM, sendSingle } from "@/lib/email";
import { emailsAdmin } from "@/lib/auth/admin";

// Los datos se hornean en el build: este cron compara lo que ESTE deployment sirve contra lo que
// las fuentes publican hoy. Importar desde @/data y @/paises no es un atajo, es el punto: son
// exactamente los valores que ve el usuario.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Cada fuente tiene su timeout y todas corren en paralelo: el total queda por debajo de los 60 s de
// maxDuration con margen para Supabase, Resend y el deploy hook.
const TIMEOUT_TNA_MS = 8_000;
const TIMEOUT_INDEC_MS = 15_000;
const TIMEOUT_PAISES_MS = 25_000;

function supabase(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  // El cron nació leyendo SUPABASE_SERVICE_KEY y scripts/datos-vivos/avisar.ts lee
  // SUPABASE_SERVICE_ROLE_KEY: con cualquiera de las dos tiene que andar.
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Faltan SUPABASE_URL y SUPABASE_SERVICE_KEY (o SUPABASE_SERVICE_ROLE_KEY)");
  return { url, key };
}

async function sb(path: string, init: RequestInit = {}): Promise<Response> {
  const { url, key } = supabase();
  return fetch(`${url}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...((init.headers as Record<string, string>) ?? {}),
    },
  });
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

async function yaAvisado(subject: string): Promise<boolean> {
  const res = await sb(
    `/messages?sender=eq.claude&read_at=is.null&subject=eq.${encodeURIComponent(subject)}&select=id&limit=1`,
    { headers: { Prefer: "return=representation" } },
  );
  // Antes asumía "ya avisado" si la consulta fallaba, y una tabla caída silenciaba todos los avisos.
  if (!res.ok) throw new Error(`no pude consultar si el aviso ya estaba dado: messages respondió HTTP ${res.status}`);
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

type EstadoMail = "enviado" | "sin-resend" | "sin-destinatarios" | "rechazado";

async function mandarMail(asunto: string, texto: string, html: string): Promise<EstadoMail> {
  const para = emailsAdmin();
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[datos-vivos] sin RESEND_API_KEY: el mail no sale. Asunto: ${asunto}`);
    return "sin-resend";
  }
  if (!para.length) {
    console.warn("[datos-vivos] ADMIN_EMAILS vacío: el mail no tiene a quién ir");
    return "sin-destinatarios";
  }
  const ok = await sendSingle({ from: FROM, to: para, subject: asunto, html, text: texto });
  console.log(`[datos-vivos] mail ${ok ? "enviado" : "RECHAZADO por Resend"} a ${para.length} destinatario(s): ${asunto}`);
  return ok ? "enviado" : "rechazado";
}

type EstadoRedeploy = "no-hacia-falta" | "disparado" | "sin-hook" | "fallo";

async function redeployar(): Promise<{ estado: EstadoRedeploy; detalle?: string }> {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return { estado: "sin-hook" };
  try {
    const res = await fetch(hook, { method: "POST", signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return { estado: "fallo", detalle: `el deploy hook respondió HTTP ${res.status}` };
    return { estado: "disparado" };
  } catch (e) {
    return { estado: "fallo", detalle: e instanceof Error ? e.message : String(e) };
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
    const ahora = new Date();
    const [tna, ipc, canasta, paises] = await Promise.all([
      traerTna(TIMEOUT_TNA_MS),
      traerIpc(TIMEOUT_INDEC_MS),
      traerCanasta(TIMEOUT_INDEC_MS),
      revisarPaises({ ahora, timeoutMs: TIMEOUT_PAISES_MS }),
    ]);

    const ultimoIpc = IPC_SERIE[IPC_SERIE.length - 1]?.[0] ?? "0000-00";
    const mes = compararMes(hoyDelBuild(), hoyAR());
    let redeploy: { estado: EstadoRedeploy; detalle?: string } = { estado: "no-hacia-falta" };
    if (mes.severidad === "accion") {
      redeploy = await redeployar();
      if (redeploy.estado === "disparado") {
        mes.severidad = "atencion";
        mes.detalle += " El cron disparó el redeploy con VERCEL_DEPLOY_HOOK_URL.";
      } else if (redeploy.estado === "fallo") {
        mes.detalle += ` El deploy hook falló: ${redeploy.detalle}.`;
      }
    }

    const hallazgos: Hallazgo[] = [
      compararTna(TNA_FALLBACK, tna),
      ...compararIpc(INFLACION_DEFAULT, IPC_SERIE, ipc),
      compararCanasta(CANASTA_BASICA_ULTIMO, canasta),
      ...[
        vencidoPorCalendario("IPC", ultimoIpc, ipc ? ipc.periodo : null, ahora),
        vencidoPorCalendario("Canasta básica", CANASTA_BASICA_ULTIMO.periodo, canasta ? canasta.periodo : null, ahora),
      ].filter((h): h is Hallazgo => h !== null),
      mes,
      ...paises,
    ];
    const { severidadMax, linea } = resumir(hallazgos);

    if (severidadMax !== "ok") {
      await registrar("datos", linea, JSON.stringify(hallazgos.filter((h) => h.severidad !== "ok")));
    }

    let aviso: "enviado" | "duplicado" | "no-hacia-falta" = "no-hacia-falta";
    let mail: EstadoMail | "no-hacia-falta" = "no-hacia-falta";
    if (severidadMax === "accion") {
      const { asunto, texto, html } = armarAviso(hallazgos);
      if (await yaAvisado(asunto)) {
        aviso = "duplicado";
      } else {
        const res = await sb("/messages", {
          method: "POST",
          body: JSON.stringify({ sender: "claude", subject: asunto, body: texto, requires_action: true }),
        });
        if (!res.ok) throw new Error(`no pude insertar el aviso: HTTP ${res.status}`);
        aviso = "enviado";
        mail = await mandarMail(asunto, texto, html);
      }
    }

    return NextResponse.json({ ok: true, severidad: severidadMax, resumen: linea, aviso, mail, redeploy, hallazgos });
  } catch (e) {
    const detalle = e instanceof Error ? e.message : String(e);
    console.error(`[datos-vivos] el cron falló: ${detalle}`);
    let mail: EstadoMail | "fallo" = "fallo";
    try {
      mail = await mandarMail(
        "El cron de datos vivos falló",
        `El cron /api/cron/datos-vivos no pudo terminar la revisión, así que hoy nadie está mirando si los datos quedaron viejos.\n\nError: ${detalle}`,
        `<p>El cron /api/cron/datos-vivos no pudo terminar la revisión, así que hoy nadie está mirando si los datos quedaron viejos.</p><p>Error: ${detalle.replace(/[<>&]/g, "")}</p>`,
      );
    } catch (errMail) {
      console.error("[datos-vivos] tampoco pude mandar el mail del fallo", errMail);
    }
    try {
      await registrar("datos", "El cron de datos vivos falló", detalle);
    } catch {
      // Si Supabase tampoco responde, quedan el mail, el 500 y los logs de Vercel.
    }
    return NextResponse.json({ ok: false, error: detalle, mail }, { status: 500 });
  }
}
