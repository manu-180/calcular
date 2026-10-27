import { definirCasos } from "@/motor/calculo";
import calculadora from "./fixed-term-contract";

export default definirCasos(calculadora, [
  {
    nombre: "Employer ends a contract 70 days early",
    origen: { tipo: "recalculado", detalle: "Art. 36(11): half the full wages for the rest of the term. 70 days = 10 weeks × 500 = 5,000; half = 2,500." },
    fecha: "2026-10-26",
    entrada: { quien: "employer", semanal: 500, termina: "2026-10-26", fin: "2027-01-04" },
    esperado: { monto: 2500, dias: 70, semanas: 10, salarios: 5000 },
  },
  {
    nombre: "Employee leaves 30 days early",
    origen: { tipo: "recalculado", detalle: "Art. 36(12): half the full wages for the rest of the term. 350 × 30 / 7 = 1,500; half = 750." },
    fecha: "2026-10-26",
    entrada: { quien: "employee", semanal: 350, termina: "2026-10-01", fin: "2026-10-31" },
    esperado: { dias: 30, salarios: 1500, monto: 750 },
  },
  {
    nombre: "End date before the last day",
    origen: { tipo: "recalculado", detalle: "Nothing left on the contract." },
    fecha: "2026-10-26",
    entrada: { quien: "employer", semanal: 500, termina: "2026-10-26", fin: "2026-10-20" },
    esperaError: true,
  },
]);
