import { definirCasos } from "@/motor/calculo";
import sueldoNeto from "./sueldo-neto";

export default definirCasos(sueldoNeto, [
  {
    nombre: "Quincena de 10,000 sin subsidio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tarifa quincenal 2026: 916.20 + (10000 − 8651.41) × 21.36 % = 1204.26. Ingreso mensual 20266.67 pasa el límite del subsidio. SBC = 666.67 × (1 + (15 + 12 × 25 %) / 365) = 699.55. IMSS diario = 699.55 × 2.375 % + (699.55 − 3 × 117.31) × 0.40 % = 18.0048; × 15 = 270.07. Neto 10000 − 1204.26 − 270.07 = 8525.67.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 10000, periodo: "quincenal", region: "general", antiguedad: 1, sbc: null },
    esperado: { diario: 666.67, sbc: 699.55, isr: 1204.26, subsidio: 0, isrRetenido: 1204.26, imss: 270.07, neto: 8525.67 },
  },
  {
    nombre: "Mes de 10,000 con subsidio para el empleo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tarifa mensual: 420.95 + (10000 − 7168.52) × 10.88 % = 729.02. Subsidio 15.02 % × 3566.22 = 535.65. ISR 193.37. SBC 333.33 × 1.049315 = 349.77, debajo de 3 UMA. IMSS 349.77 × 2.375 % × 30.4 = 252.53. Neto 9554.10.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 10000, periodo: "mensual", region: "general", antiguedad: 1, sbc: null },
    esperado: { isr: 729.02, subsidio: 535.65, isrRetenido: 193.37, imss: 252.53, neto: 9554.1 },
  },
  {
    nombre: "Salario mínimo: sin ISR ni cuota obrera",
    origen: { tipo: "recalculado", detalle: "315.04 × 15 = 4725.60. LISR art. 96: sin retención. LSS art. 36: el patrón paga la cuota obrera." },
    fecha: "2026-10-15",
    entrada: { sueldo: 4725.6, periodo: "quincenal", region: "general", antiguedad: 1, sbc: null },
    esperado: { isrRetenido: 0, imss: 0, neto: 4725.6 },
  },
  {
    nombre: "Sueldo alto: el SBC se topa en 25 UMA",
    origen: {
      tipo: "recalculado",
      detalle:
        "SBC tope 25 × 117.31 = 2932.75. IMSS diario 2932.75 × 2.375 % + (2932.75 − 351.93) × 0.40 % = 79.9761; × 30.4 = 2431.27. ISR 37009.69 + (150000 − 141880.67) × 34 % = 39770.26. Neto 107798.47.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 150000, periodo: "mensual", region: "general", antiguedad: 1, sbc: null },
    esperado: { sbc: 2932.75, imss: 2431.27, isrRetenido: 39770.26, neto: 107798.47 },
  },
]);
