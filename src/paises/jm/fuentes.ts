import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";
const MESES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function textoPlano(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
}

// Las páginas de TAJ, MLSS, NHT y JIS no publican fecha de actualización. Se controla que sigan diciendo
// lo que leímos; si un texto clave desaparece, el dato puede haber cambiado y hay que volver a leerlo.
function vigila(id: string, url: `https://${string}`, datos: readonly string[], textos: readonly string[], titulo: string): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url,
    userAgentNavegador: true,
    async traer(http) {
      const texto = textoPlano(await http.texto(this.url, { userAgentNavegador: true }));
      if (texto.length < 1500) return null;
      const faltan = textos.filter((t) => !texto.includes(t));
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

// La portada del BOJ trae la tabla «Foreign Exchange Rates» (tablepress-1) con la fecha del último día
// hábil («23 Oct 26») y las tasas promedio ponderadas de compra y venta de cada moneda.
async function dolarBoj(http: Http, url: string, columna: 0 | 1): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const tabla = /<table id="tablepress-1"[\s\S]*?<\/table>/.exec(html)?.[0];
  if (!tabla) return null;
  const celdas = [...tabla.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const f = /^(\d{1,2}) ([A-Z][a-z]{2}) (\d{2})$/.exec(celdas.find((c) => /^\d{1,2} [A-Z][a-z]{2} \d{2}$/.test(c)) ?? "");
  const i = celdas.indexOf("USD");
  if (!f || i < 0) return null;
  const mes = MESES.indexOf(f[2]) + 1;
  const fecha = `20${f[3]}-${String(mes).padStart(2, "0")}-${f[1].padStart(2, "0")}`;
  const valor = Number(celdas[i + 1 + columna]);
  if (mes < 1 || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
  return [{ fecha, valor }];
}

export const detectores: readonly Detector[] = [
  {
    id: "jm.usd-sell-boj",
    carril: "serie",
    serie: "jm.usd-sell",
    metodo: "html",
    url: "https://boj.org.jm/",
    userAgentNavegador: true,
    banda: { min: 120, max: 220, saltoRelativoMax: 0.05 },
    async traer(http) {
      return dolarBoj(http, this.url, 1);
    },
  },
  {
    id: "jm.usd-buy-boj",
    carril: "serie",
    serie: "jm.usd-buy",
    metodo: "html",
    url: "https://boj.org.jm/",
    userAgentNavegador: true,
    banda: { min: 120, max: 220, saltoRelativoMax: 0.05 },
    async traer(http) {
      return dolarBoj(http, this.url, 0);
    },
  },
  {
    id: "jm.inflation-statin",
    carril: "serie",
    serie: "jm.inflation",
    // Manual: la tasa interanual solo está en el PDF de cada comunicado de STATIN; la página de
    // comunicados trae la variación mensual y la tabla de índices se carga en un iframe de terceros.
    metodo: "manual",
    url: "https://statinja.gov.jm/PressReleases.aspx?field1=cpi",
    // Es una variación anual en puntos: puede moverse más de medio punto de un mes a otro.
    banda: { min: -5, max: 30, saltoRelativoMax: 0.6 },
    async traer() {
      return null;
    },
  },
  {
    // La guía de nómina de TAJ se reemplaza por otro PDF cuando cambian las tasas; el nombre del archivo
    // lleva la fecha («Dec2025»). Si el enlace cambia, hay que leer la guía nueva.
    id: "jm.taj-payroll-guide",
    carril: "norma",
    datos: [
      "jm.nis-employee-rate",
      "jm.nis-employer-rate",
      "jm.nis-ceiling",
      "jm.nht-employee-rate",
      "jm.nht-employer-rate",
      "jm.education-tax-employee-rate",
      "jm.education-tax-employer-rate",
      "jm.heart-rate",
      "jm.heart-payroll-threshold",
    ],
    metodo: "html",
    url: "https://www.jamaicatax.gov.jm/web/guest/payroll",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const guias = [...html.matchAll(/Pay\+Roll\+Taxes\+and\+Contribution\+Rates[^"/]*?_([A-Za-z]{3}\d{4})\.pdf/g)].map((m) => m[1]);
      if (!guias.length) return null;
      return guias.every((g) => g === "Dec2025") ? [] : [{ titulo: `New TAJ payroll guide (${guias.join(", ")})`, url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    // Un advisory nuevo sobre el umbral («Threshold») anticipa un cambio del PAYE.
    id: "jm.taj-threshold-advisories",
    carril: "norma",
    datos: ["jm.paye-threshold-monthly", "jm.income-tax-threshold", "jm.age-exemption", "jm.pension-exemption"],
    metodo: "html",
    url: "https://www.jamaicatax.gov.jm/web/guest/tax-bulletins",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const advisories = [...html.matchAll(/href="([^"]*Threshold[^"]*\.pdf[^"]*)"/gi)].map((m) => m[1]);
      if (!advisories.length) return null;
      const nuevos = advisories.filter((a) => !/gct/i.test(a) && !a.includes("Technical_Advisory_Threshold+_042025") && !/(?:2008|2009|2014|2015|2016|2019|2024)/.test(a));
      return nuevos.map((a) => ({ titulo: "New TAJ threshold advisory", url: a.startsWith("http") ? a : `https://www.jamaicatax.gov.jm${a}`, fecha: VERIFICADO }));
    },
  },
  vigila("jm.taj-gct", "https://www.jamaicatax.gov.jm/general-consumption-tax1", ["jm.gct-standard"], ["April 2020 15.0%"], "TAJ GCT page"),
  vigila(
    "jm.taj-rates-and-fees",
    "https://www.jamaicatax.gov.jm/rates-and-fees",
    ["jm.transfer-tax-rate", "jm.stamp-duty-high", "jm.stamp-duty-low", "jm.stamp-duty-band", "jm.stamp-duty-mortgage-surcharge"],
    ["Transfer Tax 2% of market value", "Consideration above or equal to $500,000 = Stamp Duty of $5,000", "surcharge (1/4 of Stamp Duty"],
    "TAJ Rates and Fees",
  ),
  {
    // La página de la rama de salarios del MLSS lista las órdenes de salario mínimo. Una orden de un año
    // posterior a 2026 trae un salario mínimo nuevo.
    id: "jm.mlss-minimum-wage-orders",
    carril: "norma",
    datos: ["jm.minimum-wage-weekly", "jm.minimum-wage-hourly"],
    metodo: "html",
    url: "https://www.mlss.gov.jm/departments/pay-and-conditions-of-employment-branch/",
    userAgentNavegador: true,
    async traer(http) {
      const texto = textoPlano(await http.texto(this.url, { userAgentNavegador: true }));
      const anios = [...texto.matchAll(/National Minimum Wage \(Amendment\) Order, (20\d{2})/g)].map((m) => Number(m[1]));
      if (!anios.length) return null;
      const ultimo = Math.max(...anios);
      if (ultimo <= 2026) return [];
      return [{ titulo: `National Minimum Wage (Amendment) Order, ${ultimo}`, url: this.url, fecha: VERIFICADO }];
    },
  },
  vigila(
    "jm.nht-interest-rates",
    "https://www.nht.gov.jm/index.php/loans",
    ["jm.nht-interest-rates", "jm.nht-max-years"],
    ["Minimum wage to $30,000.99", "$30,001 to $42,000.99", "$42,001 to $100,000.99", "$100,001 and above"],
    "NHT loans page",
  ),
  vigila("jm.nht-loan-limits", "https://www.nht.gov.jm/index.php/loan-limits", ["jm.nht-open-market-limit"], ["$9 Million"], "NHT loan limits"),
  vigila(
    "jm.jis-labour-laws",
    "https://jis.gov.jm/labour-laws/",
    ["jm.notice-weeks", "jm.employee-notice-weeks"],
    ["2 weeks' notice if employed for less than 5 years", "12 weeks' notice for 20 or more years"],
    "JIS labour laws summary",
  ),
  // El resumen del MLSS (2024) y el folleto de property tax de TAJ (2022) son PDF fijos. El texto de las
  // leyes está en laws.moj.gov.jm, hoy en mantenimiento. Se revisan a mano.
  manual("jm.mlss-labour-summary", "https://www.mlss.gov.jm/wp-content/uploads/2024/07/Labour-Management-Procedures-LMP-JAMAICA-SPIRO-FINAL.pdf", [
    "jm.normal-week-hours",
    "jm.overtime-multiplier",
    "jm.double-time-multiplier",
    "jm.vacation-min-days",
    "jm.vacation-full-days",
    "jm.leave-days-per",
    "jm.vacation-weeks",
    "jm.vacation-weeks-long-service",
    "jm.vacation-long-service-years",
    "jm.sick-leave-weeks",
    "jm.sick-leave-first-months",
    "jm.maternity-leave-weeks",
    "jm.maternity-paid-weeks",
    "jm.maternity-qualifying-weeks",
    "jm.maternity-extension-weeks",
    "jm.maternity-paid-times",
  ]),
  manual("jm.taj-property-tax", "https://www.jamaicatax.gov.jm/web/guest/property-tax-hub1", [
    "jm.property-tax-bands",
    "jm.property-tax-bands-over-30m",
    "jm.property-tax-minimum",
    "jm.property-tax-split",
  ]),
  manual("jm.moj-employment-termination-act", "https://laws.moj.gov.jm/library/statute/the-employment-termination-etc-act", [
    "jm.redundancy-weeks-first-10",
    "jm.redundancy-weeks-after-10",
    "jm.redundancy-qualifying-weeks",
  ]),
  manual("jm.taj-income-tax-rates", "https://www.jamaicatax.gov.jm/rates-and-fees", [
    "jm.income-tax-rate",
    "jm.income-tax-higher-rate",
    "jm.income-tax-higher-band",
    "jm.income-tax-higher-band-monthly",
  ]),
];
