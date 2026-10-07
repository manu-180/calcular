import { definirCasos } from "@/motor/calculo";
import cesantias from "./cesantias";

export default definirCasos(cesantias, [
  {
    nombre: "Año completo sin auxilio",
    origen: { tipo: "recalculado", detalle: "4.000.000 × 360 / 360 = 4.000.000. Intereses 4.000.000 × 12 % × 360 / 360 = 480.000." },
    fecha: "2026-10-15",
    entrada: { salario: 4000000, dias: 360, auxilio: true },
    esperado: { base: 4000000, cesantias: 4000000, intereses: 480000, total: 4480000 },
  },
  {
    nombre: "Medio año con salario mínimo y auxilio",
    origen: { tipo: "recalculado", detalle: "Base 2.000.000 × 180 / 360 = 1.000.000. Intereses 1.000.000 × 12 % × 180 / 360 = 60.000." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, dias: 180, auxilio: true },
    esperado: { base: 2000000, cesantias: 1000000, intereses: 60000, total: 1060000 },
  },
  {
    nombre: "Un año no tiene más de 360 días",
    origen: { tipo: "recalculado", detalle: "La función rechaza 361 días." },
    fecha: "2026-10-15",
    entrada: { salario: 2000000, dias: 361, auxilio: false },
    esperaError: true,
  },
]);
