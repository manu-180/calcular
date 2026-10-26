import { definirCasos } from "@/motor/calculo";
import calculadora from "./freelance-tax";

export default definirCasos(calculadora, [
  {
    nombre: "ฟรีแลนซ์ 600,000 บาท ถูกหัก 3%",
    origen: {
      tipo: "recalculado",
      detalle: "600,000−100,000−60,000 = 440,000 ภาษี 7,500+14,000 = 21,500 ถูกหัก 3% = 18,000 ชำระเพิ่ม 3,500",
    },
    fecha: "2026-10-26",
    entrada: { honorarios: 600000, sueldo: 0, sso: 0, otras: 0, retenido: null },
    esperado: { neta: 440000, impuesto: 21500, retenido: 18000, pagar: 3500 },
  },
  {
    nombre: "ฟรีแลนซ์ 300,000 บาท ขอคืนภาษี",
    origen: { tipo: "recalculado", detalle: "300,000−100,000−60,000 = 140,000 ไม่เสียภาษี ถูกหัก 9,000 ขอคืนได้ทั้งหมด" },
    fecha: "2026-10-26",
    entrada: { honorarios: 300000, sueldo: 0, sso: 0, otras: 0, retenido: null },
    esperado: { impuesto: 0, devolver: 9000 },
  },
  {
    nombre: "มีทั้งเงินเดือนและงานฟรีแลนซ์",
    origen: {
      tipo: "recalculado",
      detalle: "เงินเดือน 360,000 ฟรีแลนซ์ 240,000 หักค่าใช้จ่ายรวมไม่เกิน 100,000 600,000−100,000−60,000−9,000 = 431,000 ภาษี 20,600 ถูกหักที่ใส่เอง 20,000",
    },
    fecha: "2026-10-26",
    entrada: { honorarios: 240000, sueldo: 360000, sso: 9000, otras: 0, retenido: 20000 },
    esperado: { impuesto: 20600, pagar: 600 },
  },
]);
