import type { Detector, FechaISO } from "@/motor/tipos";

const VERIFICADO: FechaISO = "2026-10-29";

const DATOS_LEY_TRABAJO = [
  "ps.end-of-service",
  "ps.end-of-service-min",
  "ps.resignation-years",
  "ps.unfair-dismissal",
  "ps.notice",
  "ps.notice-weekly",
  "ps.probation",
  "ps.annual-leave",
  "ps.annual-leave-years",
  "ps.annual-leave-carryover",
  "ps.working-hours",
  "ps.overtime-rate",
  "ps.overtime-max",
  "ps.sick-leave",
  "ps.sick-leave-half-rate",
  "ps.maternity-leave",
  "ps.maternity-after-birth",
  "ps.maternity-min-service",
  "ps.nursing-hour",
  "ps.deduction-advance",
  "ps.deduction-total",
  "ps.fine-max",
];

export const detectores: readonly Detector[] = [
  {
    id: "ps.mof-labour-law",
    carril: "norma",
    datos: DATOS_LEY_TRABAJO,
    metodo: "html",
    // La página «قوانين و انظمة» de وزارة المالية enlaza el texto de la ley que leímos. Si el enlace
    // cambia de archivo o aparece un قرار بقانون que modifica la ley, hay que releerla.
    url: "https://mof.gov.ps/%d9%82%d9%88%d8%a7%d9%86%d9%8a%d9%86-%d9%88-%d8%a7%d9%86%d8%b8%d9%85%d8%a9/",
    async traer(http) {
      const html = await http.texto(this.url, { userAgentNavegador: true });
      if (!/قانون العمل/.test(html)) return null;
      const sigue = /pal_work_law\.doc/.test(html);
      const reforma = /قرار بقانون[^<]{0,80}(?:قانون العمل|العمل رقم)/.test(html);
      return !sigue || reforma ? [{ titulo: "نص جديد أو تعديل لقانون العمل على موقع وزارة المالية", url: this.url, fecha: VERIFICADO }] : [];
    },
  },
];
