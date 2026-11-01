import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

// La página de leyes del DRC y la de publicaciones del MoICE son WordPress: cada PDF nuevo trae su
// año y mes en la ruta (/wp-content/uploads/AAAA/MM/). Un PDF de esa materia posterior al que leímos
// quiere decir que hay texto nuevo para leer.
const ACTS_DRC = "https://www.drc.gov.bt/acts-policy/" as const;
const ACTS_MOICE = "https://www.moice.gov.bt/?page_id=263434" as const;

async function pdfNuevo(http: Http, url: string, nombre: RegExp, marca: RegExp, leido: string, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!marca.test(html)) return null;
  const hallados: HallazgoNorma[] = [];
  for (const m of html.matchAll(/https?:\/\/[^"'\s]+\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"'\s]+\.pdf)/g)) {
    if (!nombre.test(m[3])) continue;
    const mes = `${m[1]}-${m[2]}`;
    if (mes > leido) hallados.push({ titulo: `${titulo}: ${m[3]}`, url: m[0], fecha: `${mes}-01` as FechaISO });
  }
  return hallados;
}

export const detectores: readonly Detector[] = [
  {
    id: "bt.drc-income-tax",
    carril: "norma",
    datos: ["bt.pit-bands", "bt.employment-deduction-rate", "bt.employment-deduction-cap", "bt.company-tax-rate", "bt.presumptive-ratio", "bt.presumptive-limit", "bt.tds-rates"],
    metodo: "html",
    url: ACTS_DRC,
    userAgentNavegador: true,
    traer(http) {
      return pdfNuevo(http, this.url, /income-tax/i, /Revenue (and|&amp;|&#038;) Customs/i, "2026-01", "New income tax text at the DRC");
    },
  },
  {
    id: "bt.drc-gst",
    carril: "norma",
    datos: ["bt.gst-rate", "bt.gst-threshold"],
    metodo: "html",
    url: ACTS_DRC,
    userAgentNavegador: true,
    traer(http) {
      return pdfNuevo(http, this.url, /(^|-)gst-/i, /Revenue (and|&amp;|&#038;) Customs/i, "2025-12", "New GST text at the DRC");
    },
  },
  {
    id: "bt.moice-labour",
    carril: "norma",
    datos: ["bt.nmw-daily", "bt.nmw-monthly", "bt.annual-leave-days", "bt.maternity-months", "bt.gratuity-min-years", "bt.notice-days-min"],
    metodo: "html",
    url: ACTS_MOICE,
    userAgentNavegador: true,
    traer(http) {
      return pdfNuevo(http, this.url, /minimum-wage|working-conditions|labour-?act/i, /Department of Labour/i, "2022-08", "New labour text at the MoICE");
    },
  },
];
