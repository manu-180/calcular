import { definirCasos } from "@/motor/calculo";
import bonoVacacional from "./bono-vacacional";

export default definirCasos(bonoVacacional, [
  {
    nombre: "Primer año con $300 al mes",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 192: 15 días el primer año. $300 / 30 = 10 diarios; 15 × 10 = 150." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, anios: 1 },
    esperado: { diasBono: 15, diarioUsd: 10, bonoUsd: 150, bonoBs: null },
  },
  {
    nombre: "Quinto año en bolívares",
    origen: { tipo: "recalculado", detalle: "15 + 4 = 19 días. Bs 9.000 / 30 = 300 diarios; 19 × 300 = 5.700." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 9000, anios: 5 },
    esperado: { diasBono: 19, diarioBs: 300, bonoBs: 5700, bonoUsd: null },
  },
  {
    nombre: "Veinte años: tope de 30 días",
    origen: { tipo: "recalculado", detalle: "15 + 19 = 34, con tope de 30 días. $300: 30 × 10 = 300." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, anios: 20 },
    esperado: { diasBono: 30, bonoUsd: 300 },
  },
  {
    nombre: "Antes del primer año no hay bono anual",
    origen: { tipo: "recalculado", detalle: "Art. 192: se paga con las vacaciones, que se ganan al cumplir un año (art. 190)." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, anios: 0 },
    esperaError: true,
  },
]);
