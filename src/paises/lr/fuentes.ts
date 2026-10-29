import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-27";

// La tabla de cotizaciones del CBL es una vista de Drupal: cada fila trae la fecha en un <time
// datetime> y las columnas de compra y venta con la forma "L$169.2950/US$1.00".
async function cotizacion(http: Http, url: string, columna: "buying" | "selling"): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const puntos: PuntoSerie[] = [];
  for (const fila of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const f = /datetime="(\d{4}-\d{2}-\d{2})T/.exec(fila[1]);
    const v = new RegExp(`field-${columna}-us">\\s*L\\$([\\d.]+)/US\\$1\\.00`).exec(fila[1]);
    if (!f || !v || !esFechaISO(f[1])) continue;
    const valor = Number(v[1]);
    if (Number.isFinite(valor)) puntos.push({ fecha: f[1], valor });
  }
  if (puntos.length === 0) return null;
  return puntos.sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
}

// La página de leyes de la LRA lista cada reforma como "TAX AMENDMENT ACT OF <MES> <AÑO>". La
// última cargada es la de diciembre de 2025: un año posterior es una reforma nueva.
async function reformas(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const leyes = [...html.matchAll(/TAX AMENDMENT ACT OF ((?:[A-Z]+ )?(\d{4}))/gi)];
  if (leyes.length === 0) return null;
  const nuevas = new Set(leyes.filter((m) => Number(m[2]) > 2025).map((m) => m[1].toUpperCase()));
  return [...nuevas].map((t) => ({ titulo: `Tax Amendment Act of ${t}`, url, fecha: VERIFICADO }));
}

// Avisos de la LRA por la API de WordPress: interesan los posteriores a la verificación que hablan de
// tasas (GST, VAT, PIT, retenciones, impuesto inmobiliario o excise).
async function avisosLra(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const json = await http.json(url, { userAgentNavegador: true });
  if (!Array.isArray(json)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const p of json as { date?: unknown; link?: unknown; title?: { rendered?: unknown } }[]) {
    const fecha = typeof p.date === "string" ? p.date.slice(0, 10) : "";
    const titulo = typeof p.title?.rendered === "string" ? p.title.rendered : "";
    if (!esFechaISO(fecha) || typeof p.link !== "string" || !titulo) continue;
    if (fecha <= VERIFICADO) continue;
    if (/\b(GST|VAT|PIT|income tax|withholding|real property|excise|tax rate)/i.test(titulo)) hallazgos.push({ titulo, url: p.link, fecha });
  }
  return hallazgos;
}

// Las preguntas frecuentes de NASSCORP fijan las tasas de aporte. Si dejan de decir 4 % para la
// pensión o 2 % para accidentes de trabajo, algo cambió.
async function tasasNasscorp(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/National Pension Scheme/i.test(html)) return null;
  const pension = /contribute 4% monthly/i.test(html) && /4% of their monthly earnings/i.test(html);
  const riesgo = /contribute 2% monthly/i.test(html);
  if (pension && riesgo) return [];
  return [{ titulo: "NASSCORP FAQ no longer states 4% pension and 2% employment injury contributions", url, fecha: VERIFICADO }];
}

export const detectores: readonly Detector[] = [
  {
    id: "lr.cbl-usd-lrd-buying",
    carril: "serie",
    serie: "lr.usd-lrd-buying",
    metodo: "html",
    url: "https://www.cbl.org.lr/research/buying-selling-rates",
    userAgentNavegador: true,
    banda: { min: 120, max: 260, saltoRelativoMax: 0.05 },
    traer(http) {
      return cotizacion(http, this.url, "buying");
    },
  },
  {
    id: "lr.cbl-usd-lrd-selling",
    carril: "serie",
    serie: "lr.usd-lrd-selling",
    metodo: "html",
    url: "https://www.cbl.org.lr/research/buying-selling-rates",
    userAgentNavegador: true,
    banda: { min: 120, max: 260, saltoRelativoMax: 0.05 },
    traer(http) {
      return cotizacion(http, this.url, "selling");
    },
  },
  {
    id: "lr.lra-tax-laws",
    carril: "norma",
    datos: ["lr.pit-bands", "lr.gst-rate", "lr.excise-specific", "lr.withholding-rates", "lr.corporate-rates", "lr.presumptive-rates", "lr.non-cash-exemption"],
    metodo: "html",
    url: "https://revenue.lra.gov.lr/tax-laws-and-amendments/",
    userAgentNavegador: true,
    traer(http) {
      return reformas(http, this.url);
    },
  },
  {
    id: "lr.lra-notices",
    carril: "norma",
    datos: ["lr.gst-rate", "lr.pit-bands", "lr.withholding-rates", "lr.real-property-rates", "lr.excise-specific", "lr.small-turnover-limit"],
    metodo: "api-json",
    url: "https://revenue.lra.gov.lr/wp-json/wp/v2/posts?per_page=50&_fields=date,link,title",
    userAgentNavegador: true,
    traer(http) {
      return avisosLra(http, this.url);
    },
  },
  {
    id: "lr.nasscorp-faq",
    carril: "norma",
    datos: ["lr.nasscorp-employee", "lr.nasscorp-employer", "lr.nasscorp-injury", "lr.pension-base-rate", "lr.pension-increment", "lr.pension-min-months", "lr.pension-age"],
    metodo: "html",
    url: "https://nasscorp.org.lr/faq/",
    userAgentNavegador: true,
    traer(http) {
      return tasasNasscorp(http, this.url);
    },
  },
];
