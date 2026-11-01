import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Three years of service",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 36(5)(c): more than two years, up to four, is four weeks. Notice given Monday 26 October 2026 runs from Tuesday 27 October to Monday 23 November. Pay in lieu 4 × 500 = 2,000; half is 1,000.",
    },
    fecha: "2026-10-26",
    entrada: { inicio: "2023-09-01", aviso: "2026-10-26", semanal: 500 },
    esperado: { semanas: 4, antiguedad: "3 years and 1 month", empieza: "2026-10-27", termina: "2026-11-23", empleador: 2000, empleado: 1000 },
  },
  {
    nombre: "Exactly one month",
    origen: { tipo: "recalculado", detalle: "Art. 36(5)(a) needs more than one month: no notice." },
    fecha: "2026-10-26",
    entrada: { inicio: "2026-09-26", aviso: "2026-10-26", semanal: null },
    esperado: { semanas: 0 },
  },
  {
    nombre: "One day over six months",
    origen: { tipo: "recalculado", detalle: "Art. 36(5)(b): more than six months is two weeks." },
    fecha: "2026-10-26",
    entrada: { inicio: "2026-04-25", aviso: "2026-10-26", semanal: null },
    esperado: { semanas: 2 },
  },
  {
    nombre: "Seven years and three months",
    origen: { tipo: "recalculado", detalle: "Art. 36(5)(e): 8 weeks plus one for the part year after seven years = 9 weeks." },
    fecha: "2026-10-26",
    entrada: { inicio: "2019-07-15", aviso: "2026-10-26", semanal: null },
    esperado: { semanas: 9 },
  },
  {
    nombre: "Twenty years caps at twelve weeks",
    origen: { tipo: "recalculado", detalle: "Art. 36(5)(e): maximum of twelve weeks." },
    fecha: "2026-10-26",
    entrada: { inicio: "2006-01-10", aviso: "2026-10-26", semanal: null },
    esperado: { semanas: 12 },
  },
  {
    nombre: "Notice given on a Friday",
    origen: { tipo: "recalculado", detalle: "Art. 36(7): notice runs from the next working day. Notice on Friday 4 December 2026; Monday 7 December is the next working day. Two weeks end on Sunday 20 December." },
    fecha: "2026-12-04",
    entrada: { inicio: "2026-05-01", aviso: "2026-12-04", semanal: null },
    esperado: { semanas: 2, empieza: "2026-12-07", termina: "2026-12-20" },
  },
]);
