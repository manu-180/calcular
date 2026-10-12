import { definirCasos } from "@/motor/calculo";
import asignacionFamiliar from "./asignacion-familiar";

export default definirCasos(asignacionFamiliar, [
  {
    nombre: "Tramo A, dos cargas",
    origen: {
      tipo: "oficial",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/06/22/44481-B/01/2829298.pdf",
      detalle: "Ley 21.830, art. 4: $22.601 por carga para ingresos de hasta $649.039. Dos cargas: 45.202.",
    },
    fecha: "2026-10-07",
    entrada: { ingreso: 600000, cargas: 2 },
    esperado: { tramo: "A", porCarga: 22601, total: 45202 },
  },
  {
    nombre: "Justo en el límite del tramo A",
    origen: { tipo: "recalculado", detalle: "649.039 sigue en el tramo A (no excede el límite)." },
    fecha: "2026-10-07",
    entrada: { ingreso: 649039, cargas: 1 },
    esperado: { tramo: "A", porCarga: 22601 },
  },
  {
    nombre: "Un peso sobre el límite pasa al tramo B",
    origen: { tipo: "recalculado", detalle: "649.040 excede $649.039: tramo B, $13.870 por carga." },
    fecha: "2026-10-07",
    entrada: { ingreso: 649040, cargas: 3 },
    esperado: { tramo: "B", porCarga: 13870, total: 41610 },
  },
  {
    nombre: "Tramo C y tramo D",
    origen: { tipo: "recalculado", detalle: "1.200.000 está entre 947.990 y 1.478.539: tramo C, $4.382." },
    fecha: "2026-10-07",
    entrada: { ingreso: 1200000, cargas: 1 },
    esperado: { tramo: "C", porCarga: 4382 },
  },
  {
    nombre: "Sobre el último límite no hay monto",
    origen: { tipo: "recalculado", detalle: "Ingreso mayor a $1.478.539: tramo D, $0 (Ley 18.987, letra d)." },
    fecha: "2026-10-07",
    entrada: { ingreso: 1600000, cargas: 2 },
    esperado: { tramo: "D", porCarga: 0, total: 0 },
  },
]);
