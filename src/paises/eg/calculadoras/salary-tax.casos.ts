import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-tax";

export default definirCasos(calculadora, [
  {
    nombre: "مرتب 20,000 جنيه",
    origen: {
      tipo: "recalculado",
      detalle: "أجر الاشتراك 16,700 (الحد الأقصى)، التأمينات 1,837. الدخل السنوي (20,000 − 1,837) × 12 = 217,956، وبعد الإعفاء 197,956 ويُقرب إلى 197,950. الضريبة 1,500 + 2,250 + 127,950 × 20% = 29,340، أي 2,445 شهريًا.",
    },
    fecha: "2026-10-24",
    entrada: { modo: "mensual", bruto: 20000, asegurable: null, anual: null },
    esperado: { impuestoMensual: 2445, impuestoAnual: 29340, gravable: 197950, aporteMensual: 1837 },
  },
  {
    nombre: "دخل سنوي 60,000 جنيه",
    origen: { tipo: "recalculado", detalle: "بعد الإعفاء 40,000، وهي كلها في شريحة الإعفاء. الضريبة صفر." },
    fecha: "2026-10-24",
    entrada: { modo: "anual", bruto: null, asegurable: null, anual: 60000 },
    esperado: { impuestoAnual: 0, gravable: 40000 },
  },
  {
    nombre: "دخل سنوي 1,520,000 جنيه",
    origen: {
      tipo: "recalculado",
      detalle: "بعد الإعفاء 1,500,000 (فوق 1.2 مليون). أول 1,200,000 بنسبة 25% = 300,000، والباقي 300,000 بنسبة 27.5% = 82,500. الإجمالي 382,500.",
    },
    fecha: "2026-10-24",
    entrada: { modo: "anual", bruto: null, asegurable: null, anual: 1520000 },
    esperado: { impuestoAnual: 382500, impuestoMensual: 31875 },
  },
  {
    nombre: "دخل سنوي 850,000 جنيه",
    origen: {
      tipo: "recalculado",
      detalle: "بعد الإعفاء 830,000 (بين 800 و900 ألف). أول 200,000 بنسبة 20% = 40,000، ثم 200,000 بنسبة 22.5% = 45,000، ثم 430,000 بنسبة 25% = 107,500. الإجمالي 192,500.",
    },
    fecha: "2026-10-24",
    entrada: { modo: "anual", bruto: null, asegurable: null, anual: 850000 },
    esperado: { impuestoAnual: 192500 },
  },
]);
