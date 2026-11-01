import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "เงินเดือน 30,000 บาท ไม่มีผู้ใช้สิทธิลดหย่อนอื่น",
    origen: {
      tipo: "recalculado",
      detalle:
        "เงินได้ 360,000 หักค่าใช้จ่าย 100,000 ลดหย่อนส่วนตัว 60,000 ประกันสังคม 875×12=10,500 ลดหย่อนได้ 9,000 เงินได้สุทธิ 191,000 ภาษี (191,000−150,000)×5%=2,050 สุทธิทั้งปี 360,000−10,500−2,050=347,450",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 30000, bono: 0, sso: true, conyuge: false, hijos: 0, hijos2561: 0, padres: 0, otras: 0 },
    esperado: { sso: 875, impuesto: 2050, netoAnual: 347450, neto: 28954.17, neta: 191000 },
  },
  {
    nombre: "เงินเดือน 15,000 บาท ไม่ต้องเสียภาษี",
    origen: {
      tipo: "recalculado",
      detalle: "เงินได้ 180,000 หักค่าใช้จ่าย 90,000 ลดหย่อน 60,000+9,000 เงินได้สุทธิ 21,000 อยู่ในขั้นยกเว้น ประกันสังคม 750 ต่อเดือน",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 15000, bono: 0, sso: true, conyuge: false, hijos: 0, hijos2561: 0, padres: 0, otras: 0 },
    esperado: { sso: 750, impuesto: 0, netoAnual: 171000, neto: 14250 },
  },
  {
    nombre: "เงินเดือน 100,000 บาท โบนัส 200,000 คู่สมรสไม่มีเงินได้ บุตร 2 คน",
    origen: {
      tipo: "recalculado",
      detalle:
        "เงินได้ 1,400,000 หักค่าใช้จ่าย 100,000 ลดหย่อน 60,000+60,000+30,000+60,000+9,000=219,000 เงินได้สุทธิ 1,081,000 ภาษี 7,500+20,000+37,500+50,000+81,000×25%=135,250 สุทธิ 1,400,000−10,500−135,250=1,254,250",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 100000, bono: 200000, sso: true, conyuge: true, hijos: 2, hijos2561: 1, padres: 0, otras: 0 },
    esperado: { impuesto: 135250, netoAnual: 1254250, neto: 104520.83, marginal: 25 },
  },
  {
    nombre: "บุตรคนที่ 2 ขึ้นไปมากกว่าที่เป็นไปได้",
    origen: { tipo: "recalculado", detalle: "บุตร 1 คนไม่มีบุตรคนที่ 2" },
    fecha: "2026-10-26",
    entrada: { sueldo: 30000, bono: 0, sso: true, conyuge: false, hijos: 1, hijos2561: 1, padres: 0, otras: 0 },
    esperaError: true,
  },
]);
