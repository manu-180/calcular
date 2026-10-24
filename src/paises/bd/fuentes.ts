import { esFechaISO } from "@/motor/vigencia";
import type { Detector, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO = "2026-10-24";
const MESES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const TABLA_MOLE = "পিডিএফ সংযুক্তি";
const OBJETOS = { url: "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/" }.url;

// La portada de BBS trae el rótulo «Inflation: 8.34% (September, 2026)» del último mes publicado;
// cada corrida suma ese punto (el día 1 del mes).
export function puntoInflacionBbs(html: string): { fecha: string; valor: number } | null {
  const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const m = /Inflation\s*:\s*([\d.]+)\s*%\s*\(\s*([A-Za-z]+),?\s*(\d{4})\s*\)/.exec(texto);
  if (!m) return null;
  const mes = MESES.indexOf(m[2].toLowerCase()) + 1;
  const fecha = [m[3], String(mes).padStart(2, "0"), "01"].join("-");
  const valor = Number(m[1]);
  if (mes === 0 || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return { fecha, valor };
}

// Los portales del gobierno (plataforma V2) guardan cada archivo con un nombre nuevo y listan primero
// el más reciente. Si el primer enlace de la carpeta de la oficina ya no es el archivo leído, hay una
// versión nueva que leer.
function primerArchivo(html: string, carpeta: string, desde = ""): string | null {
  const i = desde ? html.indexOf(desde) : 0;
  if (i < 0) return null;
  const m = new RegExp(`${carpeta}/[^"'\\s<>]+\\.pdf`, "i").exec(html.slice(i));
  return m ? `${OBJETOS}${m[0]}` : null;
}

function archivoNuevo(html: string, conocido: string, carpeta: string, desde = ""): boolean | null {
  const primero = primerArchivo(html, carpeta, desde);
  if (!primero) return null;
  return !primero.includes(conocido);
}

export const detectores: readonly Detector[] = [
  {
    id: "bd.inflation-bbs",
    carril: "serie",
    serie: "bd.inflation",
    metodo: "html",
    url: "https://bbs.gov.bd/",
    userAgentNavegador: true,
    banda: { min: 0, max: 30, saltoRelativoMax: 0.35 },
    async traer(http) {
      const p = puntoInflacionBbs(await http.texto(this.url, { userAgentNavegador: true }));
      return p && esFechaISO(p.fecha) ? [{ fecha: p.fecha, valor: p.valor }] : null;
    },
  },
  {
    // El listado de leyes de finanzas de NBR enlaza cada «Finance_Act_<año>.pdf»; uno posterior a
    // 2026 trae tablas nuevas de impuesto, retenciones e IVA.
    id: "bd.nbr-finance-acts",
    carril: "norma",
    datos: [
      "bd.income-tax-slabs",
      "bd.tax-free-threshold",
      "bd.disabled-child-extra",
      "bd.minimum-tax",
      "bd.investment-rebate",
      "bd.salary-exempt-max",
      "bd.return-timing-rates",
      "bd.return-timing-amounts",
      "bd.vat-standard",
      "bd.tds-services",
      "bd.tds-savings-certificate",
      "bd.pensioner-tds-free-limit",
      "bd.tds-bank-interest",
    ],
    metodo: "html",
    url: "https://nbr.gov.bd/regulations/acts/finance-acts/eng",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/Finance_Act_?,?_?(20\d{2})/gi)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const ultimo = Math.max(...anios);
      const fecha = [String(ultimo), "07", "01"].join("-");
      if (ultimo <= 2026 || !esFechaISO(fecha)) return [];
      const hallazgos: HallazgoNorma[] = [{ titulo: `Finance Act ${ultimo}`, url: this.url, fecha }];
      return hallazgos;
    },
  },
  {
    id: "bd.nsd-rates",
    carril: "norma",
    datos: ["bd.sanchayapatra-rates", "bd.sanchayapatra-tier"],
    metodo: "html",
    url: "https://nationalsavings.gov.bd/pages/static-pages/6922e111933eb65569e29fed",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const nuevo = archivoNuevo(html, "5123d60a893e49c2923d35d7e0c1b833", "office-nationalsavings");
      if (nuevo === null) return null;
      return nuevo ? [{ titulo: "National savings profit rates (new notice)", url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  {
    id: "bd.mwb-minimum-wages",
    carril: "norma",
    datos: ["bd.minimum-wage-total", "bd.minimum-wage-basic"],
    metodo: "html",
    url: "https://mwb.portal.gov.bd/pages/static-pages/6922dfad933eb65569e236a1",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const nuevo = archivoNuevo(html, "0b34c4f3-ed20-4111-8719-9b056eef81b0", "office-mwb");
      if (nuevo === null) return null;
      return nuevo ? [{ titulo: "Minimum Wage Board: updated list of sector wages", url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  {
    // La página de leyes del Ministerio de Trabajo pone primero la norma más reciente; la última
    // leída es la enmienda de 2026 a la Ley del Trabajo.
    id: "bd.mole-labour-law",
    carril: "norma",
    datos: [
      "bd.compensation-days",
      "bd.resignation-days",
      "bd.notice-days",
      "bd.gratuity-days",
      "bd.overtime-multiplier",
      "bd.annual-leave-divisor",
      "bd.leave-days",
      "bd.maternity-days",
      "bd.maternity-divisor",
      "bd.provident-fund-rate",
    ],
    metodo: "html",
    url: "https://mole.gov.bd/pages/legislative-informations",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      // El encabezado «পিডিএফ সংযুক্তি» abre la tabla; antes hay adjuntos de la portada.
      const nuevo = archivoNuevo(html, "db5604f4-8cc4-40e0-aef3-88e50cdf4b51", "office-mole", TABLA_MOLE);
      if (nuevo === null) return null;
      const primero = primerArchivo(html, "office-mole", TABLA_MOLE);
      return nuevo ? [{ titulo: "Ministry of Labour: new law or amendment listed", url: primero ?? this.url, fecha: VERIFICADO }] : [];
    },
  },
];
