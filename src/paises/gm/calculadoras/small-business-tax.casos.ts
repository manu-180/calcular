import { definirCasos } from "@/motor/calculo";
import calculadora from "./small-business-tax";

export default definirCasos(calculadora, [
  {
    nombre: "D400,000 turnover pays the 3% final tax",
    origen: { tipo: "recalculado", detalle: "Under D500,000: 3% of 400,000 = 12,000, or 3,000 a quarter." },
    fecha: "2026-10-27",
    entrada: { ventas: 400000, cuentas: "unaudited" },
    esperado: { impuesto: 12000, trimestral: 3000, regimen: "Final turnover tax" },
  },
  {
    nombre: "D500,000 is no longer under the limit",
    origen: { tipo: "recalculado", detalle: "Not under D500,000. Minimum tax 2% of 500,000 = 10,000 with unaudited accounts." },
    fecha: "2026-10-27",
    entrada: { ventas: 500000, cuentas: "unaudited" },
    esperado: { impuesto: 10000, regimen: "Minimum tax on turnover" },
  },
  {
    nombre: "GRA example: D1 million turnover with audited accounts",
    origen: {
      tipo: "oficial",
      url: "https://www.gra.gm/download-file/8d0cd78a-d217-11ed-9b31-029254d29bb1",
      detalle: "Turnover D1,000,000: 1% for audited accounts = D10,000.",
    },
    fecha: "2026-10-27",
    entrada: { ventas: 1000000, cuentas: "audited" },
    esperado: { impuesto: 10000 },
  },
  {
    nombre: "No turnover",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ventas: 0, cuentas: "audited" },
    esperaError: true,
  },
]);
