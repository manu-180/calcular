import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-16";
const MESES: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
  July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
};

async function cpiCensatd(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { dataSet?: { freq?: unknown; period?: unknown; sv?: unknown; svDesc?: unknown; figure?: unknown }[] };
  if (!Array.isArray(json?.dataSet)) return null;
  const puntos: PuntoSerie[] = [];
  for (const x of json.dataSet) {
    if (x.sv !== "CC_CM_1920" || x.svDesc !== "Index" || x.freq !== "M" || typeof x.period !== "string") continue;
    const fecha = `${x.period.slice(0, 4)}-${x.period.slice(4, 6)}-01`;
    const valor = typeof x.figure === "number" ? x.figure : Number.NaN;
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) continue;
    if (fecha >= "2025-01-01") puntos.push({ fecha, valor });
  }
  if (!puntos.length) return null;
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

async function hiborHkma(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { header?: { success?: unknown }; result?: { records?: { end_of_date?: unknown; hibor_fixing_1m?: unknown }[] } };
  if (json?.header?.success !== true || !Array.isArray(json.result?.records)) return null;
  const puntos: PuntoSerie[] = [];
  for (const r of json.result.records) {
    if (typeof r.end_of_date !== "string" || typeof r.hibor_fixing_1m !== "number") continue;
    if (!esFechaISO(r.end_of_date)) continue;
    puntos.push({ fecha: r.end_of_date, valor: r.hibor_fixing_1m });
  }
  if (!puntos.length) return null;
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

// Las páginas oficiales anuncian cada cambio con la fecha en que rige ("with effect from 1 May
// 2027"). Una fecha posterior a la última verificación es un cambio que todavía no está en datos.json.
async function fechasNuevas(http: Http, url: string, valida: RegExp, patron: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!valida.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(patron)) {
    const fecha = `${m[3]}-${MESES[m[2]] ?? "xx"}-${m[1].padStart(2, "0")}`;
    if (esFechaISO(fecha) && fecha > VERIFICADO && !hallazgos.some((h) => h.fecha === fecha)) hallazgos.push({ titulo: `${titulo} (${fecha})`, url, fecha });
  }
  return hallazgos;
}

// El IRD publica cada presupuesto en la misma página con su año en el título ("2026-27 Budget"):
// un año más nuevo que el último cargado trae asignaciones o reducciones nuevas.
async function presupuestoNuevo(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const m = html.match(/(\d{4})-(\d{2}) Budget/);
  if (!m) return null;
  const inicio = Number(m[1]);
  if (inicio <= 2026) return [];
  return [{ titulo: `${m[1]}-${m[2]} Budget: tax measures`, url, fecha: `${inicio}-02-01` as FechaISO }];
}

export const detectores: readonly Detector[] = [
  {
    id: "hk.cpi-censtatd",
    carril: "serie",
    serie: "hk.cpi",
    metodo: "api-json",
    url: "https://www.censtatd.gov.hk/api/get.php?id=510-60001&lang=en&full_series=1",
    banda: { min: 90, max: 140, saltoRelativoMax: 0.03 },
    traer(http) {
      return cpiCensatd(http, this.url);
    },
  },
  {
    id: "hk.hibor-hkma",
    carril: "serie",
    serie: "hk.hibor-1m",
    metodo: "api-json",
    url: "https://api.hkma.gov.hk/public/market-data-and-statistics/daily-monetary-statistics/daily-figures-interbank-liquidity?pagesize=40&sortby=end_of_date&sortorder=desc",
    // El HIBOR a un mes se mueve con la liquidez interbancaria: entre dos días hábiles puede pasar de
    // 1 % a más del doble cuando la Autoridad Monetaria defiende la banda del dólar.
    banda: { min: 0, max: 10, saltoRelativoMax: 1.5 },
    traer(http) {
      return hiborHkma(http, this.url);
    },
  },
  {
    id: "hk.ird-budget",
    carril: "norma",
    datos: [
      "hk.basic-allowance",
      "hk.married-allowance",
      "hk.child-allowance",
      "hk.single-parent-allowance",
      "hk.dependent-parent-60",
      "hk.dependent-parent-55",
      "hk.elderly-care-limit",
      "hk.tax-reduction-cap",
      "hk.deduction-limits",
      "hk.salaries-tax-rates",
      "hk.standard-rates",
      "hk.profits-tax-corporations",
      "hk.profits-tax-unincorporated",
      "hk.avd-residential",
      "hk.avd-non-residential",
    ],
    metodo: "html",
    url: "https://www.ird.gov.hk/eng/tax/budget.htm",
    traer(http) {
      return presupuestoNuevo(http, this.url);
    },
  },
  {
    id: "hk.labour-smw",
    carril: "norma",
    datos: ["hk.minimum-wage", "hk.smw-record-cap"],
    metodo: "html",
    url: "https://www.labour.gov.hk/eng/news/mwo.htm",
    traer(http) {
      return fechasNuevas(http, this.url, /Statutory Minimum Wage/, /with effect from (\d{1,2}) ([A-Z][a-z]+) (\d{4})/g, "New statutory minimum wage rate");
    },
  },
  {
    id: "hk.mpfa-relevant-income",
    carril: "norma",
    datos: ["hk.mpf-rate", "hk.mpf-min-relevant-income", "hk.mpf-max-relevant-income"],
    metodo: "html",
    url: "https://www.mpfa.org.hk/en/mpf-system/mandatory-contributions/employees",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const m = html.match(/current minimum and maximum relevant income levels are \$([\d,]+) and \$([\d,]+)/);
      if (!m) return null;
      if (m[1] === "7,100" && m[2] === "30,000") return [];
      return [{ titulo: `MPF relevant income levels changed to $${m[1]} and $${m[2]}`, url: this.url, fecha: VERIFICADO }];
    },
  },
];
