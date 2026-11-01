import { definirCasos } from "@/motor/calculo";
import calc from "./razhodi-na-rabotodatelya";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";
const ZB = "https://www.noi.bg/wp-content/uploads/zbdoo-2026.pdf";

export default definirCasos(calc, [
  {
    nombre: "1500 евро, вноска 0,4 %",
    origen: { tipo: "recalculado", url: KSO, detalle: "123,30 + 31,50 + 9,00 + 42,00 + 72,00 + 6,00 = 283,80; разход 1783,80." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, tzpb: "r04" },
    esperado: { vnoski: 283.8, razhod: 1783.8, neto: 1163.97 },
  },
  {
    nombre: "1500 евро, вноска 1,1 %",
    origen: { tipo: "recalculado", url: ZB, detalle: "277,80 + 16,50 = 294,30; разход 1794,30 (приложение № 2А)." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, tzpb: "r11" },
    esperado: { vnoski: 294.3, razhod: 1794.3 },
  },
  {
    nombre: "3000 евро над тавана",
    origen: { tipo: "recalculado", url: ZB, detalle: "Основа 2300: 189,06 + 48,30 + 13,80 + 64,40 + 110,40 + 9,20 = 435,16; разход 3435,16." },
    fecha: "2026-10-31",
    entrada: { bruto: 3000, tzpb: "r04" },
    esperado: { vnoski: 435.16, razhod: 3435.16 },
  },
]);
