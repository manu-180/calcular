import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Las páginas se regeneran cada 24 h (revalidate de los layouts de (ar) e (intl)), no cada hora: con
// 10.308 páginas, el revalidate de 1 h costaba más de un millón de escrituras ISR por día en Vercel
// (29-31/10/2026). Lo que ese plazo largo pierde es el cambio de mes: el día 1 una página podía seguir
// mostrando el mes anterior hasta 24 h. Este cron purga todo el árbol a las 00:05 de Argentina del
// día 1 y cada página se rearma en su próxima visita, una sola vez.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function autorizado(req: NextRequest): boolean {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;
  const recibido = req.headers.get("authorization") ?? "";
  const esperado = `Bearer ${secreto}`;
  if (recibido.length !== esperado.length) return false;
  return timingSafeEqual(Buffer.from(recibido), Buffer.from(esperado));
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, purgado: "todo", en: new Date().toISOString() });
}
