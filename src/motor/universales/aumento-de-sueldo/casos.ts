import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "1.500 con 10 % y 8 % de inflación",
    detalle: "1500 × 1,10 = 1650; diferencia 150 por mes y 1800 por año (12 sueldos). Real = 1,10 ÷ 1,08 − 1 = 1,851852 %.",
    fecha: "2026-10-13",
    entrada: { sueldo: 1500, aumentoPorcentaje: 10, aumentoMonto: null, inflacion: 8, sueldosAnio: 12 },
    esperado: { nuevo: 1650, diferenciaMensual: 150, diferenciaAnual: 1800, porcentaje: 10, real: 1.851852 },
    tolerancia: 0.000001,
  },
  {
    nombre: "200 fijos sobre 2.000 con 13 sueldos",
    detalle: "El monto pisa el porcentaje: 2000 + 200 = 2200, un 10 %. Por año 200 × 13 = 2600. Sin inflación no hay aumento real.",
    fecha: "2026-10-13",
    entrada: { sueldo: 2000, aumentoPorcentaje: 5, aumentoMonto: 200, inflacion: null, sueldosAnio: 13 },
    esperado: { nuevo: 2200, diferenciaMensual: 200, diferenciaAnual: 2600, porcentaje: 10, real: null },
  },
  {
    nombre: "Aumento menor que la inflación",
    detalle: "5 % de aumento con 10 % de inflación: 1,05 ÷ 1,10 − 1 = −4,545455 %.",
    fecha: "2026-10-13",
    entrada: { sueldo: 1000, aumentoPorcentaje: 5, aumentoMonto: null, inflacion: 10, sueldosAnio: 12 },
    esperado: { nuevo: 1050, real: -4.545455 },
    tolerancia: 0.000001,
  },
  {
    nombre: "Sin aumento es un error",
    detalle: "Si no hay porcentaje ni monto, no hay nada que calcular.",
    fecha: "2026-10-13",
    entrada: { sueldo: 1000, aumentoPorcentaje: null, aumentoMonto: null, inflacion: null, sueldosAnio: 12 },
    esperaError: true,
  },
];
