import { definirCasos } from "@/motor/calculo";
import calc from "./kalkulator-za-inflatsia";

const NSI = "https://www.nsi.bg/statistical-data/117/385";

export default definirCasos(calc, [
  {
    nombre: "Януари 2021 г. до септември 2026 г.",
    origen: { tipo: "recalculado", url: NSI, detalle: "105,85 / 71,97 = 1,47075; 1000 × 1,47075 = 1470,75." },
    fecha: "2026-10-31",
    entrada: { suma: 1000, ot: "2021-01-01", do: "2026-09-01" },
    esperado: { dnes: 1470.75, razlika: 470.75, otMesets: "януари 2021 г.", doMesets: "септември 2026 г." },
  },
  {
    nombre: "Краен месец след последните данни",
    origen: { tipo: "recalculado", url: NSI, detalle: "Смята се до последната публикувана точка: септември 2026 г." },
    fecha: "2026-10-31",
    entrada: { suma: 1000, ot: "2021-01-01", do: "2026-10-31" },
    esperado: { dnes: 1470.75, doMesets: "септември 2026 г." },
  },
  {
    nombre: "Начален месец след крайния",
    origen: { tipo: "recalculado", url: NSI, detalle: "Невъзможно въвеждане." },
    fecha: "2026-10-31",
    entrada: { suma: 1000, ot: "2026-05-01", do: "2026-01-01" },
    esperaError: true,
  },
]);
