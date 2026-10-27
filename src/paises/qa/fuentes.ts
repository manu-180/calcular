import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-26";
const API = "https://api.moj.gov.qa/api/v1/Legislation/search";

interface Norma {
  id?: unknown;
  title?: unknown;
  publishDate?: unknown;
}

// Al Meezan (portal legal del Ministerio de Justicia) publica cada norma nueva con su fecha de
// publicación. El buscador filtra desde la última verificación; el título decide si toca nuestros datos.
async function normasNuevas(http: Http, url: string, relevante: RegExp): Promise<readonly HallazgoNorma[] | null> {
  const json = (await http.json(url)) as { success?: unknown; data?: { data?: unknown } } | null;
  const lista = json?.data?.data;
  if (json?.success !== true || !Array.isArray(lista)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const n of lista as Norma[]) {
    const titulo = typeof n.title === "string" ? n.title.trim() : "";
    const fecha = typeof n.publishDate === "string" ? n.publishDate.slice(0, 10) : "";
    if (!titulo || typeof n.id !== "string" || !esFechaISO(fecha) || fecha <= VERIFICADO || !relevante.test(titulo)) continue;
    if (hallazgos.some((h) => h.titulo === titulo)) continue;
    hallazgos.push({ titulo, url: `https://almeezan.qa/legislations/${n.id}`, fecha });
  }
  return hallazgos;
}

const busqueda = (termino: string) =>
  `${API}?searchTerm=${encodeURIComponent(termino)}&pageSize=50&publishDateFrom=${VERIFICADO}&sortBy=publishDate&sortDescending=true` as const;

export const detectores: readonly Detector[] = [
  {
    id: "qa.almeezan-labour-law",
    carril: "norma",
    datos: ["qa.gratuity-weeks", "qa.gratuity-min-service", "qa.annual-leave", "qa.annual-leave-threshold", "qa.working-hours", "qa.overtime", "qa.notice", "qa.notice-threshold", "qa.sick-leave", "qa.sick-leave-qualifying", "qa.maternity", "qa.maternity-qualifying"],
    metodo: "api-json",
    url: busqueda("قانون العمل"),
    traer(http) {
      return normasNuevas(http, this.url, /قانون العمل|Labou?r Law/i);
    },
  },
  {
    id: "qa.almeezan-minimum-wage",
    carril: "norma",
    datos: ["qa.minimum-wage", "qa.domestic-worker", "qa.domestic-worker-hours"],
    metodo: "api-json",
    url: busqueda("الأجور"),
    traer(http) {
      return normasNuevas(http, this.url, /الحد الأدنى لأجور|الحد الأدنى للأجور|المستخدمين في المنازل|minimum wage|domestic workers/i);
    },
  },
  {
    id: "qa.almeezan-social-insurance",
    carril: "norma",
    datos: ["qa.social-insurance", "qa.social-insurance-caps", "qa.pension-ages", "qa.pension-reduction"],
    metodo: "api-json",
    url: busqueda("التأمينات الاجتماعية"),
    traer(http) {
      return normasNuevas(http, this.url, /قانون التأمينات الاجتماعية|social insurance law/i);
    },
  },
  {
    id: "qa.almeezan-taxes",
    carril: "norma",
    datos: ["qa.salary-income-tax", "qa.corporate-tax", "qa.withholding-tax", "qa.excise", "qa.sugar-tax", "qa.sugar-tax-tiers"],
    metodo: "api-json",
    url: busqueda("الضريبة"),
    traer(http) {
      return normasNuevas(http, this.url, /قانون الضريبة على الدخل|الضريبة الانتقائية|income tax law|excise tax/i);
    },
  },
  {
    id: "qa.almeezan-property-fees",
    carril: "norma",
    datos: ["qa.property-registration-rates", "qa.property-registration-fixed"],
    metodo: "api-json",
    url: busqueda("رسوم"),
    traer(http) {
      return normasNuevas(http, this.url, /رسوم بعض الخدمات التي تقدمها وزارة العدل|التسجيل العقاري|fees for certain services provided by the Ministry of Justice|real estate registration/i);
    },
  },
  {
    id: "qa.gta-excise-page",
    carril: "norma",
    datos: ["qa.excise", "qa.sugar-tax", "qa.sugar-tax-tiers", "qa.corporate-tax", "qa.withholding-tax"],
    metodo: "html",
    url: "https://www.gta.gov.qa/en/taxes-info",
    userAgentNavegador: true,
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/Excise Tax/.test(html)) return null;
      const igual =
        /QAR 0\.77 per liter/.test(html) &&
        /QAR 1\.06 per liter/.test(html) &&
        /Tobacco products: 100%/.test(html) &&
        /Energy drinks: 100%/.test(html) &&
        /10% on taxable income/.test(html) &&
        /final deduction at source of 5%/.test(html);
      return igual ? [] : [{ titulo: "GTA tax rates page changed (excise, income tax or withholding)", url: this.url, fecha: VERIFICADO }];
    },
  },
];
