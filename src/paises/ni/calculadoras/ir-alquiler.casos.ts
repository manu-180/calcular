import { definirCasos } from "@/motor/calculo";
import irAlquiler from "./ir-alquiler";

export default definirCasos(irAlquiler, [
  {
    nombre: "Casa alquilada en C$20,000 al mes",
    origen: { tipo: "recalculado", detalle: "LCT art. 80 y 87 (Ley 987): deducción única del 20 % y alícuota del 15 %. 20000 − 4000 = 16000 × 15 % = 2400. Tasa efectiva 12 %. Neto 17600." },
    fecha: "2026-10-12",
    entrada: { alquiler: 20000 },
    esperado: { deduccion: 4000, base: 16000, ir: 2400, tasaEfectiva: 12, neto: 17600 },
  },
  {
    nombre: "Cuarto alquilado en C$3,500",
    origen: { tipo: "recalculado", detalle: "3500 × 80 % = 2800 × 15 % = 420." },
    fecha: "2026-10-12",
    entrada: { alquiler: 3500 },
    esperado: { base: 2800, ir: 420, neto: 3080 },
  },
]);
