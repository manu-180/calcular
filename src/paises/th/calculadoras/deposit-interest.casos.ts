import { definirCasos } from "@/motor/calculo";
import calculadora from "./deposit-interest";

export default definirCasos(calculadora, [
  {
    nombre: "ฝากประจำ 100,000 บาท 1.5% 12 เดือน",
    origen: { tipo: "recalculado", detalle: "ดอกเบี้ย 100,000×1.5% = 1,500 หักภาษี 15% = 225 สุทธิ 1,275" },
    fecha: "2026-10-26",
    entrada: { monto: 100000, tasa: 1.5, meses: 12, cuenta: "fija", otros: null },
    esperado: { interes: 1500, impuesto: 225, neto: 1275, total: 101275 },
  },
  {
    nombre: "ออมทรัพย์ 500,000 บาท 0.5% ไม่เกินเกณฑ์ยกเว้น",
    origen: { tipo: "recalculado", detalle: "ดอกเบี้ย 2,500 ต่อปี ไม่เกิน 20,000 ได้รับยกเว้น" },
    fecha: "2026-10-26",
    entrada: { monto: 500000, tasa: 0.5, meses: 12, cuenta: "ahorro", otros: 0 },
    esperado: { interes: 2500, impuesto: 0, neto: 2500 },
  },
  {
    nombre: "ออมทรัพย์ 2,000,000 บาท 1.5% ดอกเบี้ยเกินเกณฑ์",
    origen: { tipo: "recalculado", detalle: "ดอกเบี้ย 30,000 เกิน 20,000 หักภาษี 15% = 4,500" },
    fecha: "2026-10-26",
    entrada: { monto: 2000000, tasa: 1.5, meses: 12, cuenta: "ahorro", otros: 0 },
    esperado: { interes: 30000, impuesto: 4500, neto: 25500 },
  },
  {
    nombre: "ฝากประจำ 6 เดือน",
    origen: { tipo: "recalculado", detalle: "50,000×2%×6/12 = 500 หักภาษี 75 สุทธิ 425" },
    fecha: "2026-10-26",
    entrada: { monto: 50000, tasa: 2, meses: 6, cuenta: "fija", otros: null },
    esperado: { interes: 500, impuesto: 75, neto: 425 },
  },
]);
