import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-18";
const MESES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function fecha(dia: string, mes: string, anio: string): FechaISO | null {
  const m = MESES.indexOf(mes.slice(0, 3).toLowerCase());
  if (m < 0) return null;
  const f = `${anio}-${String(m + 1).padStart(2, "0")}-${dia.padStart(2, "0")}`;
  return esFechaISO(f) ? f : null;
}

function celdas(fila: string): string[] {
  return [...fila.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => c[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

// La tabla del BoG la arma wpDataTables en el servidor: cada fila trae fecha, moneda, par, compra,
// venta y medio. Solo interesa la fila USDGHS.
async function tipoDeCambio(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  for (const fila of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const c = celdas(fila[1]);
    if (c.length < 6 || c[2] !== "USDGHS") continue;
    const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(c[0]);
    const valor = Number(c[5]);
    const f = m ? fecha(m[1], m[2], m[3]) : null;
    if (!f || !Number.isFinite(valor)) return null;
    return [{ fecha: f, valor }];
  }
  return null;
}

// Cada fila de la tabla de tasas es una reunión del MPC: número, fechas, fecha de vigencia y tasa.
async function tasaDePolitica(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const puntos = new Map<FechaISO, number>();
  for (const fila of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const c = celdas(fila[1]);
    if (c.length < 4) continue;
    const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(c[2]);
    const valor = Number(c[3]);
    const f = m ? fecha(m[1], m[2], m[3]) : null;
    if (f && Number.isFinite(valor) && f >= "2026-01-01") puntos.set(f, valor);
  }
  if (puntos.size === 0) return null;
  return [...puntos].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([f, valor]) => ({ fecha: f, valor }));
}

// La página de PAYE enlaza la ley que fija las bandas vigentes. Un número de ley distinto de 1178
// es una reforma nueva.
async function leyPaye(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const leyes = [...html.matchAll(/Income Tax \(Amendment\)(?: \(No\.\s*\d\))? Act,\s*(\d{4})\s*Act\s*(\d{3,4})/g)];
  if (leyes.length === 0) return null;
  return leyes.filter((m) => Number(m[2]) > 1178).map((m) => ({ titulo: `Income Tax (Amendment) Act, ${m[1]} (Act ${m[2]})`, url, fecha: VERIFICADO }));
}

// La FWSC publica el salario mínimo de cada año como "<año> National Daily Minimum Wage". Un año
// posterior a 2026 es un salario nuevo.
async function salarioMinimo(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const anios = [...html.matchAll(/(\d{4})[- ]National[- ]Daily[- ]Minimum[- ]Wage/gi)].map((m) => Number(m[1]));
  if (anios.length === 0) return null;
  return [...new Set(anios.filter((a) => a > 2026))].map((a) => ({ titulo: `${a} National Daily Minimum Wage`, url, fecha: VERIFICADO }));
}

export const detectores: readonly Detector[] = [
  {
    id: "gh.bog-usd-ghs",
    carril: "serie",
    serie: "gh.usd-ghs",
    metodo: "html",
    url: "https://www.bog.gov.gh/treasury-and-the-markets/daily-interbank-fx-rates/",
    userAgentNavegador: true,
    banda: { min: 5, max: 40, saltoRelativoMax: 0.08 },
    traer(http) {
      return tipoDeCambio(http, this.url);
    },
  },
  {
    id: "gh.bog-policy-rate",
    carril: "serie",
    serie: "gh.policy-rate",
    metodo: "html",
    url: "https://www.bog.gov.gh/monetary-policy/policy-rate-trends/",
    userAgentNavegador: true,
    banda: { min: 3, max: 40, saltoRelativoMax: 0.3 },
    traer(http) {
      return tasaDePolitica(http, this.url);
    },
  },
  {
    id: "gh.gra-paye",
    carril: "norma",
    datos: ["gh.paye-annual-bands", "gh.non-resident-rate", "gh.bonus-rate", "gh.bonus-limit", "gh.overtime-tax"],
    metodo: "html",
    url: "https://gra.gov.gh/domestic-tax/tax-types/paye/",
    userAgentNavegador: true,
    traer(http) {
      return leyPaye(http, this.url);
    },
  },
  {
    id: "gh.fwsc-minimum-wage",
    carril: "norma",
    datos: ["gh.minimum-wage"],
    metodo: "html",
    url: "https://fairwages.gov.gh/",
    userAgentNavegador: true,
    traer(http) {
      return salarioMinimo(http, this.url);
    },
  },
];
