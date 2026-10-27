import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax";

const FOLLETO = "https://www.gra.gm/download-file/8d0ce2c1-d217-11ed-9b31-029254d29bb1";

export default definirCasos(calculadora, [
  {
    nombre: "GRA example: D600,000 residential rent",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "8% of 600,000 = 48,000 a year, 12,000 a quarter." },
    fecha: "2026-10-27",
    entrada: { residencial: 600000, comercial: 0 },
    esperado: { total: 48000, trimestral: 12000 },
  },
  {
    nombre: "GRA example: D1,200,000 commercial rent",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "15% of 1,200,000 = 180,000 a year, 45,000 a quarter." },
    fecha: "2026-10-27",
    entrada: { residencial: 0, comercial: 1200000 },
    esperado: { total: 180000, trimestral: 45000 },
  },
  {
    nombre: "Both kinds of rent",
    origen: { tipo: "recalculado", detalle: "48,000 + 180,000 = 228,000 a year, 57,000 a quarter." },
    fecha: "2026-10-27",
    entrada: { residencial: 600000, comercial: 1200000 },
    esperado: { total: 228000, trimestral: 57000, neto: 1572000 },
  },
  {
    nombre: "No rent",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { residencial: 0, comercial: 0 },
    esperaError: true,
  },
]);
