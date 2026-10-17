import { NextResponse, type NextRequest } from "next/server";
import { CONCEPTOS, esConcepto } from "@/motor/conceptos";
import { intlActivo, modoPublicacion, origenAR } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

// Calculadoras equivalentes para el selector y el aviso de país: con esto, cambiar de México a Perú
// estando en el aguinaldo lleva a la gratificación y no al inicio de Perú. Responde un solo clúster,
// el de ?c=<concepto> o el de la página ?m=<mercado>&s=<slug>, con la misma forma de siempre
// (MapaEquivalentes de geo-cliente.ts). El mapa entero de 190 países no se pide más. Vive bajo
// /api/geo porque es la única API que el host de calcularya deja pasar (API_INTL_PERMITIDAS en
// src/motor/hosts.ts). Igual para todos: el CDN lo guarda por URL una hora.
const CACHE = { "cache-control": "public, max-age=300, s-maxage=3600" };

function rutaAR(concepto: string): string | undefined {
  if (!esConcepto(concepto)) return undefined;
  const ruta = (CONCEPTOS[concepto] as { rutaAR?: string }).rutaAR;
  return ruta ? `${origenAR()}${ruta}` : undefined;
}

export function GET(req: NextRequest) {
  const vacio = { porMercado: {}, ar: {}, origenAR: origenAR() };
  if (!intlActivo()) return NextResponse.json(vacio, { headers: CACHE });
  const modo = modoPublicacion();
  const q = req.nextUrl.searchParams;
  let concepto = q.get("c") ?? "";
  const m = q.get("m");
  const s = q.get("s");
  if (!concepto && m && s) {
    const mercado = registro.mercados(modo).find((x) => x.codigo === m);
    const entrada = mercado ? registro.calculadora(mercado.codigo as CodigoMercado, s) : undefined;
    concepto = entrada && registro.calculadorasPublicables(mercado!.codigo, hoyEn(mercado!), modo).includes(entrada) ? entrada.definicion.concepto : "";
    // Una calculadora "propio" traducida en otra edición del país (/ca y /ca-fr): el clúster son sus
    // hermanas, con una clave propia que el cliente compara igual que un concepto.
    if (concepto === "propio") {
      const hermanas = registro.hermanas(m as CodigoMercado, s, (x) => hoyEn(x), modo);
      if (!hermanas.length) return NextResponse.json(vacio, { headers: CACHE });
      const clave = `hermanas:${m}/${s}`;
      const porMercado: Record<string, Record<string, string>> = {};
      for (const e of hermanas) porMercado[e.mercado] = { [e.slug]: clave };
      return NextResponse.json({ porMercado, ar: {}, origenAR: origenAR() }, { headers: CACHE });
    }
  }
  if (!concepto || concepto === "propio" || !esConcepto(concepto)) return NextResponse.json(vacio, { headers: CACHE });
  const porMercado: Record<string, Record<string, string>> = {};
  for (const e of registro.equivalentes(concepto, (x) => hoyEn(x), modo)) porMercado[e.mercado] = { [e.slug]: concepto };
  const ar = rutaAR(concepto);
  return NextResponse.json({ porMercado, ar: ar ? { [concepto]: ar } : {}, origenAR: origenAR() }, { headers: CACHE });
}
