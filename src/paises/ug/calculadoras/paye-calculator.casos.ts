import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Resident on Ushs 1,500,000 a month",
    origen: {
      tipo: "recalculado",
      url: "https://ura.go.ug/en/domestic-taxes/paye-rates/",
      detalle: "URA table, 485,001 to 10,000,000: 33,750 + 30% × (1,500,000 − 485,000) = 33,750 + 304,500 = 338,250.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 1500000, residencia: "resident" },
    esperado: { paye: 338250, anual: 4059000, neto: 1161750, marginal: 30 },
  },
  {
    nombre: "Resident at the threshold",
    origen: { tipo: "recalculado", detalle: "0 to 335,000: nil." },
    fecha: "2026-10-24",
    entrada: { mensual: 335000, residencia: "resident" },
    esperado: { paye: 0 },
  },
  {
    nombre: "Resident on Ushs 400,000",
    origen: { tipo: "recalculado", detalle: "20% × (400,000 − 335,000) = 13,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 400000, residencia: "resident" },
    esperado: { paye: 13000, marginal: 20 },
  },
  {
    nombre: "Resident on Ushs 450,000",
    origen: { tipo: "recalculado", detalle: "15,000 + 25% × (450,000 − 410,000) = 25,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 450000, residencia: "resident" },
    esperado: { paye: 25000, marginal: 25 },
  },
  {
    nombre: "Resident on Ushs 12,000,000",
    origen: {
      tipo: "recalculado",
      detalle: "33,750 + 30% × (12,000,000 − 485,000) + 10% × (12,000,000 − 10,000,000) = 33,750 + 3,454,500 + 200,000 = 3,688,250.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 12000000, residencia: "resident" },
    esperado: { paye: 3688250, marginal: 40 },
  },
  {
    nombre: "Non-resident on Ushs 1,000,000",
    origen: { tipo: "recalculado", detalle: "48,500 + 30% × (1,000,000 − 410,000) = 48,500 + 177,000 = 225,500." },
    fecha: "2026-10-24",
    entrada: { mensual: 1000000, residencia: "non-resident" },
    esperado: { paye: 225500 },
  },
  {
    nombre: "Non-resident on Ushs 300,000",
    origen: { tipo: "recalculado", detalle: "10% × 300,000 = 30,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 300000, residencia: "non-resident" },
    esperado: { paye: 30000 },
  },
  {
    nombre: "Zero pay",
    origen: { tipo: "recalculado", detalle: "Pay must be more than zero." },
    fecha: "2026-10-24",
    entrada: { mensual: 0, residencia: "resident" },
    esperaError: true,
  },
]);
