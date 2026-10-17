import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Maternity leave from 1 November 2026",
    origen: { tipo: "recalculado", url: "https://new.kenyalaw.org/akn/ke/act/2007/11/eng@2024-04-26", detalle: "Three months from 1 November 2026: the last day is 31 January 2027." },
    fecha: "2026-10-17",
    entrada: { tipo: "maternity", inicio: "2026-11-01" },
    esperado: { ultimo: "2027-01-31", regreso: "2027-02-01" },
  },
  {
    nombre: "Paternity leave from 19 October 2026",
    origen: { tipo: "recalculado", detalle: "Two weeks: 19 October to 1 November 2026." },
    fecha: "2026-10-17",
    entrada: { tipo: "paternity", inicio: "2026-10-19" },
    esperado: { ultimo: "2026-11-01", regreso: "2026-11-02" },
  },
]);
