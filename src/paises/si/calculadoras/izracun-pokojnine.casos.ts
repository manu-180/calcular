import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-pokojnine";

export default definirCasos(calc, [
  { nombre: "40 let", origen: { tipo: "recalculado", detalle: "Preglednica 37. člena ZPIZ-2: 40 let = 63,50 %; 1700 × 63,5 % = 1079,50" }, fecha: "2026-10-31", entrada: { osnova: 1700, doba: 40 }, esperado: { odstotek: 63.5, pokojnina: 1079.5 } },
  { nombre: "30 let", origen: { tipo: "recalculado", detalle: "Preglednica: 30 let = 49,90 %; 1700 × 49,9 % = 848,30" }, fecha: "2026-10-31", entrada: { osnova: 1700, doba: 30 }, esperado: { odstotek: 49.9, pokojnina: 848.3 } },
  { nombre: "Najnižja osnova", origen: { tipo: "recalculado", detalle: "1289,78 × 29,5 % = 380,49" }, fecha: "2026-10-31", entrada: { osnova: 500, doba: 15 }, esperado: { pokojnina: 380.49 } },
  { nombre: "Premalo dobe", origen: { tipo: "recalculado", detalle: "Manj kot 15 let" }, fecha: "2026-10-31", entrada: { osnova: 1700, doba: 10 }, esperaError: true },
]);
