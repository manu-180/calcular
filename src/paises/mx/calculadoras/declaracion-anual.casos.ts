import { definirCasos } from "@/motor/calculo";
import declaracion from "./declaracion-anual";

export default definirCasos(declaracion, [
  {
    nombre: "300,000 de sueldo con 40,000 de deducciones",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tope: menor entre 5 × 42794.64 = 213973.20 y 15 % × 300000 = 45000 → 45000. Base 260000. Tarifa anual 2026 (Anexo 8): 22282.14 + (260000 − 210403.70) × 21.36 % = 32875.91. Retenido 30000: a cargo 2875.91.",
    },
    fecha: "2026-10-15",
    entrada: { ingresos: 300000, retenido: 30000, deducciones: 40000 },
    esperado: { tope: 45000, deducible: 40000, base: 260000, isr: 32875.91, aCargo: 2875.91, aFavor: 0 },
  },
  {
    nombre: "Ingreso alto: manda el tope de 5 UMA anuales",
    origen: {
      tipo: "recalculado",
      detalle: "15 % × 2000000 = 300000 > 213973.20. Base 1786026.80: 444116.23 + (1786026.80 − 1702567.98) × 34 % = 472492.23. Retenido 480000: a favor 7507.77.",
    },
    fecha: "2026-10-15",
    entrada: { ingresos: 2000000, retenido: 480000, deducciones: 400000 },
    esperado: { tope: 213973.2, deducible: 213973.2, isr: 472492.23, aFavor: 7507.77, aCargo: 0 },
  },
  {
    nombre: "Ejercicio 2025 con su tarifa",
    origen: { tipo: "recalculado", detalle: "Tarifa anual 2025: 100000 cae en el tercer renglón: 4461.94 + (100000 − 75984.56) × 10.88 % = 7074.82." },
    fecha: "2025-12-31",
    entrada: { ingresos: 100000, retenido: 7074.82, deducciones: null },
    esperado: { isr: 7074.82, aFavor: 0, aCargo: 0 },
  },
]);
