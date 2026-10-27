import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-27";
const MRA_API = "https://www.mra.mw/admin/api/v1";
// mra.mw es una SPA: su propio JavaScript manda este token público en cada pedido a la API, y sin él
// la API responde «Unauthorized access».
const MRA_ENCABEZADOS = { "access-token": "cbkjssjtyfu73928393nvjbvdsbshd" } as const;
const MESES: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};

const DATOS_MEDIDAS = [
  "mw.paye-bands",
  "mw.personal-tax-bands",
  "mw.vat",
  "mw.transfer-levy-rate",
  "mw.transfer-levy-threshold",
  "mw.winnings-tax",
  "mw.wht-rates",
  "mw.fbt-rate",
  "mw.presumptive-tax",
  "mw.cgt-provisional-rate",
];
const DATOS_LEY_EMPLEO = [
  "mw.overtime-ordinary",
  "mw.overtime-day-off",
  "mw.overtime-holiday",
  "mw.weekly-hours-limit",
  "mw.leave-six-day-week",
  "mw.leave-five-day-week",
  "mw.sick-full-pay",
  "mw.sick-half-pay",
  "mw.sick-qualifying",
  "mw.maternity-weeks",
  "mw.maternity-cycle",
  "mw.notice-long-service",
  "mw.notice-mid-service",
  "mw.notice-short-service",
  "mw.notice-fixed-term",
  "mw.severance-weeks",
  "mw.pension-employee",
  "mw.pension-employer",
];

interface DescargaMra {
  downloadFilename?: unknown;
  downloadFilePath?: unknown;
  formatted_created_at?: unknown;
}

// «20 Oct 2026» → 2026-10-20.
function fechaMra(texto: string): FechaISO | null {
  const m = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(texto.trim());
  if (!m) return null;
  const mes = Object.entries(MESES).find(([nombre]) => nombre.startsWith(m[2].toLowerCase()))?.[1];
  const fecha = `${m[3]}-${mes}-${m[1].padStart(2, "0")}`;
  return mes && esFechaISO(fecha) ? fecha : null;
}

// Las páginas de impuestos de mra.mw salen de la API como HTML. Si deja de aparecer alguno de los
// textos que leímos, la MRA cambió la página.
function paginaMra(id: string, slug: string, datos: readonly string[], textos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "api-json",
    url: `${MRA_API}/link/${slug}/showByChildSlug`,
    async traer(http) {
      const json = (await http.json(this.url, { encabezados: MRA_ENCABEZADOS })) as { data?: { content?: unknown } };
      const html = json?.data?.content;
      if (typeof html !== "string") return null;
      const texto = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;|\s+/g, " ");
      const igual = textos.every((t) => texto.includes(t));
      return igual ? [] : [{ titulo: `MRA page changed: ${slug}`, url: `https://www.mra.mw/view/${slug}`, fecha: VERIFICADO }];
    },
  };
}

export const detectores: readonly Detector[] = [
  {
    id: "mw.usd-rbm",
    carril: "serie",
    serie: "mw.usd",
    metodo: "html",
    url: "https://www.rbm.mw/Statistics/MajorRates/",
    // El RBM fija el kwacha contra el dólar y lo mueve con devaluaciones de una vez, de decenas por
    // ciento. La banda deja pasar un salto así para que el cron lo proponga en vez de descartarlo.
    banda: { min: 1200, max: 5000, saltoRelativoMax: 0.6 },
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const f = /id="exhangeRateDate">\s*(\d{1,2})-([A-Za-z]+)-(\d{4})/.exec(html);
      const fila = /<strong>\s*USD\s*<\/strong>\s*<\/td>\s*<td>\s*([\d.]+)\s*<\/td>\s*<td>\s*([\d.]+)\s*<\/td>/.exec(html);
      if (!f || !fila) return null;
      const mes = MESES[f[2].toLowerCase()];
      const fecha = `${f[3]}-${mes}-${f[1].padStart(2, "0")}`;
      const valor = Number(fila[2]);
      if (!mes || !esFechaISO(fecha) || !Number.isFinite(valor)) return null;
      return [{ fecha, valor }];
    },
  },
  {
    id: "mw.cpi-mra",
    carril: "serie",
    serie: "mw.cpi",
    // Manual: la MRA publica el IPC (base 1970) solo dentro del PDF de su aviso mensual, y el Http de
    // los detectores lee texto. El detector mw.mra-avisos avisa cuando sale un aviso nuevo.
    metodo: "manual",
    url: "https://www.mra.mw/admin/api/v1/download/getAllDomestic?per_page=20&page=1",
    banda: { min: 500000, max: 3000000, saltoRelativoMax: 0.1 },
    async traer() {
      return null;
    },
  },
  {
    id: "mw.mra-avisos",
    carril: "norma",
    datos: [...DATOS_MEDIDAS, "mw.tevet-rate"],
    metodo: "api-json",
    url: `${MRA_API}/download/getAllDomestic?per_page=30&page=1`,
    async traer(http) {
      const json = (await http.json(this.url, { encabezados: MRA_ENCABEZADOS })) as { data?: unknown };
      if (!Array.isArray(json?.data)) return null;
      const relevante = /tax measures|taxation|value added|pay as you earn|paye|withholding|presumptive|fringe|tevet|consumer price/i;
      const hallazgos: HallazgoNorma[] = [];
      for (const d of json.data as DescargaMra[]) {
        if (typeof d.downloadFilename !== "string" || typeof d.downloadFilePath !== "string" || typeof d.formatted_created_at !== "string") return null;
        const fecha = fechaMra(d.formatted_created_at);
        if (!fecha) return null;
        if (fecha > VERIFICADO && relevante.test(d.downloadFilename)) {
          hallazgos.push({ titulo: `MRA notice: ${d.downloadFilename.trim()}`, url: encodeURI(d.downloadFilePath), fecha });
        }
      }
      return hallazgos;
    },
  },
  {
    id: "mw.mra-paye-calculator",
    carril: "norma",
    datos: ["mw.paye-bands"],
    metodo: "api-json",
    url: `${MRA_API}/payecalculator`,
    // La calculadora PAYE de la MRA corre en su servidor: si para K2,000,000 deja de dar K570,500, la
    // MRA cargó bandas nuevas.
    async traer(http) {
      if (!http.postJson) return null;
      const json = (await http.postJson(this.url, { option: "2", amount: 2000000 }, { encabezados: MRA_ENCABEZADOS })) as { paye_month?: unknown };
      if (typeof json?.paye_month !== "string") return null;
      return json.paye_month === "570,500.00" ? [] : [{ titulo: "MRA PAYE calculator gives a new result for K2,000,000", url: "https://www.mra.mw/", fecha: VERIFICADO }];
    },
  },
  paginaMra("mw.mra-wht", "withholding-tax", ["mw.wht-rates"], ["(a) Royalties 20%", "(e) Payment for carriage and haulage 10%", "(k) Interest 20%"]),
  paginaMra("mw.mra-fbt", "understanding-fringe-benefit-tax", ["mw.fbt-rate", "mw.fbt-vehicle", "mw.fbt-school-fees", "mw.fbt-housing-owned", "mw.fbt-housing-unfurnished", "mw.fbt-housing-furnished"], ["The rate for Fringe Benefit Tax is 30%", "15% of the original cost", "10 % of the employee", "12 % of the employee"]),
  paginaMra("mw.mra-tevet", "tevet-levy", ["mw.tevet-rate"], ["1% of the basic annual payroll"]),
  paginaMra("mw.mra-presumptive", "business-presumptive-tax", ["mw.presumptive-tax"], ["K12.5 million", "K170,000.00", "K225,000.00"]),
  {
    id: "mw.labour-documentos",
    carril: "norma",
    datos: DATOS_LEY_EMPLEO,
    metodo: "html",
    url: "https://www.labour.gov.mw/index.php/downloads/labour-act",
    // El Ministerio de Trabajo publica las leyes laborales como PDF en /images/documents/. Un PDF nuevo
    // con un nombre que no conocíamos puede ser la reforma de la Employment Act o una orden de salarios.
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/employment-act\.pdf/i.test(html)) return null;
      const conocidos = ["employment-act.pdf", "labour_relations_act.pdf", "workers_compensation_act.pdf", "OSHW%20ACT%20ABSTRACT%202019.pdf", "organisational chart2.pdf"];
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(/href="\/images\/documents\/([^"]+\.pdf)"/gi)) {
        if (!conocidos.includes(m[1])) {
          hallazgos.push({ titulo: `New Ministry of Labour document: ${decodeURIComponent(m[1])}`, url: `https://www.labour.gov.mw/images/documents/${m[1]}`, fecha: VERIFICADO });
        }
      }
      return hallazgos;
    },
  },
];
