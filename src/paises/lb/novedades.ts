import type { Novedad } from "@/motor/tipos";

const CNSS = "الصندوق الوطني للضمان الاجتماعي";
const VERIFICADO = "2026-11-01";

export const novedades: readonly Novedad[] = [
  {
    id: "lb.family-allowance-may-2026",
    fecha: "2026-05-04",
    titulo: "تقديمات عائلية جديدة وحد أقصى 28 مليون ليرة من أيار 2026",
    texto:
      "حدد المرسوم 2923 التقديمات الشهرية بمبلغ 2,100,000 ليرة عن الزوج أو الزوجة و1,155,000 ليرة عن كل ولد لغاية خمسة أولاد، ورفع الحد الأقصى للكسب الخاضع لحسومات هذا الفرع إلى 28 مليون ليرة. حاسبة التقديمات العائلية تستخدم الأرقام الجديدة.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["lb.family-allowance-calculator"],
    fuente: {
      organismo: CNSS,
      titulo: "مذكرة إعلامية رقم 831 تاريخ 4 أيار 2026",
      url: "https://drive.google.com/file/d/1LXzz54n5z6hZ7fajiek3aZr6EadZqShk/view?usp=sharing",
      tipo: "primaria",
      verificadoEl: VERIFICADO,
    },
  },
  {
    id: "lb.minimum-wage-aug-2025",
    fecha: "2025-08-01",
    titulo: "الحد الأدنى للأجور 28 مليون ليرة في الشهر من آب 2025",
    texto:
      "عيّن المرسوم 699 تاريخ 18 تموز 2025 الحد الأدنى الرسمي بمبلغ 28 مليون ليرة في الشهر و1,300,000 ليرة في اليوم، ويسري من أول آب 2025 بعد نشره في الجريدة الرسمية في 24 تموز.",
    vigenteDesde: "2025-08-01",
    calculadoras: ["lb.minimum-wage"],
    fuente: {
      organismo: CNSS,
      titulo: "مذكرة إعلامية رقم 801 تاريخ 1 آب 2025",
      url: "https://drive.google.com/file/d/1O5iJmz9fbXKtl-3zCSTziPqMp5kDKU4K/view?usp=sharing",
      tipo: "primaria",
      verificadoEl: VERIFICADO,
    },
  },
];
