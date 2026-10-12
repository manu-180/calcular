import { definirCasos } from "@/motor/calculo";
import cuotasImss from "./cuotas-imss";

export default definirCasos(cuotasImss, [
  {
    nombre: "SBC de 500 diarios, clase I, mes de 30 días",
    origen: {
      tipo: "recalculado",
      detalle:
        "Excedente 500 − 3 × 117.31 = 148.07. Obrero: 148.07 × 0.40 % + 500 × 2.375 % = 12.46728 × 30 = 374.02. Patrón IMSS: 117.31 × 20.4 % + 148.07 × 1.10 % + 500 × (0.70 + 1.05 + 1.75 + 1 + 0.54355) % = 50.77776 × 30 = 1523.33. 500 / 117.31 = 4.26 UMA: cesantía 7.513 % (tabla 2026), RCV 500 × 9.513 % × 30 = 1426.95. Infonavit 500 × 5 % × 30 = 750.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 15000, periodo: "mensual", region: "general", antiguedad: 1, sbc: 500, clase: "clase-i", primaRiesgo: null, dias: 30 },
    esperado: { sbc: 500, tasaCesantia: 7.513, obrero: 374.02, imssPatron: 1523.33, rcvPatron: 1426.95, infonavit: 750, totalPatron: 3700.28 },
  },
  {
    nombre: "Salario mínimo: la empresa paga la parte del trabajador",
    origen: {
      tipo: "recalculado",
      detalle:
        "SBC 315.04 = salario mínimo. Cuota obrera 315.04 × 2.375 % = 7.4822 la paga la empresa. Patrón IMSS: 23.93124 + 315.04 × 5.04355 % + 7.4822 = 47.30264 × 30 = 1419.08. Cesantía de un salario mínimo 3.150 %: 315.04 × 5.15 % × 30 = 486.74. Infonavit 472.56.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 315.04, periodo: "diario", region: "general", antiguedad: 1, sbc: 315.04, clase: "clase-i", primaRiesgo: null, dias: 30 },
    esperado: { sbc: 315.04, tasaCesantia: 3.15, obrero: 0, imssPatron: 1419.08, rcvPatron: 486.74, infonavit: 472.56, totalPatron: 2378.38 },
  },
  {
    nombre: "SBC por encima del tope de 25 UMA, mes de 31 días",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tope 25 × 117.31 = 2932.75. Excedente 2580.82. Obrero (10.32328 + 69.65281) × 31 = 2479.26. Patrón IMSS (23.93124 + 28.38902 + 147.91471) × 31 = 6207.28. RCV 2932.75 × 9.513 % × 31 = 8648.77. Infonavit 146.6375 × 31 = 4545.76.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 150000, periodo: "mensual", region: "general", antiguedad: 1, sbc: 5000, clase: "clase-i", primaRiesgo: null, dias: 31 },
    esperado: { sbc: 2932.75, obrero: 2479.26, imssPatron: 6207.28, rcvPatron: 8648.77, infonavit: 4545.76, totalPatron: 19401.81 },
  },
  {
    nombre: "SBC estimado con prestaciones de ley y prima propia",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 12000 / 30 = 400; factor 1 + (15 + 12 × 25 %) / 365 = 1.0493151; SBC 419.73. 419.73 / 117.31 = 3.58 UMA: cesantía 6.613 %.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 12000, periodo: "mensual", region: "general", antiguedad: 1, sbc: null, clase: "clase-i", primaRiesgo: 2, dias: 30 },
    esperado: { sbc: 419.73, tasaCesantia: 6.613 },
  },
  {
    nombre: "Prima de riesgo fuera del rango de ley",
    origen: { tipo: "recalculado", detalle: "LSS art. 74: la prima va de 0.5 % a 15 %." },
    fecha: "2026-10-15",
    entrada: { sueldo: 12000, periodo: "mensual", region: "general", antiguedad: 1, sbc: null, clase: "clase-i", primaRiesgo: 0.2, dias: 30 },
    esperaError: true,
  },
]);
