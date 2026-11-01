import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "US$500 a month to a resident landlord",
    origen: { tipo: "recalculado", detalle: "LRA: withholding on rent, resident 10% = 50 a month, 600 a year. Landlord gets 450." },
    fecha: "2026-10-27",
    entrada: { renta: 500, periodo: "mes", residente: "rent-resident" },
    esperado: { retencion: 50, neto: 450, anual: 600, tasa: 10 },
  },
  {
    nombre: "US$12,000 a year to a non-resident landlord",
    origen: { tipo: "recalculado", detalle: "Non-resident 15% × 12,000 = 1,800." },
    fecha: "2026-10-27",
    entrada: { renta: 12000, periodo: "anio", residente: "rent-non-resident" },
    esperado: { retencion: 1800, neto: 10200, anual: 1800, tasa: 15 },
  },
  {
    nombre: "No rent",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { renta: 0, periodo: "mes", residente: "rent-resident" },
    esperaError: true,
  },
]);
