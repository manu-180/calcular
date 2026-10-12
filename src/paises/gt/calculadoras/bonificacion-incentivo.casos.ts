import { definirCasos } from "@/motor/calculo";
import bonificacionIncentivo from "./bonificacion-incentivo";

export default definirCasos(bonificacionIncentivo, [
  {
    nombre: "Mes completo",
    origen: { tipo: "recalculado", detalle: "Decreto 37-2001 art. 1: Q250 al mes." },
    fecha: "2026-10-12",
    entrada: { dias: 30 },
    esperado: { mensual: 250, diaria: 8.33, corresponde: 250 },
  },
  {
    nombre: "Quince días trabajados",
    origen: { tipo: "recalculado", detalle: "250 × 15 / 30 = 125." },
    fecha: "2026-10-12",
    entrada: { dias: 15 },
    esperado: { corresponde: 125 },
  },
  {
    nombre: "Diez días trabajados",
    origen: { tipo: "recalculado", detalle: "250 × 10 / 30 = 83.33." },
    fecha: "2026-10-12",
    entrada: { dias: 10 },
    esperado: { corresponde: 83.33 },
  },
]);
