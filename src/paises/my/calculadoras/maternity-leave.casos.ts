import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave";

export default definirCasos(calculadora, [
  {
    nombre: "RM2,600, eligible",
    origen: { tipo: "recalculado", detalle: "Section 37: 98 days; allowance at the ordinary rate of pay (section 60I, monthly / 26 = 100). 98 × 100 = 9,800." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, noventa: true, cuatro: true },
    esperado: { subsidio: 9800, dias: 98, diario: 100, elegible: "Yes" },
  },
  {
    nombre: "RM3,000, eligible",
    origen: { tipo: "recalculado", detalle: "3,000 / 26 = 115.38; 98 × 115.38 = 11,307.24." },
    fecha: "2026-10-16",
    entrada: { sueldo: 3000, noventa: true, cuatro: true },
    esperado: { subsidio: 11307.24 },
  },
  {
    nombre: "Less than 90 days with the employer",
    origen: { tipo: "recalculado", detalle: "Section 37(2)(a)(i) not met: leave yes, allowance no." },
    fecha: "2026-10-16",
    entrada: { sueldo: 3000, noventa: false, cuatro: true },
    esperado: { subsidio: 0, dias: 98 },
  },
]);
