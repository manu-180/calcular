import { NextResponse } from "next/server";
import { ofertasDeMercado } from "@/lib/pagos/ofertas-servidor";
import { CODIGOS_MERCADO } from "@/motor/tipos";

export const runtime = "nodejs";

// GET /api/pagos/ofertas/<mercado>: qué se ofrece en el resultado de cada calculadora del país. Lo
// pide la oferta del navegador apenas carga la calculadora (en un momento ocioso), así cuando aparece
// el resultado ya está: nada espera al servidor después del clic. Igual para todos: va por CDN.
export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  if (!(CODIGOS_MERCADO as readonly string[]).includes(mercado)) return NextResponse.json({ error: "mercado desconocido" }, { status: 404 });
  let cuerpo;
  try {
    cuerpo = ofertasDeMercado(mercado);
  } catch (e) {
    console.error("[pagos/ofertas]", mercado, e);
    return NextResponse.json({ activa: false, porCalculadora: {} }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(cuerpo, { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } });
}
