import type { Novedad } from "@/motor/tipos";

const FUENTE_GOSI = {
  organismo: "المؤسسة العامة للتأمينات الاجتماعية",
  titulo: "آلية تطبيق الزيادة التدريجية لنسب اشتراك فرع المعاشات",
  url: "https://awareness.gosi.gov.sa/pdf/Contributions.pdf",
  tipo: "primaria",
  verificadoEl: "2026-10-24",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "sa.gosi-pension-new-2026-07",
    fecha: "2026-10-24",
    titulo: "اشتراك فرع المعاشات في النظام الجديد يصل إلى 10%",
    texto:
      "منذ 1 يوليو 2026 صارت نسبة فرع المعاشات لمن يخضع لنظام التأمينات الاجتماعية الجديد 10% على المشترك ومثلها على صاحب العمل. الزيادة التالية في 1 يوليو 2027. تستخدم النسبة الجديدة حاسبات التأمينات وصافي الراتب وتكلفة الموظف.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["sa.gosi-calculator", "sa.salary-calculator", "sa.employee-cost-calculator"],
    fuente: FUENTE_GOSI,
  },
];
