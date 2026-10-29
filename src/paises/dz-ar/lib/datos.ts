// Etiquetas en árabe de los datos del país que se muestran como opciones (campos opcion-dato).
import { DATOS_B } from "./grupo-b";

export const DATOS = {
  ...DATOS_B,
  "dz.ibs": {
    nombre: "نسب الضريبة على أرباح الشركات",
    etiquetas: {
      production: "إنتاج السلع",
      "btph-tourisme": "البناء والأشغال العمومية والري والسياحة والحمامات المعدنية",
      autres: "الأنشطة الأخرى",
    },
  },
  "dz.ifu-taux": {
    nombre: "نسب الضريبة الجزافية الوحيدة",
    etiquetas: { biens: "إنتاج السلع وبيعها", autres: "الأنشطة الأخرى", "auto-entrepreneur": "المقاول الذاتي" },
  },
  "dz.irg-loyers": {
    nombre: "نسب الضريبة على الدخل الإجمالي على الإيجارات",
    etiquetas: {
      habitation: "الإيجار للسكن",
      professionnel: "محل تجاري أو مهني غير مفروش، أو عقد مع شركة",
      "non-bati": "ملكية غير مبنية",
      agricole: "أرض ذات استعمال فلاحي",
    },
  },
};
