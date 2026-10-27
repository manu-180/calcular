import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";

const MESES: Readonly<Record<string, string>> = {
  January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
  July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
};

// La portada del المركز الوطني للإحصاء والمعلومات trae embebido el JSON de sus indicadores clave; el
// de inflación lleva la variación interanual y el mes en inglés («September 2026»).
async function inflacionNcsi(http: Http, url: string): Promise<readonly PuntoSerie[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  const bloque = /\{[^{}]*"indicator_title_en":"Inflation"[^{}]*\}/.exec(html)?.[0];
  if (!bloque) return null;
  const valor = Number(/"indicator_value":"(-?\d+(?:\.\d+)?)"/.exec(bloque)?.[1]);
  const mes = /"indicator_sub_title_en":"([A-Za-z]+) (\d{4})"/.exec(bloque);
  if (!Number.isFinite(valor) || !mes || !MESES[mes[1]]) return null;
  const fecha = `${mes[2]}-${MESES[mes[1]]}-01`;
  return esFechaISO(fecha) ? [{ fecha, valor }] : null;
}

// La biblioteca de leyes de وزارة العدل والشؤون القانونية lista los reales decretos nuevos primero. Un
// decreto que nombra una de las leyes que usan las calculadoras y no es el que ya se leyó es una
// reforma o un reglamento que hay que revisar a mano.
const LEIDOS = new Set(["53/2023", "52/2023", "50/2023", "121/2020"]);

async function decretosNuevos(http: Http, url: string, temas: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/مرسوم سلطاني/.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(/laws\/ar\/1\/show\/(\d+)'>([^<]+)</g)) {
    const texto = m[2].replace(/\s+/g, " ").trim();
    if (!temas.test(texto)) continue;
    const n = /رقم\s*(\d+)\s*\/\s*(\d+)/.exec(texto);
    if (!n) continue;
    const [a, b] = [n[1], n[2]];
    const clave = a.length === 4 ? `${b}/${a}` : `${a}/${b}`;
    if (LEIDOS.has(clave) || hallazgos.some((h) => h.titulo.endsWith(clave))) continue;
    hallazgos.push({ titulo: `${titulo}: ${clave}`, url: `https://mjla.gov.om/laws/ar/1/show/${m[1]}`, fecha: VERIFICADO });
  }
  return hallazgos;
}

const MJLA_LEYES = "https://mjla.gov.om/laws/1";

export const detectores: readonly Detector[] = [
  {
    id: "om.mjla-labour-law",
    carril: "norma",
    datos: ["om.annual-leave", "om.notice", "om.overtime", "om.overtime-urgent", "om.working-hours", "om.gratuity", "om.unfair-dismissal", "om.family-leave", "om.sick-leave", "om.sick-leave-days"],
    metodo: "html",
    url: MJLA_LEYES,
    userAgentNavegador: true,
    traer(http) {
      return decretosNuevos(http, this.url, /قانون العمل/, "مرسوم سلطاني جديد بشأن قانون العمل");
    },
  },
  {
    id: "om.mjla-social-protection",
    carril: "norma",
    datos: ["om.spf-old-age", "om.spf-cap", "om.spf-injury", "om.spf-job-security", "om.spf-maternity", "om.spf-sick", "om.sick-employer-days", "om.job-security-rate", "om.job-security-min", "om.job-security-months", "om.pension-accrual", "om.old-age", "om.early-reduction", "om.women-early-years"],
    metodo: "html",
    url: MJLA_LEYES,
    userAgentNavegador: true,
    traer(http) {
      return decretosNuevos(http, this.url, /الحماية الاجتماعية/, "مرسوم سلطاني جديد بشأن الحماية الاجتماعية");
    },
  },
  {
    id: "om.mjla-vat",
    carril: "norma",
    datos: ["om.vat"],
    metodo: "html",
    url: MJLA_LEYES,
    userAgentNavegador: true,
    traer(http) {
      return decretosNuevos(http, this.url, /القيمة المضافة/, "مرسوم سلطاني جديد بشأن ضريبة القيمة المضافة");
    },
  },
  {
    id: "om.ncsi-cpi",
    carril: "serie",
    serie: "om.cpi-yoy",
    metodo: "html",
    url: "https://www.ncsi.gov.om",
    banda: { min: -5, max: 15, saltoRelativoMax: 2 },
    traer(http) {
      return inflacionNcsi(http, this.url);
    },
  },
];
