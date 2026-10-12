import { definirCasos } from "@/motor/calculo";
import terminacionContratoPlazoFijo from "./terminacion-contrato-plazo-fijo";

export default definirCasos(terminacionContratoPlazoFijo, [
  {
    nombre: "Tres meses exactos",
    origen: { tipo: "recalculado", detalle: "CT art. 84: del 01/01/2026 al 31/03/2026, 3 meses: 3 días × 6000 / 30 = 600." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, fechaInicio: "2026-01-01", fechaFin: "2026-03-31" },
    esperado: { meses: 3, dias: 3, diario: 200, minimo: 600 },
  },
  {
    nombre: "Con fracción de mes",
    origen: { tipo: "recalculado", detalle: "Del 15/01/2026 al 20/04/2026: 3 meses y 6 días, la fracción cuenta: 4 días × 150 = 600." },
    fecha: "2026-10-12",
    entrada: { salario: 4500, fechaInicio: "2026-01-15", fechaFin: "2026-04-20" },
    esperado: { meses: 4, dias: 4, minimo: 600 },
  },
]);
