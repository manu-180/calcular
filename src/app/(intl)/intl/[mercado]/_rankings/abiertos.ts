import { csvDe, datosAbiertos, LICENCIA } from "@/motor/rankings/abiertos";
import { urlIndice } from "@/motor/rankings/urls";
import { origenPublicoIntl } from "@/motor/seo";
import { intlActivo, origenAR } from "@/motor/sitio";
import { grillaPublicada } from "../_mundo/datos";

// /data/country-rankings.{json,csv}: un solo juego de archivos para todo el sitio, servido por la
// edición global (hosts.ts manda /data/* del host intl a /intl/global/data/*). En otra edición es 404:
// una sola URL por archivo. Abierto a cualquier origen (es para reusarlo) y cacheado en el borde un día.

const CABECERAS = {
  "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  "access-control-allow-origin": "*",
  link: `<${LICENCIA.url}>; rel="license"`,
  "x-robots-tag": "noindex",
};

export function crearDatosAbiertos(formato: "json" | "csv") {
  return async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
    const { mercado } = await params;
    if (mercado !== "global" || !intlActivo()) return new Response("Not found", { status: 404 });
    const grilla = await grillaPublicada();
    if (!grilla.paises.length) return new Response("Not available", { status: 503, headers: { "cache-control": "no-store", "retry-after": "600" } });
    const datos = datosAbiertos(grilla, { origen: origenPublicoIntl(), origenAR: origenAR(), urlPagina: urlIndice({ codigo: "global", idioma: "en" }) });
    if (formato === "csv") {
      return new Response(csvDe(datos), { headers: { ...CABECERAS, "content-type": "text/csv; charset=utf-8", "content-disposition": 'inline; filename="country-rankings.csv"' } });
    }
    return new Response(JSON.stringify(datos, null, 2), { headers: { ...CABECERAS, "content-type": "application/json; charset=utf-8" } });
  };
}
