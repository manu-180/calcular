import { definirCasos } from "@/motor/calculo";
import calc from "./osiguritelni-vnoski";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";

export default definirCasos(calc, [
  {
    nombre: "1500 евро, родени след 1959 г.",
    origen: { tipo: "recalculado", url: KSO, detalle: "Лице 13,78 % = 206,70; работодател без ТЗПБ 18,52 % = 277,80; общо 484,50." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, predi1960: false },
    esperado: { litse: 206.7, firma: 277.8, obshto: 484.5, dzpoLitse: 33 },
  },
  {
    nombre: "1500 евро, родени преди 1960 г.",
    origen: { tipo: "recalculado", url: KSO, detalle: "Пенсии 8,78 % = 131,70 и 11,02 % = 165,30, без ДЗПО: сборовете не се променят." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, predi1960: true },
    esperado: { pensiiLitse: 131.7, pensiiFirma: 165.3, litse: 206.7, firma: 277.8, dzpoLitse: 0 },
  },
  {
    nombre: "Над тавана",
    origen: { tipo: "recalculado", url: KSO, detalle: "При 4000 евро основата е 2300: 13,78 % = 316,94." },
    fecha: "2026-10-31",
    entrada: { bruto: 4000, predi1960: false },
    esperado: { osnova: 2300, litse: 316.94 },
  },
]);
