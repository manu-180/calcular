import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "mr.smig-avril-2026",
    fecha: "2026-10-29",
    titulo: "الأجر الأدنى المضمون يصل إلى 28,846 أوقية للساعة",
    texto:
      "حدد المرسوم رقم 2026-064 الصادر في 23 أبريل 2026 الأجر الأدنى المضمون بين المهن بـ28,846 أوقية للساعة على أساس 40 ساعة في الأسبوع، و25 أوقية للساعة في المؤسسات الزراعية. يسري منذ 1 أبريل 2026 ويلغي مرسوم 2022. تستخدمه حاسبتا الأجر الأدنى ومعاش التقاعد.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["mr.smig", "mr.pension-retraite"],
    fuente: {
      organismo: "وزارة الوظيفة العمومية والعمل",
      titulo: "Décret n° 2026-064 du 23 avril 2026 fixant le taux du SMIG",
      url: "https://www.fonctionpublique.gov.mr/sites/default/files/2026-06/D%C3%A9cret%20n%C2%B0%202026-064%20%3B%20du%2023%20avril%202026%3B%20fixant%20%20(SMIG).pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "mr.lf-2026-transactions-electroniques",
    fecha: "2026-10-29",
    titulo: "قانون المالية لسنة 2026 يحدث رسمًا على المعاملات الإلكترونية",
    texto:
      "أضاف قانون المالية لسنة 2026 إلى المدونة العامة للضرائب رسمًا بنسبة 0,1% على مبلغ الدفع أو التحويل عبر المحافظ الإلكترونية والخدمات المصرفية الرقمية، مع إعفاء العمليات التي تقل عن 5.000 أوقية. ورفع الرسم على عمولات التحويل والسحب والدفع عبر المحافظ إلى 20%. قانون المالية المعدل لسنة 2026 حدد سقفًا للرسم الأول قدره 200 أوقية للعملية.",
    vigenteDesde: "2026-01-01",
    calculadoras: [],
    fuente: {
      organismo: "وزارة المالية",
      titulo: "Loi de finances pour l'année 2026, article 3.1 (articles 278 et 293 octies à 293 terdecies du CGI)",
      url: "https://www.finances.gov.mr/sites/default/files/2026-01/Loi%20de%20Finances%20pour%20l%E2%80%99ann%C3%A9e%202026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
