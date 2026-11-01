import { definirCasos } from "@/motor/calculo";
import calc from "./kalkulator-zaplata-bruto-neto";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";
const ZB = "https://www.noi.bg/wp-content/uploads/zbdoo-2026.pdf";

export default definirCasos(calc, [
  {
    nombre: "1500 евро бруто",
    origen: { tipo: "recalculado", url: KSO, detalle: "98,70 + 21,00 + 6,00 + 33,00 + 48,00 = 206,70 вноски; (1500 - 206,70) × 10 % = 129,33; нето 1163,97." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500 },
    esperado: { vnoski: 206.7, danak: 129.33, neto: 1163.97 },
  },
  {
    nombre: "Минимална заплата 620,20 евро",
    origen: { tipo: "recalculado", url: KSO, detalle: "40,81 + 8,68 + 2,48 + 13,64 + 19,85 = 85,46; (620,20 - 85,46) × 10 % = 53,47; нето 481,27." },
    fecha: "2026-10-31",
    entrada: { bruto: 620.2 },
    esperado: { vnoski: 85.46, danak: 53.47, neto: 481.27 },
  },
  {
    nombre: "3000 евро след 1 август: таван 2300",
    origen: { tipo: "recalculado", url: ZB, detalle: "Вноски върху 2300: 151,34 + 32,20 + 9,20 + 50,60 + 73,60 = 316,94; данък (3000 - 316,94) × 10 % = 268,31; нето 2414,75." },
    fecha: "2026-08-01",
    entrada: { bruto: 3000 },
    esperado: { vnoski: 316.94, danak: 268.31, neto: 2414.75 },
  },
  {
    nombre: "3000 евро на 31 юли: таван 2111,64",
    origen: { tipo: "recalculado", url: ZB, detalle: "Вноски върху 2111,64: 138,95 + 29,56 + 8,45 + 46,46 + 67,57 = 290,99; данък 270,90; нето 2438,11." },
    fecha: "2026-07-31",
    entrada: { bruto: 3000 },
    esperado: { vnoski: 290.99, danak: 270.9, neto: 2438.11 },
  },
  {
    nombre: "Нулева заплата",
    origen: { tipo: "recalculado", url: KSO, detalle: "Брутото трябва да е над нула." },
    fecha: "2026-10-31",
    entrada: { bruto: 0 },
    esperaError: true,
  },
]);
