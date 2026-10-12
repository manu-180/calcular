import { definirCasos } from "@/motor/calculo";
import sueldoLiquido from "./sueldo-liquido";

export default definirCasos(sueldoLiquido, [
  {
    nombre: "Salario mínimo no agrícola de la circunscripción 1 con bonificación",
    origen: {
      tipo: "recalculado",
      detalle: "IGSS 4.83 % de 4002.28 = 193.31. ISR: renta 12 × 4252.28 = 51027.36 menos 48000 + 3024 + 12 × 193.31 = 53343.72: imponible 0. Líquido 4252.28 − 193.31 = 4058.97.",
    },
    fecha: "2026-10-12",
    entrada: { sueldo: 4002.28, bonificaciones: 250 },
    esperado: { bruto: 4252.28, igss: 193.31, isr: 0, liquido: 4058.97 },
  },
  {
    nombre: "Salario de Q20,000 en el primer tramo del ISR",
    origen: {
      tipo: "recalculado",
      detalle: "IGSS 4.83 % de 20000 = 966. ISR: 243000 − (48000 + 3024 + 11592) = 180384 × 5 % = 9019.20; entre 12 = 751.60. Líquido 20250 − 966 − 751.60 = 18532.40.",
    },
    fecha: "2026-10-12",
    entrada: { sueldo: 20000, bonificaciones: 250 },
    esperado: { igss: 966, isr: 751.6, liquido: 18532.4 },
  },
  {
    nombre: "Día anterior a la deducción extraordinaria de 2026",
    origen: { tipo: "recalculado", detalle: "22/05/2026: sin los Q3,024. Imponible 243000 − 59592 = 183408 × 5 % = 9170.40; entre 12 = 764.20. Líquido 20250 − 966 − 764.20 = 18519.80." },
    fecha: "2026-05-22",
    entrada: { sueldo: 20000, bonificaciones: 250 },
    esperado: { isr: 764.2, liquido: 18519.8 },
  },
]);
