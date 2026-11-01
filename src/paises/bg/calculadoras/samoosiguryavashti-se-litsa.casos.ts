import { definirCasos } from "@/motor/calculo";
import calc from "./samoosiguryavashti-se-litsa";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";
const NOI = "https://www.noi.bg/samoosiguryavashti-se-lica/osiguriavane-samoosiguriavashti-lica/";

export default definirCasos(calc, [
  {
    nombre: "1000 евро с майчинство",
    origen: { tipo: "recalculado", url: KSO, detalle: "148 + 50 + 35 + 80 = 313." },
    fecha: "2026-10-31",
    entrada: { dohod: 1000, ozm: true, predi1960: false },
    esperado: { mesechno: 313, godishno: 3756 },
  },
  {
    nombre: "Минимум от август",
    origen: { tipo: "recalculado", url: NOI, detalle: "Основа 620,20: 91,79 + 31,01 + 21,71 + 49,62 = 194,13." },
    fecha: "2026-08-01",
    entrada: { dohod: 100, ozm: true, predi1960: false },
    esperado: { osnova: 620.2, mesechno: 194.13 },
  },
  {
    nombre: "Минимум преди август",
    origen: { tipo: "recalculado", url: NOI, detalle: "На 31.07.2026 г. минимумът е 550,66." },
    fecha: "2026-07-31",
    entrada: { dohod: 100, ozm: true, predi1960: false },
    esperado: { osnova: 550.66 },
  },
  {
    nombre: "Над тавана, без майчинство, родени преди 1960 г.",
    origen: { tipo: "recalculado", url: KSO, detalle: "Основа 2300: 19,8 % = 455,40; 8 % = 184,00; общо 639,40." },
    fecha: "2026-10-31",
    entrada: { dohod: 5000, ozm: false, predi1960: true },
    esperado: { osnova: 2300, mesechno: 639.4, dzpo: 0, ozm: 0 },
  },
]);
