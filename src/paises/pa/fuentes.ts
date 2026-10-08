import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

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

const AVANCE_PRECIOS = "https://www.inec.gob.pa/avance/Default2.aspx?ID_CATEGORIA=2&ID_CIFRAS=10&ID_IDIOMA=1";
const MESES_CORTOS: Readonly<Record<string, number>> = {
  ene: 1,
  feb: 2,
  mar: 3,
  abr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  ago: 8,
  sep: 9,
  sept: 9,
  set: 9,
  oct: 10,
  nov: 11,
  dic: 12,
};

// Se redondea a 6 decimales: el anexo 4 (semilla) trae más decimales que el CSV del cuadro 3 (cron) y
// el cron rechaza un punto ya publicado que vuelve con otro valor.
const seisDecimales = (n: number) => Math.round(n * 1e6) / 1e6;

// Cada mes el INEC sube los cuadros del IPC con un nombre de archivo nuevo (prefijo con la fecha de
// carga). La página de avances de precios enlaza siempre los del último mes: se busca el CSV que sigue
// al título del cuadro 3 (IPC nacional urbano de diciembre anterior hasta el último mes).
export function enlaceCuadro3(html: string): string | null {
  const i = html.search(/Cuadro 3\.\s*[ÍI]NDICE DE PRECIOS AL CONSUMIDOR NACIONAL URBANO/i);
  if (i < 0) return null;
  const m = /href="\.\.\/(archivos\/[^"]+?\.csv)"/i.exec(html.slice(i, i + 4000));
  return m ? `https://www.inec.gob.pa/${m[1].replace(/ /g, "%20")}` : null;
}

export function parsearCuadro3(csv: string): PuntoSerie[] | null {
  const puntos: PuntoSerie[] = [];
  for (const linea of csv.split(/\r?\n/)) {
    const m = /^\s*([a-z]{3,4})-(\d{2});\s*(\d+(?:\.\d+)?)\s*;/i.exec(linea);
    if (!m) continue;
    const mes = MESES_CORTOS[m[1].toLowerCase()];
    const fecha = `20${m[2]}-${String(mes).padStart(2, "0")}-01`;
    if (!mes || !esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor: seisDecimales(Number(m[3])) });
  }
  return puntos.length ? puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1)) : null;
}

export const detectores: readonly Detector[] = [
  {
    id: "pa.inec-ipc",
    carril: "serie",
    serie: "pa.ipc",
    metodo: "html",
    url: AVANCE_PRECIOS,
    banda: { min: 85, max: 130, saltoRelativoMax: 0.03 },
    async traer(http) {
      const enlace = enlaceCuadro3(await http.texto(this.url));
      return enlace ? parsearCuadro3(await http.texto(enlace)) : null;
    },
  },
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
