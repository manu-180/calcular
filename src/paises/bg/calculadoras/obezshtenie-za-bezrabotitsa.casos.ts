import { definirCasos } from "@/motor/calculo";
import calc from "./obezshtenie-za-bezrabotitsa";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";
const ZB = "https://www.noi.bg/wp-content/uploads/zbdoo-2026.pdf";

export default definirCasos(calc, [
  {
    nombre: "1500 евро и 5 години стаж",
    origen: { tipo: "recalculado", url: KSO, detalle: "60 % от 71,4286 = 42,86; × 21 = 900,06; 6 месеца = 5400,36." },
    fecha: "2026-10-31",
    entrada: { dohod: 1500, dniMesets: 21, stazh: "do7", sobstveno: false },
    esperado: { den: 42.86, mesechno: 900.06, mesetsi: 6, obshto: 5400.36 },
  },
  {
    nombre: "Висок доход: максимум",
    origen: { tipo: "recalculado", url: ZB, detalle: "60 % от 142,86 = 85,71, таван 54,78 (чл. 11 ЗБДОО)." },
    fecha: "2026-10-31",
    entrada: { dohod: 3000, dniMesets: 21, stazh: "nad15", sobstveno: false },
    esperado: { den: 54.78, mesetsi: 12 },
  },
  {
    nombre: "Напускане по собствено желание",
    origen: { tipo: "recalculado", url: KSO, detalle: "Чл. 54б, ал. 3: минимум 9,21 за 4 месеца; 9,21 × 21 = 193,41; × 4 = 773,64." },
    fecha: "2026-10-31",
    entrada: { dohod: 1500, dniMesets: 21, stazh: "do11", sobstveno: true },
    esperado: { den: 9.21, mesetsi: 4, mesechno: 193.41, obshto: 773.64 },
  },
]);
