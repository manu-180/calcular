import { definirCasos } from "@/motor/calculo";
import auxilio from "./auxilio-de-transporte";

export default definirCasos(auxilio, [
  {
    nombre: "Salario mínimo, mes completo",
    origen: { tipo: "recalculado", detalle: "Decreto 1470 de 2025: 249.095. Tope 2 × 1.750.905 = 3.501.810." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, dias: 30 },
    esperado: { tope: 3501810, derecho: "Sí", auxilio: 249095 },
  },
  {
    nombre: "Justo en el tope, 20 días",
    origen: { tipo: "recalculado", detalle: "3.501.810 ≤ tope. 249.095 / 30 × 20 = 166.063,33." },
    fecha: "2026-10-15",
    entrada: { salario: 3501810, dias: 20 },
    esperado: { derecho: "Sí", auxilio: 166063 },
  },
  {
    nombre: "Un peso sobre el tope",
    origen: { tipo: "recalculado", detalle: "3.501.811 > 3.501.810: no corresponde." },
    fecha: "2026-10-15",
    entrada: { salario: 3501811, dias: 30 },
    esperado: { derecho: "No", auxilio: 0 },
  },
]);
