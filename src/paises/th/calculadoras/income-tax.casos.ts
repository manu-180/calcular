import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "เงินได้ 600,000 บาท ลดหย่อนส่วนตัวและประกันสังคม",
    origen: {
      tipo: "recalculado",
      detalle: "600,000−100,000−60,000−9,000=431,000 ภาษี 150,000×5%+131,000×10%=7,500+13,100=20,600",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 600000, sso: 9000, conyuge: false, hijos: 0, hijos2561: 0, padres: 0, otras: 0, retenido: 0 },
    esperado: { neta: 431000, impuesto: 20600, pagar: 20600, marginal: 10 },
  },
  {
    nombre: "เงินได้ 3,000,000 บาท ลดหย่อนอื่น 100,000 ถูกหักไว้แล้ว 500,000",
    origen: {
      tipo: "recalculado",
      detalle:
        "3,000,000−100,000−60,000−9,000−100,000=2,731,000 ภาษี 7,500+20,000+37,500+50,000+250,000+731,000×30%=584,300 ชำระเพิ่ม 84,300",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 3000000, sso: 9000, conyuge: false, hijos: 0, hijos2561: 0, padres: 0, otras: 100000, retenido: 500000 },
    esperado: { neta: 2731000, impuesto: 584300, pagar: 84300, devolver: 0, marginal: 30 },
  },
  {
    nombre: "ประกันสังคมเกินเพดานลดหย่อน ภาษีถูกหักเกิน",
    origen: {
      tipo: "recalculado",
      detalle: "300,000−100,000−60,000−9,000 (เพดาน)−30,000 (บิดา)=101,000 ไม่ถึงขั้นเสียภาษี ขอคืน 3,000",
    },
    fecha: "2026-10-26",
    entrada: { ingreso: 300000, sso: 10500, conyuge: false, hijos: 0, hijos2561: 0, padres: 1, otras: 0, retenido: 3000 },
    esperado: { neta: 101000, impuesto: 0, devolver: 3000 },
  },
]);
