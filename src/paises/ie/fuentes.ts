import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-14";
const MESES: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};

function fechaInglesa(texto: string): FechaISO | null {
  const m = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(texto);
  if (!m) return null;
  const mes = MESES[m[2].toLowerCase()];
  if (!mes) return null;
  const fecha = `${m[3]}-${mes}-${m[1].padStart(2, "0")}`;
  return esFechaISO(fecha) ? fecha : null;
}

// PxStat devuelve JSON-stat 2.0: los valores vienen en un arreglo plano ordenado por las
// dimensiones (estadística, mes, grupo). Se lee la base diciembre 2023 = 100 de "All Items".
async function ipcCso(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as {
    id?: unknown;
    size?: unknown;
    value?: unknown;
    dimension?: Record<string, { category?: { index?: unknown } }>;
  };
  if (!Array.isArray(json?.id) || !Array.isArray(json.size) || !Array.isArray(json.value) || !json.dimension) return null;
  const ids = json.id as string[];
  const size = json.size as number[];
  if (ids.length !== 3 || size.length !== 3) return null;
  const claves = ids.map((k) => {
    const idx = json.dimension?.[k]?.category?.index;
    if (Array.isArray(idx)) return idx as string[];
    if (idx && typeof idx === "object") return Object.entries(idx as Record<string, number>).sort((a, b) => a[1] - b[1]).map(([c]) => c);
    return null;
  });
  if (claves.some((c) => c === null)) return null;
  const [stats, meses, grupos] = claves as string[][];
  const s = stats.indexOf("CPM20C06");
  const g = grupos.indexOf("CP00");
  if (s < 0 || g < 0) return null;
  const valores = json.value as unknown[];
  const puntos: PuntoSerie[] = [];
  for (let m = 0; m < meses.length; m++) {
    const mes = meses[m];
    if (!/^\d{6}$/.test(mes) || mes < "202501") continue;
    const valor = valores[(s * size[1] + m) * size[2] + g];
    if (valor === null || valor === undefined) continue;
    const fecha = `${mes.slice(0, 4)}-${mes.slice(4)}-01`;
    if (typeof valor !== "number" || !esFechaISO(fecha)) return null;
    puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

// Cada página oficial muestra su fecha de última modificación con un formato propio. Si la página
// cambió después de la última verificación, se abre un PR borrador para volver a leerla.
async function paginaActualizada(http: Http, url: string, titulo: string, patron: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = patron.exec(html);
  if (!m) return null;
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(m[1]) ? (m[1] as FechaISO) : fechaInglesa(m[1]);
  if (!fecha) return null;
  return fecha > VERIFICADO ? [{ titulo, url, fecha }] : [];
}

const GOV_IE = /Last updated on:\s*<time datetime="(\d{4}-\d{2}-\d{2})/;
const REVENUE = /Published:\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/;
const WRC = /Updated\s+(\d{1,2}\s+[A-Za-z]+\s+\d{4})/;

// El índice de eBriefs de Revenue pone la fecha una sola vez por día, antes del primer eBrief de
// ese día: los siguientes heredan la última fecha vista.
async function ebriefs(http: Http, url: string, filtro: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const re = /<span>(\d{1,2} [A-Za-z]+ \d{4})<\/span>|<a href="(\/en\/tax-professionals\/ebrief\/\d{4}\/no-\d+\.aspx)">([^<]+)<\/a>/g;
  let fecha: FechaISO | null = null;
  let vistos = 0;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(re)) {
    if (m[1]) {
      fecha = fechaInglesa(m[1]);
      continue;
    }
    vistos++;
    const titulo = m[3].replace(/\s+/g, " ").trim();
    if (fecha && fecha > VERIFICADO && filtro.test(titulo)) hallazgos.push({ titulo, url: `https://www.revenue.ie${m[2]}`, fecha });
  }
  return vistos === 0 ? null : hallazgos;
}

function pagina(id: string, datos: readonly string[], url: `https://${string}`, titulo: string, patron: RegExp): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    traer(http) {
      return paginaActualizada(http, this.url, titulo, patron);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "ie.cpi-cso",
    carril: "serie",
    serie: "ie.cpi",
    metodo: "api-json",
    url: "https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/CPM20/JSON-stat/2.0/en",
    banda: { min: 90, max: 140, saltoRelativoMax: 0.03 },
    traer(http) {
      return ipcCso(http, this.url);
    },
  },
  {
    id: "ie.revenue-ebriefs",
    carril: "norma",
    datos: [
      "ie.income-tax-rates",
      "ie.rate-bands",
      "ie.tax-credits",
      "ie.usc-bands",
      "ie.usc-reduced-bands",
      "ie.vat-rates",
      "ie.stamp-duty-residential",
      "ie.stamp-duty-non-residential",
      "ie.cgt-rate",
      "ie.cgt-annual-exemption",
      "ie.cat-thresholds",
      "ie.cat-rate",
      "ie.htb-max",
      "ie.lpt-bands",
      "ie.rent-tax-credit",
    ],
    metodo: "html",
    url: "https://www.revenue.ie/en/tax-professionals/ebrief/index.aspx",
    userAgentNavegador: true,
    traer(http) {
      return ebriefs(http, this.url, /rate|threshold|credit|band|USC|universal social charge|stamp duty|capital gains|capital acquisitions|help to buy|local property tax|LPT|VAT|budget|finance act/i);
    },
  },
  pagina(
    "ie.revenue-tax-chart",
    ["ie.income-tax-rates", "ie.rate-bands", "ie.tax-credits", "ie.rent-tax-credit"],
    "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx",
    "Revenue tax rates, bands and reliefs chart updated",
    REVENUE,
  ),
  pagina(
    "ie.revenue-usc",
    ["ie.usc-bands", "ie.usc-exemption"],
    "https://www.revenue.ie/en/jobs-and-pensions/usc/standard-rates-thresholds.aspx",
    "Revenue USC rates and thresholds page updated",
    REVENUE,
  ),
  pagina(
    "ie.prsi-class-a",
    ["ie.prsi-employee-rate", "ie.prsi-employer-rates", "ie.prsi-weekly-thresholds", "ie.prsi-credit-max"],
    "https://www.gov.ie/en/department-of-social-protection/publications/prsi-class-a-rates/",
    "PRSI Class A rates page updated",
    GOV_IE,
  ),
  pagina(
    "ie.minimum-wage-wrc",
    ["ie.minimum-wage", "ie.minimum-wage-age-percent"],
    "https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/national%20minimum%20wage/",
    "National Minimum Wage page updated",
    WRC,
  ),
  pagina(
    "ie.maternity-benefit",
    ["ie.maternity-benefit-weekly", "ie.maternity-benefit-weeks", "ie.maternity-unpaid-weeks"],
    "https://www.gov.ie/en/department-of-social-protection/services/maternity-benefit/",
    "Maternity Benefit page updated",
    GOV_IE,
  ),
  pagina(
    "ie.jobseekers-pay-related",
    ["ie.jprb-rates", "ie.jprb-caps", "ie.jprb-minimum"],
    "https://www.gov.ie/en/department-of-social-protection/services/jobseekers-pay-related-benefit/",
    "Jobseeker's Pay-Related Benefit page updated",
    GOV_IE,
  ),
  pagina(
    "ie.redundancy-examples",
    ["ie.redundancy-weekly-ceiling"],
    "https://www.gov.ie/en/department-of-social-protection/publications/redundancy-calculation-examples/",
    "Redundancy calculation examples updated",
    GOV_IE,
  ),
  pagina(
    "ie.lpt-bands-page",
    ["ie.lpt-bands", "ie.lpt-high-value-rates", "ie.lpt-band-limit", "ie.lpt-local-adjustment"],
    "https://www.revenue.ie/en/property/local-property-tax/valuing-your-property/valuation-bands-rates.aspx",
    "LPT valuation bands and rates page updated",
    REVENUE,
  ),
];
