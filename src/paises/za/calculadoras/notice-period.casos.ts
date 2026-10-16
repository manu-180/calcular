import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Four months: one week",
    origen: { tipo: "recalculado", detalle: "BCEA section 37(1)(a) as amended in 2002: six months or less, one week." },
    fecha: "2026-10-14",
    entrada: { meses: 4, domestico: false, salario: null },
    esperado: { semanas: 1 },
  },
  {
    nombre: "Eight months: two weeks, with pay",
    origen: { tipo: "recalculado", detalle: "More than six months, up to a year: two weeks. Pay 13 000 / 4.333 × 2 = 6 000.46." },
    fecha: "2026-10-14",
    entrada: { meses: 8, domestico: false, salario: 13000 },
    esperado: { semanas: 2, pago: 6000.46 },
  },
  {
    nombre: "Domestic worker, eight months: four weeks",
    origen: { tipo: "recalculado", detalle: "Section 37(1)(c)(ii): farm or domestic worker employed more than six months, four weeks." },
    fecha: "2026-10-14",
    entrada: { meses: 8, domestico: true, salario: null },
    esperado: { semanas: 4 },
  },
  {
    nombre: "Exactly one year: four weeks",
    origen: { tipo: "recalculado", detalle: "Section 37(1)(c)(i): employed one year or more, four weeks." },
    fecha: "2026-10-14",
    entrada: { meses: 12, domestico: false, salario: null },
    esperado: { semanas: 4 },
  },
]);
