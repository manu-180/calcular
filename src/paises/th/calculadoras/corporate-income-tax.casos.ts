import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "SME กำไร 2 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "300,000 แรกยกเว้น ส่วน 1,700,000 เสีย 15% = 255,000 อัตราทั่วไป 20% = 400,000" },
    fecha: "2026-10-26",
    entrada: { ganancia: 2000000, capital: 1000000, ingresos: 10000000 },
    esperado: { impuesto: 255000, general: 400000, ahorro: 145000, sme: "ใช่" },
  },
  {
    nombre: "SME กำไร 5 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "2,700,000×15% = 405,000 บวก 2,000,000×20% = 400,000 รวม 805,000" },
    fecha: "2026-10-26",
    entrada: { ganancia: 5000000, capital: 5000000, ingresos: 30000000 },
    esperado: { impuesto: 805000 },
  },
  {
    nombre: "บริษัททุน 10 ล้านบาท กำไร 2 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "ไม่ใช่ SME เสีย 20% ทั้งจำนวน = 400,000" },
    fecha: "2026-10-26",
    entrada: { ganancia: 2000000, capital: 10000000, ingresos: 10000000 },
    esperado: { impuesto: 400000, sme: "ไม่ใช่" },
  },
  {
    nombre: "SME กำไร 250,000 บาท",
    origen: { tipo: "recalculado", detalle: "ไม่เกิน 300,000 ได้รับยกเว้น" },
    fecha: "2026-10-26",
    entrada: { ganancia: 250000, capital: 1000000, ingresos: 3000000 },
    esperado: { impuesto: 0, general: 50000 },
  },
]);
