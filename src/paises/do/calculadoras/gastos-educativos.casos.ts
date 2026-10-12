import { definirCasos } from "@/motor/calculo";
import gastosEducativos from "./gastos-educativos";

export default definirCasos(gastosEducativos, [
  {
    nombre: "Salario de RD$80,000 con RD$150,000 de colegio",
    origen: { tipo: "recalculado", detalle: "SFS 2,432 y AFP 2,296: base anual (80,000 − 4,728) × 12 = 903,264. Tope: 10 % = 90,326.40 y 30 % de 416,220 = 124,866; se deduce 90,326.40. ISR sin deducción: 79,776 + 25 % × (903,264 − 867,123.01) = 88,811.25. Con deducción: 31,216 + 20 % × (812,937.60 − 624,329.01) = 68,937.72. Ahorro 19,873.53." },
    fecha: "2026-10-12",
    entrada: { salario: 80000, gastos: 150000, discapacidad: false },
    esperado: { ingresoAnual: 903264, deduccion: 90326.4, isrSin: 88811.25, isrCon: 68937.72, ahorro: 19873.53 },
  },
  {
    nombre: "Gastos por debajo del tope",
    origen: { tipo: "recalculado", detalle: "60,000: base 677,448. Gastos 30,000, menores que los topes. ISR 31,216 + 20 % × 53,118.99 = 41,839.80; con deducción 35,839.80. Ahorro 6,000." },
    fecha: "2026-10-12",
    entrada: { salario: 60000, gastos: 30000, discapacidad: false },
    esperado: { deduccion: 30000, isrSin: 41839.8, isrCon: 35839.8, ahorro: 6000 },
  },
  {
    nombre: "Persona con discapacidad",
    origen: { tipo: "recalculado", detalle: "150,000: base 1,693,620. Topes: 10 % = 169,362 y 50 % de 416,220 = 208,110; se deduce 169,362. ISR 286,400.25 sin y 244,059.75 con. Ahorro 42,340.50." },
    fecha: "2026-10-12",
    entrada: { salario: 150000, gastos: 300000, discapacidad: true },
    esperado: { deduccion: 169362, ahorro: 42340.5 },
  },
  {
    nombre: "Salario exento",
    origen: { tipo: "recalculado", detalle: "30,000: base anual 338,724, debajo de 416,220. Sin ISR no hay devolución." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, gastos: 50000, discapacidad: false },
    esperado: { isrSin: 0, ahorro: 0 },
  },
]);
