import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

const TABLA = "https://www.gra.gm/download-file/2a69ec11-c633-11ef-b086-029254d29bb1";

export default definirCasos(calculadora, [
  {
    nombre: "GRA brochure example: D50,000 a month",
    origen: {
      tipo: "oficial",
      url: "https://www.gra.gm/download-file/8d0ccc58-d217-11ed-9b31-029254d29bb1",
      detalle: "The PAYE brochure works out D11,333.34 a month on D50,000 (its rows are rounded one by one). Formula: ((600,000 − 76,000) × 25% + 5,000) / 12 = 11,333.33.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 50000, periodo: "mes" },
    esperado: { mensual: 11333.33, anual: 136000 },
    tolerancia: 0.011,
  },
  {
    nombre: "GRA tax table: D3,005 a month",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row 3,000.01 to 3,005.00: tax due 0.25." },
    fecha: "2026-10-27",
    entrada: { ingreso: 3005, periodo: "mes" },
    esperado: { mensual: 0.25 },
  },
  {
    nombre: "GRA tax table: D5,000 a month",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row 4,995.01 to 5,000.00: tax due 175.00." },
    fecha: "2026-10-27",
    entrada: { ingreso: 5000, periodo: "mes" },
    esperado: { mensual: 175, marginal: 15 },
  },
  {
    nombre: "GRA tax table: D100,000 a month",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row 99,995.01 to 100,000.00: tax due 23,833.33." },
    fecha: "2026-10-27",
    entrada: { ingreso: 100000, periodo: "mes" },
    esperado: { mensual: 23833.33 },
  },
  {
    nombre: "D36,000 a year pays nothing",
    origen: { tipo: "recalculado", detalle: "The first D36,000 a year is taxed at 0%." },
    fecha: "2026-10-27",
    entrada: { ingreso: 36000, periodo: "anio" },
    esperado: { anual: 0, mensual: 0 },
  },
  {
    nombre: "D60,000 a year",
    origen: { tipo: "recalculado", detalle: "500 + 1,000 + (60,000 − 56,000) × 15% = 2,100 a year, 175 a month." },
    fecha: "2026-10-27",
    entrada: { ingreso: 60000, periodo: "anio" },
    esperado: { anual: 2100, mensual: 175, netoMensual: 4825 },
  },
  {
    nombre: "No income",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ingreso: 0, periodo: "mes" },
    esperaError: true,
  },
]);
