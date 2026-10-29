import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "SCR 25,000 gross",
    origen: { tipo: "recalculado", detalle: "Income tax 3,216.68 and SPF 5 % of 25,000 = 1,250. Net 25,000 − 3,216.68 − 1,250 = 20,533.32." },
    fecha: "2026-10-29",
    entrada: { bruto: 25000 },
    esperado: { neto: 20533.32, impuesto: 3216.68, spf: 1250, totalDeducido: 4466.68 },
  },
  {
    nombre: "SCR 8,000 gross, no income tax",
    origen: { tipo: "recalculado", detalle: "8,000 is in the 0 % band. SPF 5 % = 400. Net 7,600." },
    fecha: "2026-10-29",
    entrada: { bruto: 8000 },
    esperado: { neto: 7600, impuesto: 0, spf: 400 },
  },
  {
    nombre: "SCR 100,000 gross",
    origen: { tipo: "recalculado", detalle: "Income tax 19,883.38, SPF 5,000. Net 100,000 − 19,883.38 − 5,000 = 75,116.62." },
    fecha: "2026-10-29",
    entrada: { bruto: 100000 },
    esperado: { neto: 75116.62, impuesto: 19883.38, spf: 5000 },
  },
]);
