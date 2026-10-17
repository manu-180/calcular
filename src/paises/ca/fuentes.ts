import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-14";

async function statcan(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = await http.json(url);
  if (!Array.isArray(json)) return null;
  const objeto = (json[0] as { status?: unknown; object?: { vectorDataPoint?: unknown } } | undefined) ?? {};
  if (objeto.status !== "SUCCESS" || !Array.isArray(objeto.object?.vectorDataPoint)) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of objeto.object.vectorDataPoint as { refPer?: unknown; value?: unknown }[]) {
    if (!esFechaISO(p.refPer) || typeof p.value !== "number" || !Number.isFinite(p.value)) return null;
    puntos.push({ fecha: p.refPer, valor: p.value });
  }
  return puntos.length ? puntos : null;
}

async function valet(http: Http, url: string, serie: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { observations?: unknown };
  if (!Array.isArray(json?.observations)) return null;
  const puntos: PuntoSerie[] = [];
  for (const o of json.observations as Record<string, unknown>[]) {
    const celda = o[serie] as { v?: unknown } | undefined;
    const valor = typeof celda?.v === "string" ? Number(celda.v) : NaN;
    if (!esFechaISO(o.d) || !Number.isFinite(valor)) return null;
    puntos.push({ fecha: o.d, valor });
  }
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

const MESES: Record<string, string> = { January: "01", July: "07" };

// La CRA publica la T4127 dos veces por año (enero y julio). Una edición con fecha de vigencia
// posterior a la última verificación es la señal de que cambiaron tramos, créditos, CPP o EI.
async function edicionesT4127(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/Payroll Deductions Formulas/.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/Effective (January|July) 1, (\d{4})/g)) {
    const fecha = `${m[2]}-${MESES[m[1]]}-01`;
    if (!esFechaISO(fecha) || fecha <= VERIFICADO) continue;
    if (hallazgos.some((h) => h.fecha === fecha)) continue;
    hallazgos.push({ titulo: `T4127 Payroll Deductions Formulas effective ${m[1]} 1, ${m[2]}`, url, fecha });
  }
  return hallazgos;
}

const VALET = "https://www.bankofcanada.ca/valet/observations";

export const detectores: readonly Detector[] = [
  {
    id: "ca.cpi-statcan",
    carril: "serie",
    serie: "ca.cpi",
    metodo: "api-json",
    url: "https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorByReferencePeriodRange?vectorIds=%2241690973%22&startRefPeriod=2025-01-01&endReferencePeriod=2035-12-01",
    banda: { min: 150, max: 220, saltoRelativoMax: 0.03 },
    traer(http) {
      return statcan(http, this.url);
    },
  },
  {
    id: "ca.usd-cad-boc",
    carril: "serie",
    serie: "ca.usd-cad",
    metodo: "api-json",
    url: `${VALET}/FXUSDCAD/json?recent=10`,
    banda: { min: 1, max: 2, saltoRelativoMax: 0.05 },
    traer(http) {
      return valet(http, this.url, "FXUSDCAD");
    },
  },
  {
    id: "ca.policy-rate-boc",
    carril: "serie",
    serie: "ca.policy-rate",
    metodo: "api-json",
    url: `${VALET}/V39079/json?recent=10`,
    // La tasa se mueve de a 0,25 puntos, pero en 2020 bajó de 1,75 a 0,25 en tres semanas: con tasas
    // bajas un solo movimiento supera el 50 % relativo.
    banda: { min: 0, max: 10, saltoRelativoMax: 0.7 },
    traer(http) {
      return valet(http, this.url, "V39079");
    },
  },
  {
    id: "ca.prime-rate-boc",
    carril: "serie",
    serie: "ca.prime-rate",
    metodo: "api-json",
    url: `${VALET}/V80691311/json?recent=8`,
    banda: { min: 1, max: 12, saltoRelativoMax: 0.5 },
    traer(http) {
      return valet(http, this.url, "V80691311");
    },
  },
  {
    id: "ca.t4127-cra",
    carril: "norma",
    datos: [
      "ca.federal-tax-brackets",
      "ca.federal-bpa",
      "ca.canada-employment-amount",
      "ca.provincial-tax-brackets",
      "ca.provincial-bpa",
      "ca.on-surtax-thresholds",
      "ca.bc-tax-reduction",
      "ca.ab-supplemental-credit-threshold",
      "ca.cpp",
      "ca.cpp-rates",
      "ca.qpp",
      "ca.ei-maximum",
      "ca.ei-rates",
      "ca.qpip-maximum",
      "ca.qpip-rates",
    ],
    metodo: "html",
    url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas.html",
    userAgentNavegador: true,
    traer(http) {
      return edicionesT4127(http, this.url);
    },
  },
];
