import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const MESES: Record<string, string> = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
const VERIFICADO: FechaISO = "2026-10-14";
const BUSQUEDA = "https://www.gov.uk/api/search.json";

async function cpiOns(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(url)) as { months?: unknown };
  if (!Array.isArray(json?.months)) return null;
  const puntos: PuntoSerie[] = [];
  for (const m of json.months as { date?: unknown; value?: unknown }[]) {
    if (typeof m.date !== "string" || typeof m.value !== "string") return null;
    const [anio, mes] = m.date.split(" ");
    const fecha = `${anio}-${MESES[mes] ?? "xx"}-01`;
    const valor = Number(m.value);
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    if (fecha >= "2025-01-01") puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

async function bankRate(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const csv = await http.texto(url);
  const lineas = csv.trim().split(/\r?\n/);
  if (!/^DATE,IUDBEDR/.test(lineas[0] ?? "")) return null;
  const puntos: PuntoSerie[] = [];
  for (const l of lineas.slice(1)) {
    const [d, v] = l.split(",");
    const [dia, mes, anio] = (d ?? "").split(" ");
    const fecha = `${anio}-${MESES[(mes ?? "").toUpperCase()] ?? "xx"}-${(dia ?? "").padStart(2, "0")}`;
    const valor = Number(v);
    if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
    puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos : null;
}

// La búsqueda de GOV.UK devuelve las páginas nuevas con su fecha de publicación. Solo cuenta lo
// publicado después de la última verificación: lo anterior ya se leyó al cargar datos.json.
async function busquedaGovUk(http: Http, url: string, titulo: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { results?: unknown };
  if (!Array.isArray(json?.results)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const r of json.results as { title?: unknown; link?: unknown; public_timestamp?: unknown }[]) {
    if (typeof r.title !== "string" || typeof r.link !== "string" || typeof r.public_timestamp !== "string") continue;
    const fecha = r.public_timestamp.slice(0, 10);
    if (!esFechaISO(fecha) || fecha <= VERIFICADO || !titulo.test(r.title)) continue;
    hallazgos.push({ titulo: r.title, url: `https://www.gov.uk${r.link}`, fecha });
  }
  return hallazgos;
}

const buscar = (q: string) => `${BUSQUEDA}?q=${encodeURIComponent(q)}&count=20&fields=title,link,public_timestamp` as `https://${string}`;

export const detectores: readonly Detector[] = [
  {
    id: "gb.cpi-ons",
    carril: "serie",
    serie: "gb.cpi",
    metodo: "api-json",
    url: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7bt/mm23/data",
    userAgentNavegador: true,
    banda: { min: 120, max: 200, saltoRelativoMax: 0.03 },
    traer(http) {
      return cpiOns(http, this.url);
    },
  },
  {
    id: "gb.bank-rate-boe",
    carril: "serie",
    serie: "gb.bank-rate",
    metodo: "html",
    url: "https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?csv.x=yes&Datefrom=01/Jan/2026&Dateto=now&SeriesCodes=IUDBEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N",
    userAgentNavegador: true,
    // El Bank Rate se mueve de a 0,25 puntos, pero en una emergencia bajó 0,5 desde 0,75 (salto del 67 %).
    banda: { min: 0, max: 10, saltoRelativoMax: 0.7 },
    traer(http) {
      return bankRate(http, this.url);
    },
  },
  {
    id: "gb.hmrc-rates-employers",
    carril: "norma",
    datos: [
      "gb.personal-allowance",
      "gb.income-tax-bands",
      "gb.basic-rate-band",
      "gb.additional-rate-threshold",
      "gb.ni-primary-threshold",
      "gb.ni-upper-earnings-limit",
      "gb.ni-secondary-threshold",
      "gb.ni-lower-earnings-limit-weekly",
      "gb.ni-employee-main-rate",
      "gb.ni-employee-upper-rate",
      "gb.ni-employer-rate",
      "gb.employment-allowance",
      "gb.student-loan-thresholds",
      "gb.student-loan-rate",
      "gb.postgraduate-loan-rate",
      "gb.ssp-weekly-rate",
      "gb.smp-standard-rate",
    ],
    metodo: "api-json",
    url: buscar("rates and thresholds for employers"),
    traer(http) {
      return busquedaGovUk(http, this.url, /^Rates and thresholds for employers \d{4} to \d{4}$/i);
    },
  },
  {
    id: "gb.minimum-wage-govuk",
    carril: "norma",
    datos: ["gb.minimum-wage"],
    metodo: "api-json",
    url: buscar("national living wage increase"),
    traer(http) {
      return busquedaGovUk(http, this.url, /national (living|minimum) wage/i);
    },
  },
  {
    id: "gb.budget-ootlar",
    carril: "norma",
    datos: [
      "gb.dividend-allowance",
      "gb.dividend-rates",
      "gb.cgt-annual-exempt-amount",
      "gb.cgt-rates",
      "gb.sdlt-standard",
      "gb.sdlt-first-time-buyer",
      "gb.sdlt-additional-surcharge",
      "gb.class4-main-rate",
      "gb.class4-upper-rate",
      "gb.class2-weekly-rate",
      "gb.vat-rates",
      "gb.personal-allowance-taper",
    ],
    metodo: "api-json",
    url: buscar("Overview of Tax Legislation and Rates"),
    traer(http) {
      return busquedaGovUk(http, this.url, /overview of tax legislation and rates|budget \d{4}/i);
    },
  },
  {
    id: "gb.benefit-uprating",
    carril: "norma",
    datos: ["gb.state-pension-full-weekly", "gb.child-benefit-rates", "gb.smp-standard-rate", "gb.ssp-weekly-rate"],
    metodo: "api-json",
    url: buscar("benefit and pension rates"),
    traer(http) {
      return busquedaGovUk(http, this.url, /benefit and pension rates \d{4} to \d{4}/i);
    },
  },
];
