import { definirCasos } from "@/motor/calculo";
import calculadora from "./acc-weekly-compensation";

export default definirCasos(calculadora, [
  {
    nombre: "80% of $1,200 a week",
    origen: { tipo: "recalculado", detalle: "1,200 × 80% = 960, under the maximum. Pending: rate and maximum not yet verified on acc.co.nz." },
    fecha: "2026-10-14",
    entrada: { semanal: 1200 },
    valores: { "nz.acc-weekly-compensation-rate": 80, "nz.acc-weekly-compensation-max": 2466.2 },
    esperado: { compensacion: 960, quincenal: 1920 },
  },
]);
