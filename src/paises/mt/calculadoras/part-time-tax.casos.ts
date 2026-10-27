import { definirCasos } from "@/motor/calculo";
import calculadora from "./part-time-tax";

export default definirCasos(calculadora, [
  {
    nombre: "€6,000 from a part-time job",
    origen: { tipo: "recalculado", detalle: "Art. 90A(11): 10 cents in the euro. 6,000 × 10% = 600." },
    fecha: "2026-10-26",
    entrada: { ingreso: 6000, tipo: "employment" },
    esperado: { impuesto: 600, exceso: 0, neto: 5400 },
  },
  {
    nombre: "€14,000 from part-time employment",
    origen: { tipo: "recalculado", detalle: "S.L. 123.39, rule 3(2): only the first 10,000 qualifies. 1,000 tax; 4,000 at normal rates." },
    fecha: "2026-10-26",
    entrada: { ingreso: 14000, tipo: "employment" },
    esperado: { impuesto: 1000, califica: 10000, exceso: 4000 },
  },
  {
    nombre: "€14,000 from part-time self-employment",
    origen: { tipo: "recalculado", detalle: "Rule 3(2): the limit for self-employment is 12,000. 1,200 tax; 2,000 at normal rates." },
    fecha: "2026-10-26",
    entrada: { ingreso: 14000, tipo: "self-employed" },
    esperado: { impuesto: 1200, exceso: 2000 },
  },
]);
