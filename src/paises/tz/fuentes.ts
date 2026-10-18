import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-17";
const TRA = "https://www.tra.go.tz/page/";
const MESES = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const MES_CORTO: Record<string, string> = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

// La tabla del BoT trae cada moneda con compra, venta, media y la fecha de operación ("18-Oct-26").
async function dolarBot(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = />USD<\/td>\s*<td[^>]*>[\d.,]+<\/td>\s*<td[^>]*>[\d.,]+<\/td>\s*<td[^>]*>([\d.,]+)<\/td>\s*<td[^>]*>(\d{2})-([A-Za-z]{3})-(\d{2})<\/td>/.exec(html);
  if (!m || !MES_CORTO[m[3]]) return null;
  const fecha = `20${m[4]}-${MES_CORTO[m[3]]}-${m[2]}`;
  const valor = Number(m[1].replace(/,/g, ""));
  if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

// El BoT fija la CBR por trimestre y la portada la muestra como "6.25% … 4th Quarter 2026".
async function cbrBot(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = (await http.texto(url, { userAgentNavegador: true })).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const m = /Central Bank Rate\s+([\d.]+)%\s+(\d)(?:st|nd|rd|th) Quarter (\d{4})/.exec(html);
  if (!m) return null;
  const fecha = `${m[3]}-${String((Number(m[2]) - 1) * 3 + 1).padStart(2, "0")}-01`;
  const valor = Number(m[1]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

async function inflacionNbs(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = /Annual Headline Inflation Rate for ([A-Za-z]+),? (\d{4})[^%<]*?(\d+(?:\.\d+)?)(?:%| percent)/i.exec(html);
  if (!m) return null;
  const mes = MESES.indexOf(m[1].toUpperCase()) + 1;
  const fecha = `${m[2]}-${String(mes).padStart(2, "0")}-01`;
  const valor = Number(m[3]);
  if (mes === 0 || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

// Las páginas de TRA y de los fondos no publican fecha. Se controla que sigan diciendo lo que leímos;
// si un texto clave desaparece, la tasa puede haber cambiado y hay que volver a leerla.
function vigila(id: string, url: `https://${string}`, datos: readonly string[], textos: readonly string[], titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const html = (await http.texto(this.url, { userAgentNavegador: true })).replace(/\s+/g, " ");
      if (html.length < 2000) return null;
      const faltan = textos.filter((t) => !html.includes(t));
      return faltan.length ? [{ titulo: `${titulo}: no longer shows ${faltan.join(", ")}`, url: this.url, fecha: VERIFICADO }] : [];
    },
  };
}

function manual(id: string, url: `https://${string}`, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "manual",
    url,
    async traer(): Promise<readonly HallazgoNorma[]> {
      return [];
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "tz.usd-bot",
    carril: "serie",
    serie: "tz.usd",
    metodo: "html",
    url: "https://www.bot.go.tz/ExchangeRate/excRates",
    userAgentNavegador: true,
    banda: { min: 1500, max: 5000, saltoRelativoMax: 0.05 },
    traer(http) {
      return dolarBot(http, this.url);
    },
  },
  {
    id: "tz.cbr-bot",
    carril: "serie",
    serie: "tz.cbr",
    metodo: "html",
    url: "https://www.bot.go.tz/?lang=en",
    userAgentNavegador: true,
    banda: { min: 2, max: 20, saltoRelativoMax: 0.25 },
    traer(http) {
      return cbrBot(http, this.url);
    },
  },
  {
    id: "tz.inflation-nbs",
    carril: "serie",
    serie: "tz.inflation",
    metodo: "html",
    url: "https://www.nbs.go.tz/",
    userAgentNavegador: true,
    // Es una variación anual en puntos: puede moverse más de medio punto de un mes a otro.
    banda: { min: -5, max: 30, saltoRelativoMax: 0.6 },
    traer(http) {
      return inflacionNbs(http, this.url);
    },
  },
  // TRA responde con un encabezado Content-Security-Policy partido en varias líneas, que el parser
  // estricto de Node rechaza (HPE_INVALID_HEADER_TOKEN). Hasta que el motor tenga un modo tolerante,
  // sus páginas se revisan a mano.
  manual("tz.tra-individuals", `${TRA}income-tax-for-individuals`, [
    "tz.paye-bands",
    "tz.presumptive-threshold",
    "tz.presumptive-ceiling",
    "tz.presumptive-top-rate",
    "tz.presumptive-band-1-limit",
    "tz.presumptive-band-2-limit",
    "tz.presumptive-band-1-incomplete",
    "tz.presumptive-band-2-incomplete",
    "tz.presumptive-band-2-base",
    "tz.presumptive-complete-rate",
    "tz.presumptive-transport",
  ]),
  manual("tz.tra-paye", `${TRA}pay-as-you-earn`, ["tz.non-resident-employee-rate"]),
  manual("tz.tra-sdl", `${TRA}skills-development-levy-sdl`, ["tz.sdl-rate", "tz.sdl-min-employees"]),
  manual("tz.tra-vat", `${TRA}value-added-tax-vat`, ["tz.vat", "tz.vat-electronic", "tz.vat-threshold"]),
  manual("tz.tra-wht", `${TRA}withholding-tax`, ["tz.wht-resident", "tz.wht-non-resident"]),
  manual("tz.tra-cgt", `${TRA}capital-gains-tax`, [
    "tz.cgt-land-resident",
    "tz.cgt-land-non-resident",
    "tz.cgt-land-no-records",
    "tz.cgt-residence-exempt-gain",
  ]),
  manual("tz.tra-stamp", `${TRA}stamp-duty`, ["tz.stamp-lease-rate", "tz.stamp-share-transfer-rate", "tz.stamp-agreement", "tz.stamp-memorandum"]),
  manual("tz.tra-penalties", `${TRA}interest-penalties-offences`, [
    "tz.late-filing-rate",
    "tz.late-filing-points-individual",
    "tz.late-filing-points-company",
    "tz.currency-point",
  ]),
  manual("tz.tra-motor", `${TRA}motor`, ["tz.vehicle-licence-fee", "tz.vehicle-hiv-levy", "tz.vehicle-registration-tax", "tz.vehicle-transfer-fee"]),
  vigila("tz.nssf-contributions", "https://www.nssf.go.tz/pages/payment-of-contributions", ["tz.nssf-rate", "tz.nssf-employee-max", "tz.nssf-late-penalty"], ["20% of the employees", "10% of his monthly wage"], "NSSF contribution page changed"),
  vigila("tz.nssf-pension", "https://www.nssf.go.tz/benefits/old-age-pension", [
    "tz.nssf-pension-divisor",
    "tz.nssf-pension-years",
    "tz.nssf-commuted-share",
    "tz.nssf-min-contributions",
    "tz.nssf-max-pension",
  ], ["1/580", "12.5*33%", "180 monthly contributions"], "NSSF pension page changed"),
  vigila("tz.nssf-maternity", "https://www.nssf.go.tz/benefits/maternity-benefits", ["tz.nssf-maternity-days"], ["AIDE x 28 Days", "AIDE x 56 Days"], "NSSF maternity page changed"),
  vigila("tz.wcf-rate", "https://www.wcf.go.tz/", ["tz.wcf-rate"], ["0.5%"], "WCF homepage no longer shows the contribution rate"),
  vigila("tz.heslb", "https://www.heslb.go.tz/loanrepayment/about-loan-repayment", ["tz.heslb-rate"], ["15% deductions"], "HESLB repayment page changed"),
  // TanzLII está detrás del desafío anti-bots de Cloudflare: la orden de salarios y la ley laboral se
  // revisan a mano.
  manual("tz.wage-order", "https://tanzlii.org/en/akn/tz/act/gn/2025/605a/eng@2025-10-13", ["tz.minimum-wage-monthly", "tz.minimum-wage-daily", "tz.minimum-wage-hourly"]),
  manual("tz.elra", "https://tanzlii.org/en/akn/tz/act/2004/6/eng@2023-12-31", [
    "tz.annual-leave-days",
    "tz.sick-full-days",
    "tz.sick-half-days",
    "tz.maternity-days",
    "tz.maternity-days-multiple",
    "tz.paternity-days",
    "tz.notice-first-month",
    "tz.notice-daily-weekly",
    "tz.notice-monthly",
    "tz.severance-days",
    "tz.severance-max-years",
    "tz.overtime-factor",
    "tz.night-premium",
    "tz.ordinary-week-hours",
  ]),
];
