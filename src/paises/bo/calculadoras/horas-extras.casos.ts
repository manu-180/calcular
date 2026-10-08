import { definirCasos } from "@/motor/calculo";
import horasExtras from "./horas-extras";

export default definirCasos(horasExtras, [
  {
    nombre: "Diez horas extras con el salario mínimo",
    origen: { tipo: "recalculado", detalle: "Hora 3.300 / 30 / 8 = 13,75; con 100 % de recargo, 27,50 × 10 = 275. Un feriado: 110 de recargo." },
    fecha: "2026-10-07",
    entrada: { haberBasico: 3300, horasExtra: 10, feriados: 1 },
    valores: { "bo.recargo-hora-extra": 100, "bo.recargo-feriado": 100 },
    esperado: { valorHora: 13.75, pagoHoras: 275, pagoFeriados: 110, total: 385 },
  },
]);
