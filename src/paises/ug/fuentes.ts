import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";
const ULII_EA = "https://media.ulii.org/media/legislation/111709/source_file/ae0785212ae9a6b7/2006-6.pdf";
const ULII_ITA = "https://media.ulii.org/media/legislation/112783/source_file/b86ae504ea791920/1997-11.pdf";

// Las páginas de URA y del NSSF no publican fecha de actualización. Se controla que sigan diciendo lo
// que leímos; si un texto clave desaparece, la tasa puede haber cambiado y hay que volver a leerla.
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
    id: "ug.usd-bou",
    carril: "serie",
    serie: "ug.usd",
    // Manual: el Banco de Uganda publica la tasa del día solo en un XLSX (OPENING RATES) y en un
    // tablero de Power BI. El Http del cron devuelve texto, así que el punto se carga a mano.
    metodo: "manual",
    url: "https://bou.or.ug/interest_rates_exchange_rates",
    banda: { min: 3000, max: 6000, saltoRelativoMax: 0.05 },
    async traer() {
      return null;
    },
  },
  {
    id: "ug.inflation-ubos",
    carril: "serie",
    serie: "ug.inflation",
    // Manual: los comunicados mensuales de UBOS son PDF escaneados, sin texto que leer.
    metodo: "manual",
    url: "https://www.ubos.org/explore-statistics/31/",
    // Es una variación anual en puntos: puede moverse más de medio punto de un mes a otro.
    banda: { min: -5, max: 30, saltoRelativoMax: 0.6 },
    async traer() {
      return null;
    },
  },
  {
    // La página de membresía del NSSF dice en una oración cuánto descuenta el empleador y cuánto
    // aporta. Si la oración cambia, hay que volver a leer las tasas.
    id: "ug.nssf-membership",
    carril: "norma",
    datos: ["ug.nssf-employee", "ug.nssf-employer"],
    metodo: "html",
    url: "https://www.nssfug.org/about-us/membership/",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const m = /deduct (\d+(?:\.\d+)?)% from the employee.{0,80}?add (\d+(?:\.\d+)?)%/i.exec(texto);
      if (!m) return null;
      if (m[1] === "5" && m[2] === "10") return [];
      return [{ titulo: `NSSF rates now ${m[1]}% and ${m[2]}%`, url: this.url, fecha: VERIFICADO }];
    },
  },
  vigila(
    "ug.nssf-midterm",
    "https://www.nssfug.org/benefits-products/benefits/benefits-midterm/",
    ["ug.nssf-midterm-share", "ug.nssf-midterm-share-disability", "ug.nssf-midterm-age", "ug.nssf-midterm-age-disability", "ug.nssf-midterm-years"],
    ["20 percent", "50 per cent", "forty-five years", "forty years", "at least 10 years"],
    "NSSF midterm benefit",
  ),
  vigila("ug.ura-paye", "https://ura.go.ug/en/domestic-taxes/paye-rates/", ["ug.paye-bands", "ug.paye-bands-non-resident"], ["335,000", "410,000", "485,000", "33,750", "48,500", "10,000,000"], "URA PAYE rates"),
  vigila("ug.ura-vat", "https://ura.go.ug/en/value-added-tax-vat/", ["ug.vat"], ["VAT charged is 18%"], "URA VAT page"),
  vigila(
    "ug.ura-rental",
    "https://ura.go.ug/en/rental-income-tax-4/",
    ["ug.rental-tax-rate", "ug.rental-tax-threshold", "ug.company-tax-rate", "ug.rental-expense-cap"],
    ["2,820,000", "rental income tax at 12%", "= 30/100 x","50% of the annual gross rental income"],
    "URA rental income tax",
  ),
  vigila(
    "ug.ura-small-business",
    "https://ura.go.ug/en/taxes-on-small-businesses/",
    ["ug.presumptive-records", "ug.presumptive-no-records", "ug.presumptive-ceiling"],
    ["0.4% of annual turnover", "0.5% of annual turnover", "0.6% of annual turnover", "0.7% of annual turnover", "900,000", "150 million"],
    "URA small business tax",
  ),
  {
    // La lista de proyectos de ley tributarios del Parlamento cambia con cada presupuesto; un
    // proyecto de un año posterior anticipa cambios en PAYE, rental tax o retenciones.
    id: "ug.parliament-tax-bills",
    carril: "norma",
    datos: ["ug.paye-bands", "ug.paye-bands-non-resident", "ug.rental-tax-rate", "ug.rental-tax-threshold", "ug.company-tax-rate", "ug.wht-rates", "ug.stamp-duty-transfer"],
    metodo: "html",
    url: "https://www.parliament.go.ug/page/tax-bills-2026",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const anios = [...html.matchAll(/Income%20Tax%20\(Amendment\)%20Bill%2C%20(20\d{2})/g)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const ultimo = Math.max(...anios);
      const fecha = `${ultimo}-07-01`;
      if (ultimo <= 2026 || !esFechaISO(fecha) || fecha <= VERIFICADO) return [];
      return [{ titulo: `Income Tax (Amendment) Bill, ${ultimo}`, url: this.url, fecha }];
    },
  },
  // Los textos de ley de ULII (Employment Act, Income Tax Act) son PDF fijos y las páginas de cada ley
  // responden 403 al cron; la Ley de gobiernos locales de 2008 solo está escaneada. Se revisan a mano.
  manual("ug.employment-act", ULII_EA, [
    "ug.leave-days-per-4-months",
    "ug.leave-min-months",
    "ug.maternity-days",
    "ug.paternity-days",
    "ug.weekly-hours",
    "ug.overtime-normal",
    "ug.overtime-holiday",
    "ug.notice-weeks-under-1y",
    "ug.notice-months-1-5y",
    "ug.notice-months-5-10y",
    "ug.notice-months-10y",
    "ug.severance-months-per-year",
    "ug.severance-min-months",
    "ug.sick-full-pay-months",
    "ug.sick-half-pay-months",
  ]),
  manual("ug.income-tax-act", ULII_ITA, ["ug.wht-rates", "ug.wht-goods-threshold"]),
  manual("ug.local-service-tax", "https://faolex.fao.org/docs/pdf/uga151713.pdf", ["ug.lst-bands"]),
];
