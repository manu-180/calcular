import { definirCasos } from "@/motor/calculo";
import gratificacion from "./gratificacion";

export default definirCasos(gratificacion, [
  {
    nombre: "Sueldo de $1.000.000 llega al tope",
    origen: { tipo: "recalculado", detalle: "25 % = 250.000. Tope 4,75 × 553.553 / 12 = 219.114,73 → 219.115. Año: 219.114,73 × 12 = 2.629.376,75 → 2.629.377." },
    fecha: "2026-10-07",
    entrada: { sueldo: 1000000, meses: 12 },
    esperado: { veinticinco: 250000, topeMensual: 219115, mensual: 219115, anual: 2629377 },
  },
  {
    nombre: "Sueldo bajo el tope, medio año",
    origen: { tipo: "recalculado", detalle: "25 % de 600.000 = 150.000 (bajo el tope). × 6 meses = 900.000." },
    fecha: "2026-10-07",
    entrada: { sueldo: 600000, meses: 6 },
    esperado: { mensual: 150000, anual: 900000 },
  },
  {
    nombre: "Tope con el mínimo de enero a abril",
    origen: { tipo: "recalculado", detalle: "30/4/2026: IMM 539.000. 4,75 × 539.000 / 12 = 213.354,17 → 213.354." },
    fecha: "2026-04-30",
    entrada: { sueldo: 1000000, meses: 12 },
    esperado: { imm: 539000, topeMensual: 213354, mensual: 213354 },
  },
  {
    nombre: "Tope con el mínimo de mayo",
    origen: { tipo: "recalculado", detalle: "1/5/2026: IMM 553.553 (Ley 21.830). Tope mensual 219.115." },
    fecha: "2026-05-01",
    entrada: { sueldo: 1000000, meses: 12 },
    esperado: { imm: 553553, topeMensual: 219115 },
  },
]);
