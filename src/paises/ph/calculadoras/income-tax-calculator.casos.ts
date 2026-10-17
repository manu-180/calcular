import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₱600,000 with ₱29,400 of contributions",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 600,000 − 29,400 = 570,600. Tax 22,500 + (570,600 − 400,000) × 20% = 56,620.",
    },
    fecha: "2026-10-16",
    entrada: { compensacion: 600000, aportes: 29400, beneficios: 50000 },
    esperado: { impuesto: 56620, gravable: 570600, exento: 50000, mensual: 4718.33, marginal: 20 },
  },
  {
    nombre: "Bonuses above the ₱90,000 ceiling",
    origen: {
      tipo: "recalculado",
      detalle: "Bonuses 150,000: 90,000 exempt, 60,000 taxable. Taxable 1,200,000 − 50,000 + 60,000 = 1,210,000. Tax 102,500 + 410,000 × 25% = 205,000.",
    },
    fecha: "2026-10-16",
    entrada: { compensacion: 1200000, aportes: 50000, beneficios: 150000 },
    esperado: { impuesto: 205000, gravable: 1210000, exento: 90000, marginal: 25 },
  },
  {
    nombre: "Same income in 2022 uses the old table",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 570,600 with the 2018 to 2022 table: 30,000 + (570,600 − 400,000) × 25% = 72,650.",
    },
    fecha: "2022-06-30",
    entrada: { compensacion: 600000, aportes: 29400, beneficios: 0 },
    esperado: { impuesto: 72650 },
  },
  {
    nombre: "Exactly ₱250,000 pays nothing",
    origen: { tipo: "recalculado", detalle: "The first 250,000 is taxed at 0%." },
    fecha: "2026-10-16",
    entrada: { compensacion: 250000, aportes: 0, beneficios: 0 },
    esperado: { impuesto: 0, marginal: 0 },
  },
  {
    nombre: "Above ₱8 million",
    origen: { tipo: "recalculado", detalle: "2,202,500 + (10,000,000 − 8,000,000) × 35% = 2,902,500." },
    fecha: "2026-10-16",
    entrada: { compensacion: 10000000, aportes: 0, beneficios: 0 },
    esperado: { impuesto: 2902500, marginal: 35 },
  },
  {
    nombre: "Contributions above compensation",
    origen: { tipo: "recalculado", detalle: "Not a valid input." },
    fecha: "2026-10-16",
    entrada: { compensacion: 10000, aportes: 20000, beneficios: 0 },
    esperaError: true,
  },
]);
