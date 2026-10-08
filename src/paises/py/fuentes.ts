import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const URL_COTIZACION_BCP = "https://www.bcp.gov.py/webapps/web/cotizacion/monedas";
const URL_NOTICIAS_MTESS = "https://www.mtess.gov.py/?s=salario+minimo&orderby=date&order=DESC&feed=rss2";

const MESES: Readonly<Record<string, string>> = {
  ENERO: "01",
  FEBRERO: "02",
  MARZO: "03",
  ABRIL: "04",
  MAYO: "05",
  JUNIO: "06",
  JULIO: "07",
  AGOSTO: "08",
  SEPTIEMBRE: "09",
  SETIEMBRE: "09",
  OCTUBRE: "10",
  NOVIEMBRE: "11",
  DICIEMBRE: "12",
};

function numeroParaguayo(texto: string): number | null {
  const limpio = texto.trim();
  if (!/^\d{1,3}(?:\.\d{3})*(?:,\d+)?$/.test(limpio)) return null;
  const n = Number(limpio.split(".").join("").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
}

// La planilla del BCP solo muestra un día: la última cotización publicada (en feriados o fines de
// semana repite la del último día hábil, con su fecha en el título). Otras fechas piden POST.
export function parsearCotizacionBcp(html: string): PuntoSerie[] | null {
  const titulo = /PLANILLA DE COTIZACIONES AL\s+[A-ZÁÉÍÓÚ]+\s+(\d{1,2})\s+DE\s+([A-Z]+)\s+DEL\s+(\d{4})/.exec(html);
  if (!titulo) return null;
  const mes = MESES[titulo[2]];
  const fecha = mes ? `${titulo[3]}-${mes}-${titulo[1].padStart(2, "0")}` : null;
  if (!esFechaISO(fecha)) return null;
  const fila = /<td[^>]*>\s*USD\s*<\/td>\s*<td[^>]*>\s*1,0000\s*<\/td>\s*<td[^>]*>\s*([\d.,]+)\s*<\/td>/.exec(html);
  const valor = fila ? numeroParaguayo(fila[1]) : null;
  return valor === null ? null : [{ fecha, valor }];
}

const MESES_RSS: Readonly<Record<string, string>> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

const TEMAS_SALARIO = /salario m[ií]nimo|salarios y jornales|jornales? m[ií]nimos?|sueldos y jornales/i;

function textoDe(xml: string, etiqueta: string): string | null {
  const m = new RegExp(`<${etiqueta}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${etiqueta}>`).exec(xml);
  return m ? m[1].replace(/&#8211;/g, "-").replace(/&#8220;|&#8221;/g, '"').replace(/&amp;/g, "&").trim() : null;
}

// El buscador del sitio del MTESS (WordPress) entrega sus resultados como RSS: es la forma estable
// de ver las noticias del ministerio sobre el salario mínimo, que llegan antes que la Gaceta Oficial.
export function parsearNoticiasMtess(xml: string): HallazgoNorma[] | null {
  if (!xml.includes("<rss")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const item of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const titulo = textoDe(item[1], "title");
    const url = textoDe(item[1], "link");
    const fechaRss = /<pubDate>\w{3}, (\d{2}) (\w{3}) (\d{4})/.exec(item[1]);
    const mes = fechaRss ? MESES_RSS[fechaRss[2]] : undefined;
    const fecha = fechaRss && mes ? `${fechaRss[3]}-${mes}-${fechaRss[1]}` : null;
    if (!titulo || !url || !esFechaISO(fecha) || !url.startsWith("https://")) continue;
    if (TEMAS_SALARIO.test(titulo)) hallazgos.push({ titulo: `MTESS: ${titulo}`, url, fecha: fecha as FechaISO });
  }
  return hallazgos;
}

async function textoOpcional(http: Http, url: string): Promise<string | null> {
  try {
    // El BCP responde 403 a clientes que no se presentan como navegador (probado el 7/10/2026).
    return await http.texto(url, { userAgentNavegador: true });
  } catch {
    return null;
  }
}

export const detectores: readonly Detector[] = [
  {
    id: "py.dolar-bcp",
    carril: "serie",
    serie: "py.dolar",
    metodo: "html",
    url: URL_COTIZACION_BCP,
    userAgentNavegador: true,
    // Un guaraní estable se mueve poco por día; 5 % es el salto máximo que se acepta contra el último valor.
    banda: { min: 4000, max: 10000, saltoRelativoMax: 0.05 },
    async traer(http) {
      const html = await textoOpcional(http, URL_COTIZACION_BCP);
      return html ? parsearCotizacionBcp(html) : null;
    },
  },
  {
    id: "py.mtess-salario-minimo",
    carril: "norma",
    datos: ["py.salario-minimo", "py.minimos"],
    metodo: "html",
    url: URL_NOTICIAS_MTESS,
    userAgentNavegador: true,
    async traer(http) {
      const xml = await textoOpcional(http, URL_NOTICIAS_MTESS);
      return xml ? parsearNoticiasMtess(xml) : null;
    },
  },
];
