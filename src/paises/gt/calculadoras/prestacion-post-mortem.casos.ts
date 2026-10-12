import { definirCasos } from "@/motor/calculo";
import prestacionPostMortem from "./prestacion-post-mortem";

export default definirCasos(prestacionPostMortem, [
  {
    nombre: "16 años en una empresa grande: tope de 15 meses",
    origen: { tipo: "recalculado", detalle: "CT art. 85 lit. a: 16 años, tope 15 meses en empresas de 20 o más: 15 × 5000 = 75000." },
    fecha: "2026-10-12",
    entrada: { salario: 5000, fechaIngreso: "2010-03-01", fechaFallecimiento: "2026-09-30", empresa: "20-o-mas" },
    esperado: { anios: 16, meses: 15, total: 75000 },
  },
  {
    nombre: "Empresa con menos de 20 trabajadores",
    origen: { tipo: "recalculado", detalle: "Tope de 10 meses: 50000." },
    fecha: "2026-10-12",
    entrada: { salario: 5000, fechaIngreso: "2010-03-01", fechaFallecimiento: "2026-09-30", empresa: "menos-de-20" },
    esperado: { meses: 10, total: 50000 },
  },
  {
    nombre: "Tres años de servicio",
    origen: { tipo: "recalculado", detalle: "Del 15/01/2023 al 30/06/2026: 3 años completos, 3 × 5000 = 15000." },
    fecha: "2026-10-12",
    entrada: { salario: 5000, fechaIngreso: "2023-01-15", fechaFallecimiento: "2026-06-30", empresa: "20-o-mas" },
    esperado: { anios: 3, meses: 3, total: 15000 },
  },
]);
