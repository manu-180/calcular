import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";
const EMPLEO = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/" as const;
const MESES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Los dos sitios (SRC y SPF) son WordPress y publican un feed RSS con fecha en cada nota.
async function feed(http: Http, url: string, patron: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const xml = await http.texto(url, { userAgentNavegador: true });
  if (!xml.includes("<rss")) return null;
  const salida: HallazgoNorma[] = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const titulo = /<title>([\s\S]*?)<\/title>/.exec(m[1])?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    const enlace = /<link>([\s\S]*?)<\/link>/.exec(m[1])?.[1]?.trim();
    const f = /<pubDate>\w{3}, (\d{2}) (\w{3}) (\d{4})/.exec(m[1]);
    const mes = f ? MESES.indexOf(f[2]) + 1 : 0;
    if (!titulo || !enlace || !f || mes === 0) continue;
    const fecha = `${f[3]}-${String(mes).padStart(2, "0")}-${f[1]}` as FechaISO;
    if (fecha > VERIFICADO && patron.test(titulo)) salida.push({ titulo, url: enlace, fecha });
  }
  return salida;
}

// El ministerio es Joomla y cuelga cada norma como un enlace /<categoria>/<slug>/download.
// El año del slug más alto que el último que leímos es una norma nueva.
async function normasEmpleo(http: Http, categoria: string, ultimo: number, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const url = EMPLEO + categoria;
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/Ministry of Employment/i.test(html)) return null;
  const enlaces = [...html.matchAll(/href="[^"]*\/employment-acts-and-regulations\/[^"/]+\/download"/g)].map((m) => m[0]);
  const anios = enlaces.flatMap((e) => [...e.matchAll(/(?:^|[^\d])(20\d{2})(?!\d)/g)].map((x) => Number(x[1])));
  if (!anios.length) return null;
  const nueva = Math.max(...anios);
  return nueva > ultimo ? [{ titulo: `${titulo} ${nueva}`, url, fecha: VERIFICADO }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "sc.spf-notices",
    carril: "norma",
    datos: ["sc.spf-employee-rate", "sc.spf-employer-rate", "sc.spf-self-employed-rate"],
    metodo: "html",
    url: "https://pensionfund.sc/feed/",
    userAgentNavegador: true,
    traer(http) {
      return feed(http, this.url, /contribution|retirement age|rate/i);
    },
  },
  {
    id: "sc.src-notices",
    carril: "norma",
    datos: [
      "sc.income-tax-bands",
      "sc.vat-rate",
      "sc.vat-threshold",
      "sc.business-tax-sole-trader",
      "sc.business-tax-company",
      "sc.presumptive-tax-rate",
      "sc.property-tax-rate",
      "sc.withholding-rates",
    ],
    metodo: "html",
    url: "https://src.gov.sc/feed/",
    userAgentNavegador: true,
    traer(http) {
      return feed(http, this.url, /tax|vat|rate|threshold|budget/i);
    },
  },
  {
    id: "sc.minimum-wage-regulations",
    carril: "norma",
    datos: ["sc.min-wage-hourly", "sc.min-wage-hourly-casual"],
    metodo: "html",
    url: `${EMPLEO}national-minimum-wage-regulations-amendments` as const,
    userAgentNavegador: true,
    async traer(http) {
      return normasEmpleo(http, "national-minimum-wage-regulations-amendments", 2025, "New national minimum wage regulations");
    },
  },
  {
    id: "sc.conditions-of-employment",
    carril: "norma",
    datos: [
      "sc.annual-leave-days",
      "sc.sick-paid-days",
      "sc.maternity-paid-weeks",
      "sc.paternity-working-days",
      "sc.overtime-weekday-factor",
      "sc.overtime-holiday-factor",
      "sc.holiday-pay-factor",
    ],
    metodo: "html",
    url: `${EMPLEO}conditions-of-employment-regulations-amendments` as const,
    userAgentNavegador: true,
    async traer(http) {
      return normasEmpleo(http, "conditions-of-employment-regulations-amendments", 2019, "New conditions of employment regulations");
    },
  },
  {
    id: "sc.employment-act-amendments",
    carril: "norma",
    datos: [
      "sc.compensation-days-per-month",
      "sc.notice-months-standard",
      "sc.thirteenth-limit",
      "sc.probation-max-months",
    ],
    metodo: "html",
    url: `${EMPLEO}employment-act-amendments` as const,
    userAgentNavegador: true,
    async traer(http) {
      return normasEmpleo(http, "employment-act-amendments", 2023, "New Employment Act amendment");
    },
  },
];
