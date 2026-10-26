import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

const BOE_TRABAJO = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/08381293-6388-48e2-8ad2-a9a700f2aa94/1";
const BOE_SEGURO_SOCIAL = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/eaee8a20-3a54-4aaf-b0d9-b1ad00998962/1";
const BOE_IVA = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f98f4238-0289-4891-8a22-a9a700f1f538/1";

// La ficha de cada ley en هيئة الخبراء lista sus reformas como «المرسوم الملكي رقم (م/44) وتاريخ
// 1446/2/8 للهجرة». Una reforma con año hégira posterior a la última leída es un aviso para revisar datos.json.
// El año hégira se pasa a gregoriano aproximado (el cron solo necesita una fecha de referencia).
const RE_DECRETO = /\(\s*م\s*\/\s*(\d+)\s*\)\s*وتاريخ\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})/g;
const RE_DECRETO_ISO = /\(\s*م\s*\/\s*(\d+)\s*\)\s*وتاريخ\s*(\d{4})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})/g;

function hegiraAGregoriano(anio: number, mes: number, dia: number): FechaISO | null {
  const dias = (anio - 1) * 354.367 + (mes - 1) * 29.53 + dia - 1;
  const ms = Date.UTC(622, 6, 16) + dias * 86400000;
  const f = new Date(ms).toISOString().slice(0, 10);
  return esFechaISO(f) ? f : null;
}

async function reformasBoe(http: Http, url: string, ultimo: { anio: number; numero: number }, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { tlsTolerante: true, userAgentNavegador: true });
  if (!/المادة الأولى/.test(html)) return null;
  const hallazgos: HallazgoNorma[] = [];
  const agregar = (numero: number, anio: number, mes: number, dia: number) => {
    const nuevo = anio > ultimo.anio || (anio === ultimo.anio && numero > ultimo.numero);
    if (!nuevo) return;
    const fecha = hegiraAGregoriano(anio, mes, dia);
    if (fecha && fecha > VERIFICADO && !hallazgos.some((h) => h.titulo.includes(`م/${numero} `))) {
      hallazgos.push({ titulo: `${titulo}: المرسوم الملكي م/${numero} لعام ${anio} للهجرة`, url, fecha });
    }
  };
  for (const m of html.matchAll(RE_DECRETO)) agregar(Number(m[1]), Number(m[4]), Number(m[3]), Number(m[2]));
  for (const m of html.matchAll(RE_DECRETO_ISO)) agregar(Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4]));
  return hallazgos;
}

// Las páginas de GOSI y de ZATCA no fechan sus cambios: se vigila que sigan diciendo lo que se leyó.
// Si la cifra desaparece, el cron abre un aviso para releer la fuente.
async function cifraSigue(http: Http, url: string, valida: RegExp, cifras: readonly RegExp[], titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!valida.test(html)) return null;
  const faltan = cifras.filter((re) => !re.test(html));
  return faltan.length ? [{ titulo, url, fecha: VERIFICADO }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "sa.boe-nizam-alamal",
    carril: "norma",
    datos: ["sa.month-days", "sa.eos", "sa.eos-resignation", "sa.notice", "sa.unfair-dismissal", "sa.annual-leave", "sa.overtime-premium", "sa.working-hours", "sa.sick-leave", "sa.maternity"],
    metodo: "html",
    url: BOE_TRABAJO,
    // El certificado de laws.boe.gov.sa llega sin la cadena intermedia: sin tolerancia, la conexión falla.
    tlsTolerante: true,
    userAgentNavegador: true,
    traer(http) {
      return reformasBoe(http, this.url, { anio: 1446, numero: 44 }, "تعديل جديد على نظام العمل");
    },
  },
  {
    id: "sa.boe-social-insurance",
    carril: "norma",
    datos: ["sa.gosi-hazards", "sa.gosi-cap", "sa.gosi-pension-formula", "sa.gosi-pension-new"],
    metodo: "html",
    url: BOE_SEGURO_SOCIAL,
    tlsTolerante: true,
    userAgentNavegador: true,
    traer(http) {
      return reformasBoe(http, this.url, { anio: 1445, numero: 273 }, "تعديل جديد على نظام التأمينات الاجتماعية");
    },
  },
  {
    id: "sa.gosi-awareness-rates",
    carril: "norma",
    datos: ["sa.gosi-pension-legacy", "sa.gosi-pension-new", "sa.gosi-saned", "sa.gosi-hazards", "sa.gosi-cap"],
    metodo: "html",
    url: "https://awareness.gosi.gov.sa/businessJourney.html",
    traer(http) {
      return cifraSigue(http, this.url, /التأمينات الاجتماعية/, [/45,000/, /\(0\.75%\)/, /\(2%\)/, /\(11%\)/], "تغيرت نسب الاشتراكات أو الحد الأعلى في منصة التأمينات التوعوية");
    },
  },
  {
    id: "sa.boe-vat",
    carril: "norma",
    datos: ["sa.vat"],
    metodo: "html",
    url: BOE_IVA,
    tlsTolerante: true,
    userAgentNavegador: true,
    async traer(http) {
      const cambio = await cifraSigue(http, this.url, /ضريبة القيمة المضافة/, [/\(15%\)/], "تغيرت النسبة الأساسية لضريبة القيمة المضافة");
      return cambio;
    },
  },
  {
    id: "sa.zatca-rett",
    carril: "norma",
    datos: ["sa.rett", "sa.rett-first-home"],
    metodo: "html",
    url: "https://zatca.gov.sa/ar/RulesRegulations/Taxes/Pages/RETT.aspx",
    userAgentNavegador: true,
    traer(http) {
      return cifraSigue(http, this.url, /التصرفات العقارية/, [/بنسبة 5%/, /مليون ريال/], "تغيرت نسبة ضريبة التصرفات العقارية أو دعم المسكن الأول");
    },
  },
  {
    id: "sa.gastat-cpi",
    carril: "serie",
    serie: "sa.cpi-yoy",
    // Manual: الهيئة العامة للإحصاء publica la cifra mensual en un PDF con nombre nuevo cada mes y la
    // página que lo lista se arma con JavaScript. El semáforo avisa antes de que la serie venza y el
    // punto se carga a mano con cada boletín.
    metodo: "manual",
    url: "https://www.stats.gov.sa/ar/statistics-tabs?tab=436312&category=417698",
    banda: { min: -5, max: 15, saltoRelativoMax: 2 },
    async traer(): Promise<readonly PuntoSerie[] | null> {
      return null;
    },
  },
];
