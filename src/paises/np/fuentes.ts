import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const NRB_API = "https://www.nrb.org.np/api/forex/v1/rates";

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// La API del NRB exige from y to. Pedimos los últimos 12 días para cubrir feriados y fines de semana.
function urlNrb(): string {
  const hasta = new Date();
  const desde = new Date(hasta.getTime() - 12 * 86_400_000);
  return `${NRB_API}?page=1&per_page=20&from=${iso(desde)}&to=${iso(hasta)}`;
}

interface TasaNrb {
  currency?: { iso3?: string; unit?: number };
  buy?: string;
  sell?: string;
}

// Devuelve el precio por unidad de moneda extranjera, o por 100 si `por100` (la rupia india se cotiza por 100).
async function serieNrb(http: Http, moneda: string, lado: "buy" | "sell", por100: boolean): Promise<readonly PuntoSerie[] | null> {
  const json = (await http.json(urlNrb())) as { data?: { payload?: { date?: string; rates?: TasaNrb[] }[] } } | null;
  const dias = json?.data?.payload;
  if (!Array.isArray(dias)) return null;
  const puntos: PuntoSerie[] = [];
  for (const dia of dias) {
    const tasa = dia.rates?.find((r) => r.currency?.iso3 === moneda);
    const valor = Number(tasa?.[lado]);
    const unidad = tasa?.currency?.unit ?? 1;
    if (!dia.date || !esFechaISO(dia.date) || !Number.isFinite(valor) || !tasa) continue;
    puntos.push({ fecha: dia.date, valor: por100 ? (valor / unidad) * 100 : valor / unidad });
  }
  puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return puntos.length ? puntos : null;
}

function hoy(): FechaISO {
  return iso(new Date()) as FechaISO;
}

// Los avisos del IRD y del ministerio son listas de títulos en nepalí; si aparece un título con un año nuevo, la norma pudo cambiar.
async function titulosIrd(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!html.includes("आन्तरिक राजस्व विभाग")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const texto = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (/आ\.व\.\s*२०८[४-९]/.test(texto) && /दर/.test(texto)) hallazgos.push({ titulo: texto, url: new URL(m[1], url).toString(), fecha: hoy() });
  }
  return hallazgos;
}

async function remuneracionMinima(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/श्रम,?\s*रोजगार|moless/i.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const texto = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (texto.includes("न्यूनतम पारिश्रमिक") && !texto.includes("२०८२-०४-२")) hallazgos.push({ titulo: texto, url: new URL(m[1], url).toString(), fecha: hoy() });
  }
  return hallazgos;
}

async function procedimientoSsf(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!html.includes("सामाजिक सुरक्षा कोष")) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const texto = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (texto.includes("सामाजिक सुरक्षा योजना संचालन कार्यविधि") && !texto.includes("पाँचौ")) hallazgos.push({ titulo: texto, url: new URL(m[1], url).toString(), fecha: hoy() });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  {
    id: "np.usd-nrb",
    carril: "serie",
    serie: "np.usd",
    metodo: "api-json",
    url: `${NRB_API}?page=1&per_page=20`,
    banda: { min: 100, max: 220, saltoRelativoMax: 0.05 },
    traer(http) {
      return serieNrb(http, "USD", "buy", false);
    },
  },
  {
    id: "np.usd-sell-nrb",
    carril: "serie",
    serie: "np.usd-sell",
    metodo: "api-json",
    url: `${NRB_API}?page=1&per_page=20`,
    banda: { min: 100, max: 220, saltoRelativoMax: 0.05 },
    traer(http) {
      return serieNrb(http, "USD", "sell", false);
    },
  },
  {
    id: "np.inr-nrb",
    carril: "serie",
    serie: "np.inr",
    metodo: "api-json",
    url: `${NRB_API}?page=1&per_page=20`,
    banda: { min: 150, max: 170, saltoRelativoMax: 0.02 },
    traer(http) {
      return serieNrb(http, "INR", "buy", true);
    },
  },
  {
    id: "np.ird-tax-rates",
    carril: "norma",
    datos: [
      "np.income-tax-bands",
      "np.remote-area-allowance",
      "np.life-insurance-cap",
      "np.health-insurance-cap",
      "np.house-insurance-cap",
      "np.retirement-deduction-cap",
      "np.retirement-deduction-share",
      "np.women-salary-rebate",
      "np.capital-gains-rate",
      "np.turnover-fixed-tax",
      "np.turnover-rate-3-5m",
      "np.turnover-rate-5-10m",
      "np.vat",
    ],
    metodo: "html",
    url: "https://ird.gov.np/category/taxrateincentives/",
    userAgentNavegador: true,
    traer(http) {
      return titulosIrd(http, this.url);
    },
  },
  {
    id: "np.moless-minimum-wage",
    carril: "norma",
    datos: ["np.minimum-wage"],
    metodo: "html",
    url: "https://www.moless.gov.np/",
    userAgentNavegador: true,
    traer(http) {
      return remuneracionMinima(http, this.url);
    },
  },
  {
    id: "np.ssf-procedure",
    carril: "norma",
    datos: ["np.ssf-employee-rate", "np.ssf-employer-rate", "np.ssf-split"],
    metodo: "html",
    url: "https://ssf.gov.np/list/act_regulation",
    userAgentNavegador: true,
    traer(http) {
      return procedimientoSsf(http, this.url);
    },
  },
];
