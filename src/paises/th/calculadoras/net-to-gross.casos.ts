import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-to-gross";

export default definirCasos(calculadora, [
  {
    nombre: "ต้องการสุทธิ 28,954.17 บาท ได้เงินเดือน 30,000 บาท",
    origen: {
      tipo: "recalculado",
      detalle: "ย้อนกลับจากกรณีเงินเดือนสุทธิ: เงินเดือน 30,000 หักประกันสังคม 875 และภาษีเฉลี่ย 2,050÷12 = 170.83 เหลือ 28,954.17",
    },
    fecha: "2026-10-26",
    entrada: { neto: 28954.17, sso: true, otras: 0 },
    esperado: { bruto: 30000, sso: 875, costo: 30875 },
    tolerancia: 0.02,
  },
  {
    nombre: "ต้องการสุทธิ 14,250 บาท",
    origen: { tipo: "recalculado", detalle: "เงินเดือน 15,000 หักประกันสังคม 750 ไม่เสียภาษี เหลือ 14,250" },
    fecha: "2026-10-26",
    entrada: { neto: 14250, sso: true, otras: 0 },
    esperado: { bruto: 15000, sso: 750, impuestoMes: 0 },
    tolerancia: 0.02,
  },
]);
