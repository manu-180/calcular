import { definirCasos } from "@/motor/calculo";
import calculadora from "./inheritance-tax";

export default definirCasos(calculadora, [
  {
    nombre: "ลูกได้รับมรดก 150 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "(150,000,000−100,000,000)×5% = 2,500,000" },
    fecha: "2026-10-26",
    entrada: { valor: 150000000, relacion: "familia" },
    esperado: { base: 50000000, impuesto: 2500000, tasa: 5 },
  },
  {
    nombre: "บุคคลอื่นได้รับมรดก 130 ล้านบาท",
    origen: { tipo: "recalculado", detalle: "(130,000,000−100,000,000)×10% = 3,000,000" },
    fecha: "2026-10-26",
    entrada: { valor: 130000000, relacion: "otro" },
    esperado: { base: 30000000, impuesto: 3000000, neto: 127000000 },
  },
  {
    nombre: "มรดก 80 ล้านบาท ไม่ต้องเสียภาษี",
    origen: { tipo: "recalculado", detalle: "ไม่เกิน 100 ล้านบาท" },
    fecha: "2026-10-26",
    entrada: { valor: 80000000, relacion: "otro" },
    esperado: { impuesto: 0, base: 0 },
  },
]);
