import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma } from "@/motor/tipos";

// La Gaceta Oficial (gacetaoficial.gob.pa) está detrás de Incapsula y a un cliente automático le
// devuelve un desafío de JavaScript. El MITRADEL sube el decreto del salario mínimo a su WordPress
// y la API REST de medios lo lista sin bloqueo: se buscan PDF de decretos subidos después del último
// conocido (el Decreto Ejecutivo 13 de 2025, subido el 12/1/2026).
const ULTIMO_CONOCIDO = "2026-01-13T00:00:00";
const MEDIOS_MITRADEL = `https://www.mitradel.gob.pa/wp-json/wp/v2/media?search=decreto&mime_type=application/pdf&per_page=50&_fields=id,date,title,source_url&after=${ULTIMO_CONOCIDO}`;

function texto(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s*&#82(?:11|12);\s*/g, ": ")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .trim();
}

export const detectores: readonly Detector[] = [
  {
    id: "pa.mitradel-decretos",
    carril: "norma",
    datos: ["pa.salario-minimo-hora-region-1", "pa.salario-minimo-hora-region-2", "pa.salario-minimo-domestico"],
    metodo: "api-json",
    url: MEDIOS_MITRADEL as `https://${string}`,
    userAgentNavegador: true,
    async traer(http) {
      const json = await http.json(this.url, { userAgentNavegador: true });
      if (!Array.isArray(json)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const item of json) {
        const { date, title, source_url } = (item ?? {}) as { date?: unknown; title?: { rendered?: unknown }; source_url?: unknown };
        const fecha = typeof date === "string" ? date.slice(0, 10) : null;
        const titulo = typeof title?.rendered === "string" ? texto(title.rendered) : "";
        if (!esFechaISO(fecha) || typeof source_url !== "string" || !source_url.startsWith("https://")) continue;
        if (!/decreto/i.test(`${titulo} ${source_url}`)) continue;
        hallazgos.push({ titulo: titulo || source_url, url: source_url, fecha });
      }
      return hallazgos;
    },
  },
];
