import { definirCasos } from "@/motor/calculo";
import isv from "./isv";

export default definirCasos(isv, [
  {
    nombre: "Agregar el 15 % a L1,000",
    origen: { tipo: "recalculado", detalle: "Ley del ISV, art. 6: tasa general del 15 %. 1000 × 15 % = 150; total 1150." },
    fecha: "2026-10-07",
    entrada: { monto: 1000, operacion: "agregar", tasa: "general" },
    esperado: { tasa: 15, base: 1000, isv: 150, total: 1150 },
  },
  {
    nombre: "Quitar el 15 % de L1,150",
    origen: { tipo: "recalculado", detalle: "1150 / 1.15 = 1000; ISV = 150." },
    fecha: "2026-10-07",
    entrada: { monto: 1150, operacion: "quitar", tasa: "general" },
    esperado: { base: 1000, isv: 150, total: 1150 },
  },
  {
    nombre: "Cerveza con el 18 %",
    origen: { tipo: "recalculado", detalle: "Art. 6: 18 % para cerveza, licores y cigarrillos. 250 × 18 % = 45; total 295." },
    fecha: "2026-10-07",
    entrada: { monto: 250, operacion: "agregar", tasa: "especial" },
    esperado: { tasa: 18, isv: 45, total: 295 },
  },
  {
    nombre: "Quitar el 18 % de L100",
    origen: { tipo: "recalculado", detalle: "100 / 1.18 = 84.75; ISV = 15.25." },
    fecha: "2026-10-07",
    entrada: { monto: 100, operacion: "quitar", tasa: "especial" },
    esperado: { base: 84.75, isv: 15.25, total: 100 },
  },
]);
