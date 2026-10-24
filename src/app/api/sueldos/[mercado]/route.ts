import type { NextRequest } from "next/server";
import { agregadosDe } from "@/lib/sueldos/lectura";
import { claveDeIp, crearLimite, ipDe } from "@/lib/sueldos/limite";
import { paisAportable, tratoDeEdicion, urlSueldos } from "@/lib/sueldos/paises";
import { K } from "@/motor/sueldos/catalogo";
import type { RespuestaAgregados } from "@/motor/sueldos/tipos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

// La respuesta va al CDN una hora (s-maxage) y a la caché de datos de Next otra hora (lectura.ts): la
// función casi nunca corre. Esto es solo para quien la pide en ráfaga salteándose el CDN.
const dentro = crearLimite(120, 60_000);

const CACHE_OK = "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";
const CACHE_FALLA = "public, max-age=60, s-maxage=60";

const json = (cuerpo: RespuestaAgregados, status: number, cache: string) =>
  Response.json(cuerpo, { status, headers: { "Cache-Control": cache } });

export async function GET(req: NextRequest, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  if (!dentro(claveDeIp(ipDe(req.headers)))) return json({ ok: false }, 429, "no-store");
  if (!/^[a-z]{2,3}$/.test(mercado) || !paisAportable(mercado)) return json({ ok: false }, 404, CACHE_FALLA);
  // Solo `e` (la edición que pregunta, para el trato de los textos): cualquier otro parámetro es 404,
  // así nadie llena la caché del CDN con variantes.
  const q = req.nextUrl.searchParams;
  const claves = [...q.keys()];
  if (claves.some((k) => k !== "e") || q.getAll("e").length > 1) return json({ ok: false }, 404, CACHE_FALLA);
  const datos = await agregadosDe(mercado);
  if (!datos) return json({ ok: false }, 200, CACHE_FALLA);
  return json({ ok: true, k: K, datos, pagina: urlSueldos(mercado), trato: tratoDeEdicion(q.get("e")) }, 200, CACHE_OK);
}
