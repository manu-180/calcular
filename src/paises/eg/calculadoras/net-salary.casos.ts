import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary";

export default definirCasos(calculadora, [
  {
    nombre: "مرتب 10,000 جنيه",
    origen: {
      tipo: "recalculado",
      detalle: "تأمينات 11% × 10,000 = 1,100. الدخل السنوي (10,000 − 1,100) × 12 − 20,000 = 86,800. الضريبة 15,000 × 10% + 15,000 × 15% + 16,800 × 20% = 7,110، أي 592.50 شهريًا. الصافي 10,000 − 1,100 − 592.50 = 8,307.50.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 10000, asegurable: null },
    esperado: { neto: 8307.5, aporte: 1100, impuesto: 592.5, gravableAnual: 86800 },
  },
  {
    nombre: "مرتب 7,000 جنيه (الحد الأدنى في القطاع الخاص)",
    origen: { tipo: "recalculado", detalle: "تأمينات 770. الدخل السنوي 6,230 × 12 − 20,000 = 54,760. الضريبة 14,760 × 10% = 1,476، أي 123 شهريًا. الصافي 6,107." },
    fecha: "2026-10-24",
    entrada: { bruto: 7000, asegurable: null },
    esperado: { neto: 6107, impuesto: 123 },
  },
  {
    nombre: "مرتب 30,000 جنيه فوق الحد الأقصى لأجر الاشتراك",
    origen: {
      tipo: "recalculado",
      detalle: "أجر الاشتراك 16,700، التأمينات 1,837. الدخل السنوي (30,000 − 1,837) × 12 − 20,000 = 317,956 ويُقرب إلى 317,950. الضريبة 1,500 + 2,250 + 26,000 + 117,950 × 22.5% = 56,288.75، أي 4,690.73 شهريًا. الصافي 23,472.27.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 30000, asegurable: null },
    esperado: { neto: 23472.27, aporte: 1837, impuesto: 4690.73, base: 16700, gravableAnual: 317950 },
  },
  {
    nombre: "مرتب 60,000 جنيه: دخل سنوي بين 600 و700 ألف",
    origen: {
      tipo: "recalculado",
      detalle: "الدخل السنوي (60,000 − 1,837) × 12 − 20,000 = 677,956 ويُقرب إلى 677,950. تسقط شريحة الإعفاء: 55,000 × 10% + 2,250 + 26,000 + 45,000 + 277,950 × 25% = 148,237.50، أي 12,353.13 شهريًا. الصافي 60,000 − 1,837 − 12,353.13 = 45,809.87.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 60000, asegurable: null },
    esperado: { neto: 45809.87, impuesto: 12353.13 },
  },
  {
    nombre: "أجر اشتراك أقل من المرتب",
    origen: { tipo: "recalculado", detalle: "التأمينات 11% × 8,000 = 880. الدخل السنوي (12,000 − 880) × 12 − 20,000 = 113,440. الضريبة 1,500 + 2,250 + 43,440 × 20% = 12,438، أي 1,036.50. الصافي 12,000 − 880 − 1,036.50 = 10,083.50." },
    fecha: "2026-10-24",
    entrada: { bruto: 12000, asegurable: 8000 },
    esperado: { neto: 10083.5, aporte: 880, impuesto: 1036.5 },
  },
  {
    nombre: "مرتب صفر",
    origen: { tipo: "recalculado", detalle: "لا يمكن حساب صافي مرتب بلا إجمالي." },
    fecha: "2026-10-24",
    entrada: { bruto: 0, asegurable: null },
    esperaError: true,
  },
]);
