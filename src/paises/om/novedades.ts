import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "om.spf-sick-2026-07",
    fecha: "2026-10-26",
    titulo: "بدء فرع تأمين الإجازات المرضية في صندوق الحماية الاجتماعية",
    texto:
      "منذ يوليو 2026 يعمل فرع تأمين الإجازات المرضية والإجازات غير الاعتيادية للعمانيين. تدفع جهة العمل اشتراكًا شهريًا قدره 1% من الأجر، وتغطي أجر الأيام السبعة الأولى من الإجازة المرضية، ويغطي الصندوق باقي المدة. تستخدم ذلك حاسبات تكلفة الموظف واشتراكات الصندوق والإجازة المرضية.",
    vigenteDesde: "2026-07-19",
    calculadoras: ["om.employee-cost-calculator", "om.spf-contribution-calculator", "om.sick-leave-calculator"],
    fuente: {
      organismo: "وزارة العدل والشؤون القانونية",
      titulo: "قانون الحماية الاجتماعية الصادر بالمرسوم السلطاني رقم 52/2023، المواد (123) و(124) والمادة السادسة من مرسوم الإصدار",
      url: "https://www.mjla.gov.om/images/laws/file/Book595450.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
