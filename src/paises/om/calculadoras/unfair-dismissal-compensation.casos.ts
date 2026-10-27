import { definirCasos } from "@/motor/calculo";
import calculadora from "./unfair-dismissal-compensation";

export default definirCasos(calculadora, [
  {
    nombre: "Seis meses de 600",
    origen: { tipo: "recalculado", detalle: "600 × 6 = 3.600; mínimo 1.800; máximo 7.200." },
    fecha: "2026-10-26",
    entrada: { salario: 600, meses: 6 },
    esperado: { estimado: 3600, minimo: 1800, maximo: 7200 },
  },
  {
    nombre: "Menos del mínimo",
    origen: { tipo: "recalculado", detalle: "2 meses < 3." },
    fecha: "2026-10-26",
    entrada: { salario: 600, meses: 2 },
    esperaError: true,
  },
]);
