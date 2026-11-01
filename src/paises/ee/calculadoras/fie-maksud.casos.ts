import { definirCasos } from "@/motor/calculo";
import fie from "./fie-maksud";

const TUMS = "https://www.riigiteataja.ee/akt/TuMS";

export default definirCasos(fie, [
  {
    nombre: "Kasum 30 000 eurot",
    origen: { tipo: "recalculado", url: TUMS, detalle: "§ 14 lg 53: 30 000 / 1,33 = 22 556,39; sotsiaalmaks 7443,61; 22 556,39 - 8400 = 14 156,39; 22% = 3114,41; jääb 19 441,98." },
    fecha: "2026-10-15",
    entrada: { tulu: 40000, kulud: 10000, maksuvaba: true },
    esperado: { sotsiaalmaks: 7443.61, tulumaks: 3114.41, jaab: 19441.98, miinimum: 3508.56, lagi: 36867.6 },
  },
  {
    nombre: "Väike kasum: sotsiaalmaksu miinimum",
    origen: { tipo: "recalculado", url: TUMS, detalle: "§ 14 lg 54: miinimum 3508,56; alus 1491,44 jääb maksuvaba tulu sisse; jääb 1491,44." },
    fecha: "2026-10-15",
    entrada: { tulu: 5000, kulud: 0, maksuvaba: true },
    esperado: { sotsiaalmaks: 3508.56, tulumaks: 0, jaab: 1491.44 },
  },
  {
    nombre: "Suur kasum: sotsiaalmaksu lagi",
    origen: { tipo: "recalculado", url: "https://www.riigiteataja.ee/akt/SMS", detalle: "§ 2 lg 1 p 5: lagi 111 720 × 33% = 36 867,60; 200 000 - 36 867,60 - 8400 = 154 732,40; 22% = 34 041,13." },
    fecha: "2026-10-15",
    entrada: { tulu: 200000, kulud: 0, maksuvaba: true },
    esperado: { sotsiaalmaks: 36867.6, tulumaks: 34041.13, jaab: 129091.27 },
  },
]);
