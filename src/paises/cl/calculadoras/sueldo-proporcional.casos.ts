import { definirCasos } from "@/motor/calculo";
import sueldoProporcional from "./sueldo-proporcional";

export default definirCasos(sueldoProporcional, [
  {
    nombre: "Ingreso el día 16, sueldo de $900.000",
    origen: { tipo: "recalculado", detalle: "900.000 / 30 = 30.000 por día. Del 16 al 30: 15 días = 450.000." },
    fecha: "2026-10-07",
    entrada: { sueldo: 900000, dias: 15 },
    esperado: { valorDia: 30000, proporcional: 450000, descuento: 450000 },
  },
  {
    nombre: "Sueldo mínimo con 20 días",
    origen: { tipo: "recalculado", detalle: "553.553 / 30 = 18.451,77. × 20 = 369.035,33 → 369.035." },
    fecha: "2026-10-07",
    entrada: { sueldo: 553553, dias: 20 },
    esperado: { valorDia: 18452, proporcional: 369035 },
  },
]);
