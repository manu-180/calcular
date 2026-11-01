import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax";

export default definirCasos(calculadora, [
  {
    nombre: "เงินเดือน 40,000 บาท โบนัส 80,000 บาท",
    origen: {
      tipo: "recalculado",
      detalle:
        "ไม่มีโบนัส: 480,000−100,000−69,000 = 311,000 ภาษี 7,500+1,100 = 8,600 มีโบนัส: 560,000−100,000−69,000 = 391,000 ภาษี 7,500+9,100 = 16,600 ภาษีโบนัส 8,000",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 40000, bono: 80000, sso: 9000, otras: 0 },
    esperado: { impuestoSin: 8600, impuestoCon: 16600, impuestoBono: 8000, netoBono: 72000, tasaBono: 10 },
  },
  {
    nombre: "เงินเดือน 15,000 บาท โบนัส 15,000 บาท ไม่เสียภาษี",
    origen: { tipo: "recalculado", detalle: "195,000−97,500−69,000 = 28,500 ยังอยู่ในขั้นยกเว้น" },
    fecha: "2026-10-26",
    entrada: { sueldo: 15000, bono: 15000, sso: 9000, otras: 0 },
    esperado: { impuestoBono: 0, netoBono: 15000 },
  },
]);
