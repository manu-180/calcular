import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-24";

// Meses del calendario levantino, el que usan los boletines de دائرة الإحصاءات العامة.
const MESES: Readonly<Record<string, number>> = {
  "كانون الثاني": 1,
  شباط: 2,
  آذار: 3,
  نيسان: 4,
  أيار: 5,
  حزيران: 6,
  تموز: 7,
  آب: 8,
  أيلول: 9,
  "تشرين الأول": 10,
  "تشرين الثاني": 11,
  "كانون الأول": 12,
};

const RE_CPI = /معدل التضخم خلال شهر\s+(كانون الثاني|شباط|آذار|نيسان|أيار|حزيران|تموز|آب|أيلول|تشرين الأول|تشرين الثاني|كانون الأول)\s+(-?\d+(?:\.\d+)?)\s*%\s*مقارنة[ًا]?\s+مع\s+الشهر\s+المماثل\s+من\s+عام\s+(\d{4})/;

// El buscador de ssc.gov.jo lista los comunicados por título. Un comunicado con un año posterior al
// último leído avisa que el tope o el mínimo cambiaron.
async function comunicadoNuevo(http: Http, url: string, valida: RegExp, nuevo: RegExp, titulo: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!valida.test(html)) return null;
  return nuevo.test(html) ? [{ titulo, url, fecha: VERIFICADO }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "jo.ssc-wage-cap",
    carril: "norma",
    datos: ["jo.ssc-wage-cap"],
    metodo: "html",
    url: "https://www.ssc.gov.jo/?s=%D8%A7%D9%84%D8%AD%D8%AF+%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89",
    traer(http) {
      return comunicadoNuevo(http, this.url, /الضمان/, /الحد الأعلى[^<]{0,200}20(?:2[7-9]|[3-9]\d)/, "إعلان جديد للحد الأعلى للأجر الخاضع للاقتطاع");
    },
  },
  {
    id: "jo.ssc-minimum-wage",
    carril: "norma",
    datos: ["jo.minimum-wage"],
    metodo: "html",
    url: "https://www.ssc.gov.jo/?s=%D8%A7%D9%84%D8%AD%D8%AF+%D8%A7%D9%84%D8%A3%D8%AF%D9%86%D9%89+%D9%84%D9%84%D8%A3%D8%AC%D9%88%D8%B1",
    traer(http) {
      return comunicadoNuevo(http, this.url, /الضمان/, /الحد الأدنى للأجور[^<]{0,200}20(?:2[8-9]|[3-9]\d)/, "قرار جديد للحد الأدنى للأجور");
    },
  },
  {
    id: "jo.ssc-law-amendment",
    carril: "norma",
    datos: [
      "jo.ssc-old-age",
      "jo.ssc-unemployment",
      "jo.ssc-work-injury",
      "jo.ssc-maternity",
      "jo.pension-accrual",
      "jo.pension-tier",
      "jo.pension-dependents",
      "jo.pension-dependents-limits",
      "jo.pension-age",
      "jo.pension-contributions",
      "jo.early-retirement",
      "jo.early-retirement-reduction",
    ],
    metodo: "html",
    // La página de la ley lista el texto consolidado vigente; hoy dice «حتى تاريخ ١٦/٤/٢٠٢٣». Si cambia la
    // fecha de consolidación o aparece la ley reformada de 2026, hay que releer el texto.
    url: "https://www.ssc.gov.jo/",
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/قانون الضمان الاجتماعي/.test(html)) return null;
      const sigue = /١٦\/٤\/٢٠٢٣|16\/4\/2023/.test(html);
      const reforma = /قانون معدل لقانون الضمان الاجتماعي لسنة 2026|القانون المعدل[^<]{0,40}2026/.test(html);
      return !sigue || reforma ? [{ titulo: "تعديل جديد على قانون الضمان الاجتماعي", url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  {
    id: "jo.labour-law-opendata",
    carril: "norma",
    datos: ["jo.notice", "jo.unfair-dismissal", "jo.end-of-service", "jo.annual-leave", "jo.annual-leave-years", "jo.overtime-premium", "jo.working-hours", "jo.sick-leave"],
    metodo: "html",
    url: "https://opendata.gov.jo/en/dataset/laws-related-to-employees-and-staff-3401-2022/resource/0b2eff4a-9aec-40b0-8efe-4f6c5affea55",
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/قانون_العمل/.test(html)) return null;
      // La ficha guarda la fecha de la última actualización del archivo: cuando cambia, hay texto nuevo.
      const sigue = /July 16, 2025/.test(html);
      return sigue ? [] : [{ titulo: "تحديث جديد لنص قانون العمل على بوابة البيانات المفتوحة", url: this.url, fecha: VERIFICADO }];
    },
  },
  {
    id: "jo.istd-income-tax-law",
    carril: "norma",
    datos: ["jo.income-tax", "jo.personal-exemption", "jo.dependents-exemption", "jo.expense-exemption", "jo.exemption-cap", "jo.national-contribution", "jo.national-contribution-threshold"],
    metodo: "html",
    url: "https://istd.gov.jo/AR/Pages/2022_%D9%82%D9%88%D8%A7%D9%86%D9%8A%D9%86_%D8%B6%D8%B1%D9%8A%D8%A8%D8%A9_%D8%A7%D9%84%D8%AF%D8%AE%D9%84",
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true, tlsTolerante: true });
      if (!/ضريبة الدخل/.test(html)) return null;
      const hallazgos: HallazgoNorma[] = [];
      for (const m of html.matchAll(/المعدل[_ ]رقم[_ ](\d+)[_ ]لسنة[_ ](\d{4})/g)) {
        if (Number(m[2]) > 2018 && !hallazgos.some((h) => h.titulo.includes(m[2]))) {
          hallazgos.push({ titulo: `قانون ضريبة الدخل المعدل رقم ${m[1]} لسنة ${m[2]}`, url: this.url, fecha: VERIFICADO });
        }
      }
      return hallazgos;
    },
  },
  {
    id: "jo.istd-gst-law",
    carril: "norma",
    datos: ["jo.gst"],
    metodo: "html",
    // La página lista el texto consolidado con el mes y el año en el nombre del archivo
    // («..._وتعديلاته_ايلول_2022.pdf»): un año posterior avisa que hay una versión nueva.
    url: "https://istd.gov.jo/AR/Pages/%D9%82%D9%88%D8%A7%D9%86%D9%8A%D9%86_%D8%B6%D8%B1%D9%8A%D8%A8%D8%A9_%D8%A7%D9%84%D9%85%D8%A8%D9%8A%D8%B9%D8%A7%D8%AA",
    async traer(http) {
      const crudo = await http.texto(this.url, { userAgentNavegador: true, tlsTolerante: true });
      let html = crudo;
      try {
        html = decodeURIComponent(crudo.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
      } catch {
        // enlaces con escapes rotos: se lee el texto tal cual
      }
      if (!/المبيعات/.test(html)) return null;
      const anios = [...html.matchAll(/المبيعات_وتعديلاته_[^"/]{0,20}?_(20\d\d)\.pdf/g)].map((m) => Number(m[1]));
      const nuevo = anios.find((a) => a > 2022);
      return nuevo ? [{ titulo: `نص موحد جديد لقانون الضريبة العامة على المبيعات (${nuevo})`, url: this.url, fecha: VERIFICADO }] : [];
    },
  },
  {
    id: "jo.dos-cpi",
    carril: "serie",
    serie: "jo.cpi-yoy",
    metodo: "html",
    // El feed en árabe lista los comunicados; el del IPC tiene la ruta «cpi_MMAAAA» del mes en que se publica.
    url: "https://dosweb.dos.gov.jo/ar/feed/",
    banda: { min: -5, max: 20, saltoRelativoMax: 3 },
    async traer(http): Promise<readonly PuntoSerie[] | null> {
      const feed = await http.texto(this.url, { userAgentNavegador: true });
      const enlace = feed.match(/https:\/\/dosweb\.dos\.gov\.jo\/ar\/cpi_\d{6}\//)?.[0];
      if (!enlace) return null;
      const html = await http.texto(enlace, { userAgentNavegador: true });
      const m = html.match(RE_CPI);
      if (!m) return null;
      const mes = MESES[m[1]];
      const anio = Number(m[3]) + 1;
      if (!mes || !Number.isFinite(anio)) return null;
      const fecha = `${anio}-${String(mes).padStart(2, "0")}-01` as FechaISO;
      return [{ fecha, valor: Number(m[2]) }];
    },
  },
];
