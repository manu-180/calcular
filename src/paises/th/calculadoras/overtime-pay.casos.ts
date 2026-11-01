import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay";

export default definirCasos(calculadora, [
  {
    nombre: "เงินเดือน 24,000 บาท ล่วงเวลา 10 ชั่วโมง",
    origen: { tipo: "recalculado", detalle: "มาตรา 68: 24,000÷(30×8) = 100 บาทต่อชั่วโมง มาตรา 61: 100×1.5×10 = 1,500" },
    fecha: "2026-10-26",
    entrada: { salario: 24000, periodo: "mes", horasDia: 8, extra: 10, feriado: 0, extraFeriado: 0 },
    esperado: { hora: 100, pagoExtra: 1500, total: 1500 },
  },
  {
    nombre: "เงินเดือน 24,000 บาท ทำงานวันหยุด 8 ชั่วโมงและล่วงเวลาวันหยุด 2 ชั่วโมง",
    origen: { tipo: "recalculado", detalle: "มาตรา 62 (1): 100×1×8 = 800 มาตรา 63: 100×3×2 = 600 รวม 1,400" },
    fecha: "2026-10-26",
    entrada: { salario: 24000, periodo: "mes", horasDia: 8, extra: 0, feriado: 8, extraFeriado: 2 },
    esperado: { pagoFeriado: 800, pagoExtraFeriado: 600, total: 1400 },
  },
  {
    nombre: "ค่าจ้างรายวัน 400 บาท ทำงานวันหยุด 8 ชั่วโมง",
    origen: { tipo: "recalculado", detalle: "400÷8 = 50 บาทต่อชั่วโมง มาตรา 62 (2): 50×2×8 = 800 ล่วงเวลา 4 ชั่วโมง 50×1.5×4 = 300" },
    fecha: "2026-10-26",
    entrada: { salario: 400, periodo: "dia", horasDia: 8, extra: 4, feriado: 8, extraFeriado: 0 },
    esperado: { hora: 50, pagoFeriado: 800, pagoExtra: 300, total: 1100, factorFeriado: 2 },
  },
]);
