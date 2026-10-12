import { definirCasos } from "@/motor/calculo";
import despidoTrabajadorDeConfianza from "./despido-trabajador-de-confianza";

export default definirCasos(despidoTrabajadorDeConfianza, [
  {
    nombre: "Gerente con tres años y C$40,000",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 47: entre 2 y 6 meses de salario con al menos un año continuo. 40000 × 2 = 80000; 40000 × 6 = 240000." },
    fecha: "2026-10-12",
    entrada: { salario: 40000, fechaIngreso: "2023-10-01", fechaSalida: "2026-09-30" },
    esperado: { anios: 3, minimo: 80000, maximo: 240000 },
  },
  {
    nombre: "Menos de un año continuo",
    origen: { tipo: "recalculado", detalle: "Art. 47: sin un año continuo de trabajo no aplica esta indemnización." },
    fecha: "2026-10-12",
    entrada: { salario: 40000, fechaIngreso: "2026-01-15", fechaSalida: "2026-09-30" },
    esperado: { minimo: 0, maximo: 0 },
  },
]);
