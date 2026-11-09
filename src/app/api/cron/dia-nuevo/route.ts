import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { mercadosQueCambiaron, rutasDelMercado } from "@/motor/purga";
import { modoPublicacion } from "@/motor/sitio";
import { registro } from "@/paises";

// Purga diaria fina de calcularya: sólo los mercados cuyos datos cambiaron desde ayer.
//
// Las páginas intl tienen un plazo largo (REVALIDATE_INTL, ver el layout de (intl)) porque medido
// sobre las 8.594 páginas de calculadora sólo cambian entre 3 y 37 por día: con el plazo de 24 h se
// pagaban 10.353 escrituras ISR diarias para reescribir el mismo HTML. La frescura real la da este
// cron, que corre todos los días y purga el subárbol de los mercados que se movieron. El plazo largo
// queda como red: si este cron falla, ninguna página se queda vieja más que ese plazo.
//
// El cambio de mes lo sigue cubriendo /api/cron/mes-nuevo, que purga todo el día 1.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Comparar los 143 mercados en dos fechas resuelve ~17 mil calculadoras y tarda 0,3 s medido en
// local; lo que puede tardar es el arranque en frío, que importa el registro entero (~8.000 módulos).
// El margen es para eso: Vercel cobra el CPU que se usa, no el límite.
export const maxDuration = 300;

function autorizado(req: NextRequest): boolean {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;
  const recibido = req.headers.get("authorization") ?? "";
  const esperado = `Bearer ${secreto}`;
  if (recibido.length !== esperado.length) return false;
  return timingSafeEqual(Buffer.from(recibido), Buffer.from(esperado));
}

// Deja la corrida en activity_log, que es lo que se puede mirar desde afuera de Vercel (el panel de
// Kairo lee esa tabla). Es al mejor esfuerzo a propósito: si Supabase está caído, la purga ya se hizo
// y no tiene sentido devolver un error que haga reintentar el cron.
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
        category: "costo",
        title: "purga diaria de calcularya",
        detail: detalle,
        project_slug: "calcular-ar",
      }),
    });
  } catch {
    // Ídem: la purga es lo que importa.
  }
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ error: "no autorizado" }, { status: 401 });

  const modo = modoPublicacion();
  const mercados = mercadosQueCambiaron(registro, modo);
  for (const codigo of mercados) {
    for (const ruta of rutasDelMercado(codigo)) revalidatePath(ruta, "layout");
  }

  // Cero todos los días sería la señal de que el selector se rompió (y entonces las páginas se
  // estarían quedando viejas hasta el plazo de 3 días, que es lo único que las salvaría).
  const detalle = mercados.length
    ? `purgados ${mercados.length} mercados: ${mercados.join(", ")}`
    : "ningún mercado cambió desde ayer";
  await registrar(detalle);

  return NextResponse.json({ ok: true, purgados: mercados.length, mercados, en: new Date().toISOString() });
}
