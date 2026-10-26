import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "eg.min-income-public-2026",
    fecha: "2026-10-24",
    titulo: "الحد الأدنى للدخل للعاملين بالدولة 8,000 جنيه",
    texto: "مع موازنة العام المالي 2026/2027 ارتفع الحد الأدنى للدخل للعاملين بالدولة إلى 8,000 جنيه شهريًا، وبدأ صرفه مع مرتبات يوليو 2026. حاسبة الحد الأدنى للأجور تعرض الرقم الجديد.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["eg.minimum-wage"],
    fuente: {
      organismo: "مركز المعلومات ودعم اتخاذ القرار بمجلس الوزراء",
      titulo: "النشرة اليومية رقم 1327، 5 يوليو 2026",
      url: "https://idsc.gov.eg/upload/NewsLetter/AttachmentA/13605/%D8%A7%D9%84%D8%A3%D8%AD%D8%AF%205%20%D9%8A%D9%88%D9%84%D9%8A%D9%88%202026-%20%D8%B9%D8%AF%D8%AF%20%D8%B1%D9%82%D9%85%201327-%20%D8%A7%D9%84%D8%B3%D9%86%D8%A9%20%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3%D8%A9.html",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "eg.si-limits-2026",
    fecha: "2026-10-24",
    titulo: "حدود أجر الاشتراك التأميني لسنة 2026",
    texto: "منذ أول يناير 2026 أصبح الحد الأدنى لأجر الاشتراك 2,700 جنيه والحد الأقصى 16,700 جنيه في الشهر. حاسبات صافي المرتب والتأمينات وتكلفة صاحب العمل تستخدم الحدود الجديدة.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["eg.net-salary", "eg.social-insurance", "eg.employer-cost", "eg.gross-from-net", "eg.pension"],
    fuente: {
      organismo: "الهيئة القومية للتأمين الاجتماعي",
      titulo: "رفع الحدين الأدنى والأقصى لأجر الاشتراك التأميني بدءًا من أول يناير 2026",
      url: "https://www.nosi.gov.eg/ar/news/Pages/2025-11-30.aspx",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "eg.labour-law-14-2025",
    fecha: "2026-10-24",
    titulo: "قانون العمل الجديد رقم 14 لسنة 2025",
    texto: "يسري قانون العمل الجديد منذ 1 سبتمبر 2025 بدلًا من القانون رقم 12 لسنة 2003. حاسبات الإجازات والعمل الإضافي ومهلة الإخطار والتعويض عن الفصل تتبع مواده.",
    vigenteDesde: "2025-09-01",
    calculadoras: ["eg.annual-leave", "eg.overtime", "eg.notice-period", "eg.unfair-dismissal", "eg.redundancy-pay", "eg.end-of-service", "eg.maternity-leave", "eg.annual-raise"],
    fuente: {
      organismo: "وزارة العمل",
      titulo: "القانون رقم 14 لسنة 2025 بإصدار قانون العمل",
      url: "https://www.labour.gov.eg/media/0iedik3q/%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86-%D8%B1%D9%82%D9%85-14-%D9%84%D8%B3%D9%86%D8%A9-2025-%D8%A8%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D9%82%D8%A7%D9%86%D9%88%D9%86-%D8%A7%D9%84%D8%B9%D9%85%D9%84.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
