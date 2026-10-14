import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";

const MESES: Readonly<Record<string, string>> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", sept: "09", oct: "10", nov: "11", dec: "12",
};

function fechaIngles(texto: string): FechaISO | null {
  const m = /^([A-Za-z]+)\.?\s+(\d{1,2}),\s+(\d{4})$/.exec(texto.trim());
  if (!m) return null;
  const nombre = m[1].toLowerCase();
  const mes = MESES[nombre] ?? MESES[nombre.slice(0, 3)];
  if (!mes) return null;
  const iso = `${m[3]}-${mes}-${m[2].padStart(2, "0")}`;
  return esFechaISO(iso) ? iso : null;
}

async function cpiBls(http: Http): Promise<PuntoSerie[] | null> {
  const json = await http.json("https://api.bls.gov/publicAPI/v1/timeseries/data/CUUR0000SA0");
  if (typeof json !== "object" || json === null) return null;
  const r = json as { status?: unknown; Results?: { series?: { data?: unknown }[] } };
  const datos = r.Results?.series?.[0]?.data;
  if (r.status !== "REQUEST_SUCCEEDED" || !Array.isArray(datos)) return null;
  const puntos: PuntoSerie[] = [];
  for (const d of datos as { year?: unknown; period?: unknown; value?: unknown }[]) {
    if (typeof d.period !== "string" || !/^M(0[1-9]|1[0-2])$/.test(d.period)) continue;
    const fecha = `${String(d.year)}-${d.period.slice(1)}-01`;
    const valor = typeof d.value === "string" ? Number(d.value) : NaN;
    if (!esFechaISO(fecha)) return null;
    // BLS publica "-" en los meses sin dato (octubre de 2025 por el cierre del gobierno): se saltean.
    if (!Number.isFinite(valor)) continue;
    puntos.push({ fecha, valor });
  }
  return puntos.length ? puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1)) : null;
}

const PATRON_IRS = /inflation adjustments|tax year 20\d\d|standard mileage|401\(k\)|contribution limit|health savings account|\bHSA\b|child tax credit|standard deduction/i;

async function noticiasIrs(http: Http): Promise<HallazgoNorma[] | null> {
  const html = await http.texto("https://www.irs.gov/newsroom/news-releases-for-current-month");
  if (!html.includes("field_pup_media_document_teaser")) return null;
  const salida: HallazgoNorma[] = [];
  const re = /<h2>\s*<a href="(\/newsroom\/[^"]+)"[^>]*>\s*<span>([^<]+)<\/span>[\s\S]*?IR-\d{4}-\d+,\s*([A-Za-z]+\.?\s+\d{1,2},\s+\d{4})/g;
  for (const m of html.matchAll(re)) {
    const fecha = fechaIngles(m[3]);
    if (fecha && PATRON_IRS.test(m[2])) salida.push({ titulo: m[2].trim(), url: `https://www.irs.gov${m[1]}`, fecha });
  }
  return salida;
}

async function determinacionesSsa(http: Http): Promise<HallazgoNorma[] | null> {
  const url =
    "https://www.federalregister.gov/api/v1/documents.json?conditions%5Bterm%5D=%22Cost-of-Living+Increase+and+Other+Determinations%22&conditions%5Bagencies%5D%5B%5D=social-security-administration&order=newest&per_page=3&fields%5B%5D=title&fields%5B%5D=publication_date&fields%5B%5D=html_url";
  const json = await http.json(url);
  if (typeof json !== "object" || json === null) return null;
  const resultados = (json as { results?: unknown }).results;
  if (!Array.isArray(resultados)) return null;
  const salida: HallazgoNorma[] = [];
  for (const r of resultados as { title?: unknown; publication_date?: unknown; html_url?: unknown }[]) {
    if (typeof r.title !== "string" || typeof r.html_url !== "string" || typeof r.publication_date !== "string" || !esFechaISO(r.publication_date)) return null;
    if (/for 20(2[7-9]|[3-9]\d)\b/.test(r.title)) salida.push({ titulo: r.title, url: r.html_url, fecha: r.publication_date });
  }
  return salida;
}

async function minimosDol(http: Http): Promise<HallazgoNorma[] | null> {
  const url = "https://www.dol.gov/agencies/whd/minimum-wage/state";
  // El sitio del DOL corta los pedidos sin un User-Agent de navegador (Akamai, probado el 14/10/2026).
  const html = await http.texto(url, { userAgentNavegador: true });
  const m = /Updated\s+([A-Za-z]+\.?\s+\d{1,2},\s+\d{4})/.exec(html);
  if (!m) return null;
  const fecha = fechaIngles(m[1]);
  if (!fecha) return null;
  return fecha > "2026-07-01" ? [{ titulo: `State minimum wage table updated ${m[1]}`, url, fecha }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "us.bls-cpi-u",
    carril: "serie",
    serie: "us.cpi-u",
    metodo: "api-json",
    url: "https://api.bls.gov/publicAPI/v1/timeseries/data/CUUR0000SA0",
    banda: { min: 250, max: 450, saltoRelativoMax: 0.02 },
    traer: cpiBls,
  },
  {
    id: "us.irs-news-releases",
    carril: "norma",
    datos: [
      "us.tax-brackets-single",
      "us.standard-deduction",
      "us.ctc-amount",
      "us.cg-zero-max",
      "us.401k-limit",
      "us.ira-limit",
      "us.hsa-self-only",
      "us.mileage-business",
    ],
    metodo: "html",
    url: "https://www.irs.gov/newsroom/news-releases-for-current-month",
    traer: noticiasIrs,
  },
  {
    id: "us.ssa-determinations",
    carril: "norma",
    datos: ["us.social-security-wage-base", "us.pia-formula"],
    metodo: "api-json",
    url: "https://www.federalregister.gov/api/v1/documents.json",
    traer: determinacionesSsa,
  },
  {
    id: "us.dol-state-minimum-wage",
    carril: "norma",
    datos: ["us.min-wage-state", "us.min-wage-federal"],
    metodo: "html",
    url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
    userAgentNavegador: true,
    traer: minimosDol,
  },
];
