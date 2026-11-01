import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const BCM = "https://connect.bcm.mr/api/cours_change_reference";

function isoDiasAtras(dias: number): string {
  return new Date(Date.now() - dias * 86400000).toISOString().slice(0, 10);
}

// El servicio del BCM devuelve [{ date, value, currency, ... }], un punto por día hábil. Si la lista no
// viene, o un punto no trae fecha y valor numérico de la moneda pedida, la forma cambió.
function puntosBcm(json: unknown, moneda: string): PuntoSerie[] | null {
  if (!Array.isArray(json) || json.length === 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of json) {
    const { date, value, currency } = (p ?? {}) as { date?: unknown; value?: unknown; currency?: unknown };
    if (typeof value !== "number" || typeof date !== "string" || !esFechaISO(date)) return null;
    if (currency !== moneda) return null;
    puntos.push({ fecha: date, valor: value });
  }
  return puntos;
}

function detectorBcm(moneda: "USD" | "EUR", min: number, max: number): Detector {
  return {
    id: `mr.${moneda.toLowerCase()}-bcm`,
    carril: "serie",
    serie: `mr.${moneda.toLowerCase()}`,
    metodo: "api-json",
    url: `${BCM}?currency=${moneda}`,
    // La ouguiya flota dentro de una banda que el BCM publica a diario: un salto de 5 % en un día ya
    // pide revisión manual.
    banda: { min, max, saltoRelativoMax: 0.05 },
    async traer(http) {
      const url = `${BCM}?from=${isoDiasAtras(20)}&to=${isoDiasAtras(0)}&currency=${moneda}`;
      return puntosBcm(await http.json(url), moneda);
    },
  };
}

// Los portales de Finanzas y de Trabajo (Drupal) guardan cada PDF en /sites/default/files/AAAA-MM/.
// Un PDF en una carpeta posterior a la última leída es un texto nuevo para revisar datos.json.
const RE_PDF = /href="(https?:\/\/[^"]+\/sites\/default\/files\/(\d{4})-(\d{2})\/[^"]+\.pdf)"/gi;

async function pdfsNuevos(http: Http, url: string, ultimoMes: string, valida: RegExp, prefijo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!valida.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  for (const m of html.matchAll(RE_PDF)) {
    const mes = `${m[2]}-${m[3]}`;
    const fecha = `${mes}-01` as FechaISO;
    if (mes <= ultimoMes || !esFechaISO(fecha)) continue;
    const enlace = m[1].replace(/^http:/, "https:");
    if (hallazgos.some((h) => h.url === enlace)) continue;
    let nombre = enlace.slice(enlace.lastIndexOf("/") + 1);
    try {
      nombre = decodeURIComponent(nombre);
    } catch {
      // nombre con escapes rotos: se deja tal cual
    }
    hallazgos.push({ titulo: `${prefijo}: ${nombre}`, url: enlace, fecha });
  }
  return hallazgos;
}

export const detectores: readonly Detector[] = [
  detectorBcm("USD", 30, 60),
  detectorBcm("EUR", 32, 70),
  {
    id: "mr.finances-lois",
    carril: "norma",
    datos: [
      "mr.tva",
      "mr.tva-telephonie",
      "mr.its-bareme",
      "mr.its-abattement",
      "mr.its-indemnites",
      "mr.taxe-apprentissage",
      "mr.is-taux",
      "mr.is-minimum",
      "mr.is-minimum-perception",
      "mr.ircm",
      "mr.vignette",
    ],
    metodo: "html",
    url: "https://www.finances.gov.mr/fr/Lois",
    traer(http) {
      return pdfsNuevos(http, this.url, "2026-10", /Loi|Lois/, "قانون جديد على موقع وزارة المالية");
    },
  },
  {
    id: "mr.travail-textes",
    carril: "norma",
    datos: [
      "mr.smig-horaire",
      "mr.smig-horaire-agricole",
      "mr.duree-legale",
      "mr.conges-par-mois",
      "mr.conges-anciennete",
      "mr.conges-mere",
      "mr.majoration-hs",
      "mr.licenciement",
      "mr.licenciement-collectif",
      "mr.depart-retraite",
      "mr.preavis-manoeuvre",
      "mr.preavis-mois",
    ],
    metodo: "html",
    url: "https://www.fonctionpublique.gov.mr/fr/emploi",
    traer(http) {
      return pdfsNuevos(http, this.url, "2026-06", /Code du travail|SMIG/i, "نص جديد في قطاع الشغل");
    },
  },
  {
    id: "mr.cnss-documents",
    carril: "norma",
    datos: [
      "mr.cnss-plafond",
      "mr.cnss-total",
      "mr.cnss-salarie",
      "mr.cnss-employeur",
      "mr.medecine-travail",
      "mr.age-retraite",
      "mr.pension-anciennete-min",
      "mr.pension-mois-recents",
      "mr.pension-taux-base",
      "mr.pension-majoration",
      "mr.pension-mois-base",
      "mr.pension-minimum",
      "mr.pension-plafond-minimum",
    ],
    metodo: "api-json",
    url: "https://www.cnss.mr/api/v1/fr/documents",
    // La CNSS lista sus textos en un JSON. Los leídos el 29/10/2026 tienen id hasta 15: un id mayor
    // es un texto o formulario nuevo.
    async traer(http) {
      const json = (await http.json(this.url)) as { data?: { documents?: unknown } } | null;
      const lista = json?.data?.documents;
      if (!Array.isArray(lista)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const d of lista) {
        const { id, title } = (d ?? {}) as { id?: unknown; title?: { fr?: unknown } };
        if (typeof id !== "number") return null;
        if (id <= 15) continue;
        const titulo = typeof title?.fr === "string" ? title.fr : `document ${id}`;
        hallazgos.push({ titulo: `وثيقة جديدة لدى الصندوق الوطني للضمان الاجتماعي: ${titulo}`, url: `https://www.cnss.mr/api/v1/fr/documents/${id}/download`, fecha: isoDiasAtras(0) as FechaISO });
      }
      return hallazgos;
    },
  },
];
