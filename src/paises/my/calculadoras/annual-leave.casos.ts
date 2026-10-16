import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "3 years of service, RM3,000, 4 days taken",
    origen: { tipo: "recalculado", detalle: "Section 60E(1)(b): 12 days for 2 to less than 5 years. 12 − 4 = 8 days. Ordinary rate 3,000 / 26 = 115.38; 8 × 115.38 = 923.04." },
    fecha: "2026-10-16",
    entrada: { sueldo: 3000, anios: 3, salida: false, mesesAnio: 12, tomados: 4 },
    esperado: { derecho: 12, pendientes: 8, diario: 115.38, pago: 923.04 },
  },
  {
    nombre: "Leaving after 6 years, 7 months into the year",
    origen: { tipo: "recalculado", detalle: "16 days × 7 / 12 = 9.33, fraction under half dropped: 9 days. 2 taken, 7 left at 2,600 / 26 = 100: 700." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, anios: 6, salida: true, mesesAnio: 7, tomados: 2 },
    esperado: { derecho: 9, pendientes: 7, anual: 16, pago: 700 },
  },
  {
    nombre: "Leaving after 1 year, 7 months into the year",
    origen: { tipo: "recalculado", detalle: "8 days × 7 / 12 = 4.67, half or more counts as a day: 5 days." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2600, anios: 1, salida: true, mesesAnio: 7, tomados: 0 },
    esperado: { derecho: 5, anual: 8 },
  },
  {
    nombre: "Zero wages",
    origen: { tipo: "recalculado", detalle: "Wages of 0 are not a valid input." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, anios: 1, salida: false, mesesAnio: 12, tomados: 0 },
    esperaError: true,
  },
]);
