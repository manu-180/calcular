import type { Novedad } from "@/motor/tipos";

const FUENTE_SSC_TOPE = {
  organismo: "المؤسسة العامة للضمان الاجتماعي",
  titulo: "الضمان: (3733) ديناراً الحد الأعلى للأجر المشمول بأحكام القانون الذي تُحتسب الاشتراكات على أساسه لعام 2026",
  url: "https://www.ssc.gov.jo/%d8%a7%d9%84%d8%b6%d9%85%d8%a7%d9%86-3733-%d8%af%d9%8a%d9%86%d8%a7%d8%b1%d8%a7%d9%8b-%d8%a7%d9%84%d8%ad%d8%af-%d8%a7%d9%84%d8%a3%d8%b9%d9%84%d9%89-%d9%84%d9%84%d8%a3%d8%ac%d8%b1-%d8%a7%d9%84%d9%85/",
  tipo: "primaria",
  verificadoEl: "2026-10-24",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "jo.ssc-wage-cap-2026",
    fecha: "2026-10-24",
    titulo: "الحد الأعلى للأجر الخاضع لاشتراكات الضمان 3733 دينارًا في 2026",
    texto:
      "رفعت المؤسسة العامة للضمان الاجتماعي الحد الأعلى للأجر الذي تُحسب عليه الاشتراكات إلى 3733 دينارًا لعام 2026 بعد أن كان 3668 دينارًا، بنسبة التضخم المسجلة في 2025. تستخدم الحد الجديد حاسبات اشتراكات الضمان وصافي الراتب وتكلفة الموظف.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["jo.social-security-calculator", "jo.salary-calculator", "jo.employee-cost-calculator"],
    fuente: FUENTE_SSC_TOPE,
  },
];
