import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-14";
const MESES: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};
const TRIMESTRES: Record<string, string> = { Q1: "01", Q2: "04", Q3: "07", Q4: "10" };

async function cpiAbs(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(url);
  const lineas = csv.trim().split(/\r?\n/);
  const cabecera = (lineas[0] ?? "").split(",");
  const iPeriodo = cabecera.indexOf("TIME_PERIOD");
  const iValor = cabecera.indexOf("OBS_VALUE");
  if (iPeriodo === -1 || iValor === -1) return null;
  const puntos: PuntoSerie[] = [];
  for (const l of lineas.slice(1)) {
    const c = l.split(",");
    const m = /^(\d{4})-(Q[1-4])$/.exec(c[iPeriodo] ?? "");
    const valor = Number(c[iValor]);
    if (!m || !Number.isFinite(valor)) return null;
    const fecha = `${m[1]}-${TRIMESTRES[m[2]]}-01`;
    if (!esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor });
  }
  puntos.sort((a, b) => a.fecha.localeCompare(b.fecha));
  return puntos.length ? puntos : null;
}

// Las oficinas de rentas de cada estado no tienen API: la página de tasas muestra la fecha de su
// última edición. Si es posterior a la verificación de datos.json, alguien tiene que releer las tasas.
async function paginaActualizada(http: Http, url: string, titulo: string, patron: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = patron.exec(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  if (!m) return null;
  const mes = MESES[m[2].toLowerCase()];
  if (!mes) return null;
  const fecha = `${m[3]}-${mes}-${m[1].padStart(2, "0")}`;
  if (!esFechaISO(fecha)) return null;
  return fecha > VERIFICADO ? [{ titulo, url, fecha }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "au.cpi-abs",
    carril: "serie",
    serie: "au.cpi",
    metodo: "api-json",
    url: "https://data.api.abs.gov.au/rest/data/ABS,CPI,2.0.0/1.10001.10.50.Q?startPeriod=2025-Q1&format=csvfile",
    // El IPC trimestral sube menos de 2 % por trimestre en los últimos años; 4 % deja margen.
    banda: { min: 90, max: 130, saltoRelativoMax: 0.04 },
    traer(http) {
      return cpiAbs(http, this.url);
    },
  },
  {
    id: "au.revenue-nsw-transfer-duty",
    carril: "norma",
    datos: ["au.nsw-transfer-duty", "au.nsw-duty-minimo", "au.nsw-fhb"],
    metodo: "html",
    url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty/understanding-transfer-duty/calculate-transfer-duty",
    userAgentNavegador: true,
    traer(http) {
      return paginaActualizada(http, this.url, "Revenue NSW updated How to calculate transfer duty", /Last updated:?\s*(\d{1,2}) ([A-Za-z]+) (\d{4})/);
    },
  },
  {
    id: "au.sro-vic-transfer-duty",
    carril: "norma",
    datos: ["au.vic-transfer-duty"],
    metodo: "html",
    url: "https://www.sro.vic.gov.au/about-us/rates-and-statistics/current-rates/land-transfer-duty-non-principal-place-residence-current-rates",
    userAgentNavegador: true,
    traer(http) {
      return paginaActualizada(http, this.url, "State Revenue Office Victoria updated the land transfer duty rates", /Updated:?\s*(\d{1,2}) ([A-Za-z]+) (\d{4})/);
    },
  },
  {
    id: "au.sro-vic-ppr",
    carril: "norma",
    datos: ["au.vic-ppr-duty", "au.vic-umbrales"],
    metodo: "html",
    url: "https://www.sro.vic.gov.au/buying-property/land-transfer-stamp-duty/concessions-exemptions-and-waivers/principal-place-residence-duty-concession",
    userAgentNavegador: true,
    traer(http) {
      return paginaActualizada(http, this.url, "State Revenue Office Victoria updated the principal place of residence concession", /Updated:?\s*(\d{1,2}) ([A-Za-z]+) (\d{4})/);
    },
  },
  {
    id: "au.qro-transfer-duty",
    carril: "norma",
    datos: ["au.qld-transfer-duty"],
    metodo: "html",
    url: "https://qro.qld.gov.au/duties/transfer-duty/calculate/rates/",
    userAgentNavegador: true,
    traer(http) {
      return paginaActualizada(http, this.url, "Queensland Revenue Office updated the transfer duty rates", /Last updated:?\s*(\d{1,2}) ([A-Za-z]+) (\d{4})/);
    },
  },
  {
    id: "au.qro-home-concession",
    carril: "norma",
    datos: ["au.qld-home-duty", "au.qld-fhb-concesion"],
    metodo: "html",
    url: "https://qro.qld.gov.au/duties/transfer-duty/calculate/concession-rates/",
    userAgentNavegador: true,
    traer(http) {
      return paginaActualizada(http, this.url, "Queensland Revenue Office updated the home concession rates", /Last updated:?\s*(\d{1,2}) ([A-Za-z]+) (\d{4})/);
    },
  },
];
