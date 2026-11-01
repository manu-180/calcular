import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay-calculator";

const ACT = "https://www.moice.gov.bt/wp-content/uploads/2022/08/labouract.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "10 hours at the normal rate",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 124: at least the normal rate. 25,000 / 208 = 120.1923 an hour. × 1 × 10 = 1,201.92." },
    fecha: "2026-10-29",
    entrada: { mensual: 25000, horasMes: 208, horasExtra: 10, factor: 1 },
    esperado: { total: 1201.92, hora: 120.19, tarifa: 120.19 },
  },
  {
    nombre: "10 hours at one and a half times",
    origen: { tipo: "recalculado", detalle: "120.1923 × 1.5 × 10 = 1,802.88." },
    fecha: "2026-10-29",
    entrada: { mensual: 25000, horasMes: 208, horasExtra: 10, factor: 1.5 },
    esperado: { total: 1802.88, tarifa: 180.29 },
  },
  {
    nombre: "A rate below the normal rate is refused",
    origen: { tipo: "recalculado", detalle: "Factor 0.5 is below the floor of 1." },
    fecha: "2026-10-29",
    entrada: { mensual: 25000, horasMes: 208, horasExtra: 4, factor: 0.5 },
    esperaError: true,
  },
]);
