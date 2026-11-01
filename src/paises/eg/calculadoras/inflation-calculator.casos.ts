import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10,000 جنيه من سبتمبر 2025 إلى سبتمبر 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.capmas.gov.eg/news/13544",
      detalle: "الرقم القياسي 260.9 في سبتمبر 2025 و294.2 في سبتمبر 2026. 10,000 × 294.2 ÷ 260.9 = 11,276.35، أي تضخم سنوي 12.8% كما أعلنه الجهاز.",
    },
    fecha: "2026-10-24",
    entrada: { importe: 10000, desde: "2025-09-15" },
    esperado: { actualizado: 11276.35, indiceFinal: 294.2 },
  },
  {
    nombre: "شهر قبل بداية البيانات",
    origen: { tipo: "recalculado", detalle: "السلسلة تبدأ في أغسطس 2024." },
    fecha: "2026-10-24",
    entrada: { importe: 10000, desde: "2023-01-01" },
    esperaError: true,
  },
]);
