import { definirCasos } from "@/motor/calculo";
import calculadora from "./paternity-leave";

export default definirCasos(calculadora, [
  {
    nombre: "RM2,600, eligible",
    origen: { tipo: "recalculado", detalle: "Section 60FA: 7 consecutive days at the ordinary rate of pay (2,600 / 26 = 100). 7 × 100 = 700." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, doce: true, previos: 0 },
    esperado: { pago: 700, dias: 7, diario: 100 },
  },
  {
    nombre: "Less than 12 months with the employer",
    origen: { tipo: "recalculado", detalle: "Section 60FA(3)(a) not met." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, doce: false, previos: 0 },
    esperado: { pago: 0, dias: 0 },
  },
  {
    nombre: "Sixth confinement",
    origen: { tipo: "recalculado", detalle: "Section 60FA(2): restricted to five confinements." },
    fecha: "2026-10-16",
    entrada: { sueldo: 4000, doce: true, previos: 5 },
    esperado: { pago: 0 },
  },
]);
