import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-14";
const SARB = "https://custom.resbank.co.za/SarbWebApi/WebIndicators/Shared/GetTimeseriesObservations";

// La API del SARB devuelve las observaciones más nuevas primero. En la serie mensual del IPC el
// período es el último día del mes; en series.json cada mes se guarda el día 1.
async function serieSarb(http: Http, url: string, mensual: boolean): Promise<readonly PuntoSerie[] | null> {
  const json = await http.json(url);
  if (!Array.isArray(json)) return null;
  const puntos: PuntoSerie[] = [];
  for (const o of json as { Period?: unknown; Value?: unknown }[]) {
    if (typeof o.Period !== "string" || typeof o.Value !== "number") return null;
    const fecha = mensual ? `${o.Period.slice(0, 7)}-01` : o.Period.slice(0, 10);
    if (!esFechaISO(fecha) || !Number.isFinite(o.Value)) return null;
    puntos.push({ fecha, valor: o.Value });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

// Las páginas de SARS son WordPress y publican su fecha de modificación en article:modified_time.
// Si cambió después de la última verificación, hay que volver a leer la tabla.
async function paginaSars(http: Http, url: string, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = /article:modified_time" content="(\d{4}-\d{2}-\d{2})/.exec(html);
  if (!m || !esFechaISO(m[1])) return null;
  return m[1] > VERIFICADO ? [{ titulo, url, fecha: m[1] }] : [];
}

// El listado de comunicados de gov.za trae cada enlace seguido de su fecha. Solo interesan los del
// Departamento de Empleo sobre salario mínimo, umbral de ingresos o la BCEA.
async function comunicadosGovZa(http: Http, url: string, filtro: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const re = /href="(\/news\/media-statements\/[^"]+)"[\s\S]*?datetime="(\d{4}-\d{2}-\d{2})/g;
  let vistos = 0;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(re)) {
    vistos++;
    if (!esFechaISO(m[2]) || m[2] <= VERIFICADO || !filtro.test(m[1])) continue;
    hallazgos.push({ titulo: m[1].split("/").pop()!.replace(/-/g, " "), url: `https://www.gov.za${m[1]}`, fecha: m[2] });
  }
  return vistos === 0 ? null : hallazgos;
}

function sars(id: string, datos: readonly string[], url: `https://${string}`, titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    traer(http) {
      return paginaSars(http, this.url, titulo);
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "za.cpi-sarb",
    carril: "serie",
    serie: "za.cpi-annual",
    metodo: "api-json",
    url: `${SARB}/CPI1000F/2025-01-01/2030-12-31`,
    // Es una variación interanual en puntos: en un mes puede moverse un punto y medio o más.
    banda: { min: -2, max: 15, saltoRelativoMax: 0.6 },
    traer(http) {
      return serieSarb(http, this.url, true);
    },
  },
  {
    id: "za.prime-sarb",
    carril: "serie",
    serie: "za.prime-rate",
    metodo: "api-json",
    url: `${SARB}/MMRD000A/2026-01-01/2030-12-31`,
    banda: { min: 5, max: 20, saltoRelativoMax: 0.1 },
    traer(http) {
      return serieSarb(http, this.url, false);
    },
  },
  {
    id: "za.repo-sarb",
    carril: "serie",
    serie: "za.repo-rate",
    metodo: "api-json",
    url: `${SARB}/MMRD002A/2026-01-01/2030-12-31`,
    banda: { min: 2, max: 15, saltoRelativoMax: 0.15 },
    traer(http) {
      return serieSarb(http, this.url, false);
    },
  },
  sars(
    "za.sars-individual-rates",
    ["za.income-tax-bands", "za.tax-rebates", "za.tax-thresholds"],
    "https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/",
    "SARS rates of tax for individuals updated",
  ),
  sars("za.sars-medical-credits", ["za.medical-tax-credits"], "https://www.sars.gov.za/tax-rates/medical-tax-credit-rates/", "SARS medical tax credit rates updated"),
  sars("za.sars-transfer-duty", ["za.transfer-duty"], "https://www.sars.gov.za/tax-rates/transfer-duty/", "SARS transfer duty table updated"),
  sars(
    "za.sars-cgt",
    ["za.cgt-annual-exclusion", "za.cgt-death-exclusion", "za.cgt-primary-residence-exclusion", "za.cgt-inclusion-rate"],
    "https://www.sars.gov.za/tax-rates/income-tax/capital-gains-tax-cgt/",
    "SARS capital gains tax rates updated",
  ),
  sars("za.sars-uif", ["za.uif-employee-rate", "za.uif-employer-rate", "za.uif-ceiling-monthly"], "https://www.sars.gov.za/types-of-tax/unemployment-insurance-fund/", "SARS UIF page updated"),
  sars("za.sars-sdl", ["za.sdl-rate", "za.sdl-threshold"], "https://www.sars.gov.za/types-of-tax/skills-development-levy/", "SARS SDL page updated"),
  sars(
    "za.sars-budget",
    [
      "za.vat",
      "za.retirement-deduction-rate",
      "za.retirement-deduction-cap",
      "za.lump-sum-withdrawal-table",
      "za.lump-sum-retirement-table",
      "za.estate-duty",
      "za.estate-duty-abatement",
      "za.donations-tax",
      "za.donations-exemption",
      "za.turnover-tax",
      "za.sbc-tax",
      "za.company-tax-rate",
    ],
    "https://www.sars.gov.za/types-of-tax/value-added-tax/",
    "SARS VAT page updated (budget changes are usually reflected here)",
  ),
  {
    id: "za.govza-labour",
    carril: "norma",
    datos: ["za.minimum-wage", "za.minimum-wage-contract-cleaning", "za.bcea-earnings-threshold", "za.weeks-per-month"],
    metodo: "html",
    url: "https://www.gov.za/news/media-statements",
    userAgentNavegador: true,
    traer(http) {
      return comunicadosGovZa(http, this.url, /minimum-wage|earnings-threshold|basic-conditions/i);
    },
  },
];
