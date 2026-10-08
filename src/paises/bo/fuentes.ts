import { esFechaISO, fechaEnZona, sumarDias } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const ZONA = "America/La_Paz";
const URL_TABLA_BCB = "https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php";
const URL_NOTAS_MTEPS = "https://mintrabajo.gob.bo/index.php/wp-json/wp/v2/nota_prensa?per_page=50&orderby=date&order=desc&_fields=date,link,title";
const URL_COMUNICADOS_MTEPS = "https://mintrabajo.gob.bo/index.php/wp-json/wp/v2/comunicados?per_page=50&orderby=date&order=desc&_fields=date,link,title";
const URL_NOTAS_SIN = "https://www.impuestos.gob.bo/wp-json/wp/v2/nota_prensa?per_page=50&orderby=date&order=desc&_fields=date,link,title";
const DIAS_HACIA_ATRAS = 5;

function urlTablaDelDia(f: FechaISO): string {
  const [a, m, d] = f.split("-");
  return `https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=${d}&qmm=${m}&qaa=${a}`;
}

export function parsearTco(html: string): number | null {
  const m = /Tipo de Cambio Oficial \(TCO\)<br\s*\/?>\s*\(Bs\/USD\)<\/th>[\s\S]*?<td class="numero">([\d.]+)<\/td>/.exec(html);
  const v = m ? Number(m[1]) : NaN;
  return Number.isFinite(v) && v > 0 ? v : null;
}

export function parsearUfv(html: string): number | null {
  const m = /Bs\/UFV<\/td>\s*<td[^>]*class="numero">([\d.]+)<\/td>/.exec(html);
  const v = m ? Number(m[1]) : NaN;
  return Number.isFinite(v) && v > 0 ? v : null;
}

// La tabla del BCB pedida por fecha muestra lo que rige ese día calendario: un sábado trae el TCO
// publicado el viernes (el de la tabla del lunes) y la UFV de ese mismo sábado. Una fecha que todavía
// no se publicó devuelve una página sin tabla y se saltea.
async function leerTablas(http: Http, parsear: (html: string) => number | null): Promise<PuntoSerie[] | null> {
  const hoy = fechaEnZona(new Date(), ZONA);
  const puntos: PuntoSerie[] = [];
  let respuestas = 0;
  for (let i = DIAS_HACIA_ATRAS; i >= -1; i--) {
    const fecha = sumarDias(hoy, -i);
    let html: string;
    try {
      html = await http.texto(urlTablaDelDia(fecha));
    } catch {
      continue;
    }
    respuestas++;
    const valor = parsear(html);
    if (valor !== null) puntos.push({ fecha, valor });
  }
  return respuestas === 0 || puntos.length === 0 ? null : puntos;
}

interface EntradaWp {
  date?: unknown;
  link?: unknown;
  title?: { rendered?: unknown };
}

function decodificar(t: string): string {
  return t
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .trim();
}

export function filtrarWp(json: unknown, tema: RegExp, prefijo: string): HallazgoNorma[] | null {
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const e of json as EntradaWp[]) {
    const titulo = typeof e.title?.rendered === "string" ? decodificar(e.title.rendered) : null;
    const url = typeof e.link === "string" ? e.link : null;
    const fecha = typeof e.date === "string" ? e.date.slice(0, 10) : null;
    if (!titulo || !url || !url.startsWith("https://") || !esFechaISO(fecha)) continue;
    if (tema.test(titulo)) hallazgos.push({ titulo: `${prefijo}: ${titulo}`, url, fecha });
  }
  return hallazgos;
}

const TEMAS_LABORALES = /salario m[ií]nimo|incremento salarial|aguinaldo|bono de antig[uü]edad|quinquenio|beneficios sociales|vacaci/i;
const TEMAS_TRIBUTARIOS = /\bIVA\b|RC-IVA|\bIT\b|transacciones|al[ií]cuota|formulario 110|dependientes/i;

export const detectores: readonly Detector[] = [
  {
    id: "bo.tco-bcb",
    carril: "serie",
    serie: "bo.dolar",
    metodo: "html",
    url: URL_TABLA_BCB,
    // Desde el 29/6/2026 el TCO flota: en septiembre de 2026 saltó hasta 8 % de un día hábil al otro
    // (11,00 a 11,90 el 22/9), por eso el salto máximo es 12 %. La banda cubre desde el viejo valor
    // fijo (6,86) hasta un dólar que casi triplique el de la apertura.
    banda: { min: 6, max: 30, saltoRelativoMax: 0.12 },
    async traer(http) {
      return leerTablas(http, parsearTco);
    },
  },
  {
    id: "bo.ufv-bcb",
    carril: "serie",
    serie: "bo.ufv",
    metodo: "html",
    url: URL_TABLA_BCB,
    // La UFV se mueve centésimas por día (0,014 % en septiembre de 2026); con inflación del 20 % anual
    // no pasa de 5 en tres años.
    banda: { min: 3, max: 5, saltoRelativoMax: 0.005 },
    async traer(http) {
      return leerTablas(http, parsearUfv);
    },
  },
  {
    id: "bo.mteps-normas",
    carril: "norma",
    datos: ["bo.salario-minimo", "bo.aguinaldo-meses-minimos", "bo.vacaciones-dias", "bo.bono-antiguedad", "bo.desahucio-sueldos", "bo.indemnizacion-dias-minimos"],
    metodo: "api-json",
    url: URL_NOTAS_MTEPS,
    // El Ministerio de Trabajo publica antes que la Gaceta (que no responde desde la red del cron) sus
    // notas e instructivos sobre salario mínimo y aguinaldo. Su WordPress expone notas y comunicados.
    async traer(http) {
      const [notas, comunicados] = await Promise.all([
        http.json(URL_NOTAS_MTEPS).catch(() => null),
        http.json(URL_COMUNICADOS_MTEPS).catch(() => null),
      ]);
      const a = filtrarWp(notas, TEMAS_LABORALES, "MTEPS");
      const b = filtrarWp(comunicados, TEMAS_LABORALES, "MTEPS, comunicado");
      if (a === null && b === null) return null;
      return [...(a ?? []), ...(b ?? [])];
    },
  },
  {
    id: "bo.sin-normas",
    carril: "norma",
    datos: ["bo.iva", "bo.it", "bo.rc-iva-alicuota", "bo.rc-iva-minimo-no-imponible", "bo.rc-iva-computo-smn"],
    metodo: "api-json",
    url: URL_NOTAS_SIN,
    async traer(http) {
      try {
        return filtrarWp(await http.json(URL_NOTAS_SIN), TEMAS_TRIBUTARIOS, "SIN");
      } catch {
        return null;
      }
    },
  },
];
