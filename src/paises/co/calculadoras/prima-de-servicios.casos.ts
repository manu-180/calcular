import { definirCasos } from "@/motor/calculo";
import prima from "./prima-de-servicios";

export default definirCasos(prima, [
  {
    nombre: "Salario mínimo con auxilio, semestre completo",
    origen: { tipo: "recalculado", detalle: "(1.750.905 + 249.095) × 180 / 360 = 1.000.000." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, dias: 180, auxilio: true },
    esperado: { base: 2000000, auxilio: 249095, prima: 1000000 },
  },
  {
    nombre: "Salario sobre el tope del auxilio",
    origen: { tipo: "recalculado", detalle: "4.000.000 > 3.501.810: sin auxilio. 4.000.000 × 180 / 360 = 2.000.000." },
    fecha: "2026-10-15",
    entrada: { salario: 4000000, dias: 180, auxilio: true },
    esperado: { base: 4000000, auxilio: 0, prima: 2000000 },
  },
  {
    nombre: "Salario justo en el tope de dos salarios mínimos",
    origen: { tipo: "recalculado", detalle: "3.501.810 = 2 × 1.750.905: con auxilio. (3.501.810 + 249.095) × 90 / 360 = 937.726,25." },
    fecha: "2026-10-15",
    entrada: { salario: 3501810, dias: 90, auxilio: true },
    esperado: { base: 3750905, prima: 937726 },
  },
  {
    nombre: "Un peso por encima del tope",
    origen: { tipo: "recalculado", detalle: "3.501.811 > 3.501.810: sin auxilio. 3.501.811 × 90 / 360 = 875.452,75." },
    fecha: "2026-10-15",
    entrada: { salario: 3501811, dias: 90, auxilio: true },
    esperado: { base: 3501811, auxilio: 0, prima: 875453 },
  },
  {
    nombre: "Un semestre no tiene más de 180 días",
    origen: { tipo: "recalculado", detalle: "La función rechaza 181 días." },
    fecha: "2026-10-15",
    entrada: { salario: 2000000, dias: 181, auxilio: true },
    esperaError: true,
  },
]);
