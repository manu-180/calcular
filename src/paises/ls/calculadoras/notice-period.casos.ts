import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "18 months of service: one month",
    origen: { tipo: "recalculado", detalle: "Labour Act s. 130(1)(a): one month. Notice on 27 Oct 2026 ends 27 Nov 2026. Payment in lieu: one month's wage, 6 000." },
    fecha: "2026-10-27",
    entrada: { meses: 18, salario: 6000, aviso: "2026-10-27" },
    esperado: { meses: 1, semanas: null, fin: "2026-11-27", pago: 6000 },
  },
  {
    nombre: "8 months of service: a fortnight",
    origen: { tipo: "recalculado", detalle: "s. 130(1)(b): two weeks. Week's wage 6 000 / 195 × 45 = 1 384.62. Two weeks 2 769.23." },
    fecha: "2026-10-27",
    entrada: { meses: 8, salario: 6000, aviso: "2026-10-27" },
    esperado: { semanas: 2, meses: null, fin: "2026-11-10", pago: 2769.23 },
  },
  {
    nombre: "3 months of service: one week",
    origen: { tipo: "recalculado", detalle: "s. 130(1)(c): one week. 1 384.62." },
    fecha: "2026-10-27",
    entrada: { meses: 3, salario: 6000, aviso: "2026-10-27" },
    esperado: { semanas: 1, fin: "2026-11-03", pago: 1384.62 },
  },
]);
