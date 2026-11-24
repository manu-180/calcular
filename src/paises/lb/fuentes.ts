import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const FECHA: FechaISO = "2026-11-01";
const ULTIMA_MEMORIA = 852;
const MESES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const RE_CPI = /CPI up\s+(-?\d+(?:\.\d+)?)%\s+compared to\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/;
const ANTERIOR_A_MES: Readonly<Record<string, number>> = Object.fromEntries(MESES.map((m, i) => [m, i + 1]));

// La página del IPC no trae el número en el HTML: cada mes sale un comunicado con la URL del mes. Se
// prueban los tres últimos meses; el primero que exista trae el último dato.
async function comunicadoCpi(http: Http, hoy: Date): Promise<readonly PuntoSerie[] | null> {
  for (let atras = 0; atras < 4; atras++) {
    const d = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - atras, 1));
    const url = `https://www.cas.gov.lb/new/consumer-prices-${MESES[d.getUTCMonth()]}-${d.getUTCFullYear()}/`;
    let html: string;
    try {
      html = await http.texto(url);
    } catch {
      continue;
    }
    const m = RE_CPI.exec(html);
    if (!m) continue;
    const mes = ANTERIOR_A_MES[m[2].toLowerCase()];
    return [{ fecha: `${Number(m[3]) + 1}-${String(mes).padStart(2, "0")}-01` as FechaISO, valor: Number(m[1]) }];
  }
  return null;
}

// Las memorias de la CNSS se listan por año: un título que nombra el mínimo, el tope o las prestaciones
// avisa que cambió un decreto. El número de memoria más alto ya leído es el 852.
async function memoriasCnss(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/المذك/.test(html)) return null;
  const texto = html.replace(/<[^>]+>/g, " ");
  const hallazgos: HallazgoNorma[] = [];
  for (const m of texto.matchAll(/(\d{3,4})\s+\d{1,2}\/\d{1,2}\/\d{4}\s+([^\d]{0,160})/g)) {
    if (Number(m[1]) > ULTIMA_MEMORIA && /الحد الأدنى|الحد الادنى|الحد الاقصى|الحد الأقصى|التقديمات العائلية|نهاية الخدمة|الاشتراكات/.test(m[2])) {
      hallazgos.push({ titulo: `مذكرة ${m[1]}: ${m[2].trim().slice(0, 120)}`, url, fecha: FECHA });
    }
  }
  return hallazgos;
}

// La portada del ministerio nombra la última ley de presupuesto: una de 2027 en adelante puede cambiar
// tramos, tanzil o la tasa del IVA, y también una ley nueva sobre el aumento al 12 %.
async function presupuestoNuevo(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  if (!/Budget Law/.test(html)) return null;
  return /Budget Law 20(?:2[7-9]|[3-9]\d)/.test(html) ? [{ titulo: "قانون موازنة جديد على موقع وزارة المالية", url, fecha: FECHA }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "lb.cas-cpi",
    carril: "serie",
    serie: "lb.cpi-yoy",
    metodo: "html",
    url: "https://www.cas.gov.lb/new/consumer-prices-september-2026/",
    // Inflación alta y volátil tras la crisis: banda amplia y salto mensual también amplio.
    banda: { min: -20, max: 300, saltoRelativoMax: 0.6 },
    traer(http) {
      return comunicadoCpi(http, new Date());
    },
  },
  {
    id: "lb.cnss-memos",
    carril: "norma",
    datos: ["lb.minimum-wage", "lb.minimum-wage-daily", "lb.nssf-ceiling-health", "lb.nssf-ceiling-family", "lb.family-allowance", "lb.end-of-service"],
    metodo: "html",
    url: "https://www.cnss.gov.lb/%d8%a7%d9%84%d9%85%d8%b0%d9%83%d8%b1%d8%a7%d8%aa-%d8%a7%d9%84%d8%a5%d8%b9%d9%84%d8%a7%d9%85%d9%8a%d8%a9-2026/",
    traer(http) {
      return memoriasCnss(http, this.url);
    },
  },
  {
    id: "lb.mof-budget",
    carril: "norma",
    datos: ["lb.salary-tax", "lb.family-deduction", "lb.vat", "lb.vat-thresholds"],
    metodo: "html",
    url: "https://www.finance.gov.lb/en-us/Pages/default.aspx",
    traer(http) {
      return presupuestoNuevo(http, this.url);
    },
  },
];
