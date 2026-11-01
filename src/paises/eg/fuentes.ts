import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, PuntoSerie } from "@/motor/tipos";

const LEIDO: FechaISO = "2026-10-24";

const MESES: Record<string, number> = {
  "يناير": 1, "فبراير": 2, "مارس": 3, "ابريل": 4, "أبريل": 4, "إبريل": 4, "مايو": 5, "يونيو": 6,
  "يوليو": 7, "اغسطس": 8, "أغسطس": 8, "سبتمبر": 9, "اكتوبر": 10, "أكتوبر": 10, "نوفمبر": 11, "ديسمبر": 12,
};

function sinEtiquetas(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
}

interface NoticiaCapmas {
  title?: unknown;
  brief?: unknown;
  content?: unknown;
}

// El sitio de CAPMAS es una SPA; su API (puerto 8080) devuelve todas las noticias de una vez. El
// comunicado mensual del IPC dice: «بلغ الرقم القياسي العام لأسعار المستهلكين لإجمالي الجمهورية (294.2)
// نقطة لشهر سبتمبر 2026».
function puntosIpc(datos: unknown): readonly PuntoSerie[] | null {
  const lista = (datos as { data?: unknown })?.data;
  if (!Array.isArray(lista)) return null;
  const puntos = new Map<string, number>();
  const patron = /الرقم القياسي العام لأسعار المست\S*\s*لإجم\S*\s*الج\S*\s*\(?\s*([\d.]+)\s*\)?\s*نقطة لشهر\s*(\S+)\s*(\d{4})/g;
  for (const n of lista as NoticiaCapmas[]) {
    if (typeof n.title !== "string" || !n.title.includes("أسعار المستهلكين")) continue;
    const texto = sinEtiquetas(`${typeof n.brief === "string" ? n.brief : ""} ${typeof n.content === "string" ? n.content : ""}`);
    for (const m of texto.matchAll(patron)) {
      const mes = MESES[m[2].replace(/[،,]/g, "")];
      const valor = Number(m[1]);
      const fecha = mes ? `${m[3]}-${String(mes).padStart(2, "0")}-01` : "";
      if (esFechaISO(fecha) && fecha >= "2024-08-01" && Number.isFinite(valor) && !puntos.has(fecha)) puntos.set(fecha, valor);
    }
  }
  const salida = [...puntos].map(([fecha, valor]) => ({ fecha: fecha as FechaISO, valor })).sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  return salida.length ? salida : null;
}

interface PaginaNosi {
  Title?: unknown;
  Created?: unknown;
  FileRef?: unknown;
}

// Las noticias de NOSI viven en una lista de SharePoint («الصفحات»); la portada las carga por JS.
// Un anuncio nuevo sobre el أجر الاشتراك o las tasas puede cambiar los límites del año.
function hallazgosNosi(datos: unknown): readonly HallazgoNorma[] | null {
  const lista = (datos as { value?: unknown })?.value;
  if (!Array.isArray(lista)) return null;
  const salida: HallazgoNorma[] = [];
  for (const p of lista as PaginaNosi[]) {
    if (typeof p.Title !== "string" || typeof p.Created !== "string" || typeof p.FileRef !== "string") continue;
    const fecha = p.Created.slice(0, 10);
    if (!esFechaISO(fecha) || fecha <= LEIDO) continue;
    if (/أجر الاشتراك|الاشتراك التأميني|نسب الاشتراك|الحد الأدنى للمعاش/.test(p.Title)) {
      salida.push({ titulo: p.Title.trim(), url: `https://www.nosi.gov.eg${p.FileRef}`, fecha });
    }
  }
  return salida;
}

// La portada de noticias de ETA (Drupal) lista cada nota con su aria-label y un <time datetime>.
function hallazgosEta(html: string, tema: RegExp): readonly HallazgoNorma[] | null {
  if (!html.includes("datetime")) return null;
  const salida: HallazgoNorma[] = [];
  const patron = /href="(\/ar\/news\/[^"]+)"\s+aria-label="([^"]+?) link"[\s\S]*?<time datetime="(\d{4}-\d{2}-\d{2})/g;
  for (const m of html.matchAll(patron)) {
    if (m[3] > LEIDO && tema.test(m[2])) salida.push({ titulo: m[2], url: `https://www.eta.gov.eg${m[1]}`, fecha: m[3] as FechaISO });
  }
  return salida;
}

export const detectores: readonly Detector[] = [
  {
    id: "eg.cpi-capmas",
    carril: "serie",
    serie: "eg.cpi",
    metodo: "api-json",
    url: "https://www.capmas.gov.eg:8080/api/News",
    banda: { min: 150, max: 700, saltoRelativoMax: 0.08 },
    async traer(http) {
      return puntosIpc(await http.json(this.url));
    },
  },
  {
    id: "eg.nosi-noticias",
    carril: "norma",
    datos: ["eg.si-wage-min", "eg.si-wage-max", "eg.si-employee", "eg.si-employer", "eg.pension-floor"],
    metodo: "api-json",
    url: "https://www.nosi.gov.eg/ar/News/_api/web/lists/getbytitle('%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA')/items?$select=Title,Created,FileRef&$orderby=Created%20desc&$top=40",
    async traer(http) {
      return hallazgosNosi(await http.json(this.url, { userAgentNavegador: true }));
    },
  },
  {
    id: "eg.eta-noticias",
    carril: "norma",
    datos: ["eg.income-tax", "eg.income-tax-thresholds", "eg.personal-exemption", "eg.vat", "eg.real-estate-tax"],
    metodo: "html",
    url: "https://www.eta.gov.eg/ar/news",
    userAgentNavegador: true,
    async traer(http) {
      return hallazgosEta(await http.texto(this.url, { userAgentNavegador: true }), /الضريبة على الدخل|كسب العمل|المرتبات|الإعفاء الشخصي|الشرائح|القيمة المضافة|التصرفات العقارية/);
    },
  },
  {
    id: "eg.labour-leyes",
    carril: "norma",
    datos: ["eg.annual-leave", "eg.overtime", "eg.notice-months", "eg.unfair-dismissal-months", "eg.redundancy", "eg.after60-reward", "eg.maternity-months", "eg.raise-rate"],
    metodo: "html",
    url: "https://www.labour.gov.eg/ar/%D8%A7%D9%84%D9%82%D9%88%D8%A7%D9%86%D9%8A%D9%86-%D9%88%D8%A7%D9%84%D8%AA%D8%B4%D8%B1%D9%8A%D8%B9%D8%A7%D8%AA/",
    userAgentNavegador: true,
    // La página de leyes del Ministerio de Trabajo lista cada norma como un PDF con el año en el nombre.
    // Una ley o un reglamento posterior al que leímos («لسنة-2025») puede tocar vacaciones, horas extra o despido.
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      const pdfs = [...html.matchAll(/href="(\/media\/[^"]+\.pdf)"/g)].map((m) => m[1]);
      if (!pdfs.length) return null;
      const salida: HallazgoNorma[] = [];
      for (const ruta of pdfs) {
        const nombre = decodeURIComponent(ruta);
        const anio = /لسن[ةه]-?(20\d{2})/.exec(nombre)?.[1];
        if (anio && Number(anio) >= 2026 && /العمل|الأجور|العلاوة/.test(nombre)) {
          salida.push({ titulo: nombre.split("/").pop() ?? nombre, url: `https://www.labour.gov.eg${ruta}`, fecha: `${anio}-01-01` as FechaISO });
        }
      }
      return salida;
    },
  },
];
