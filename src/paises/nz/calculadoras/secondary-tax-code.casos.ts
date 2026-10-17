import { definirCasos } from "@/motor/calculo";
import calculadora from "./secondary-tax-code";

const IR340 = "https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir300---ir399/ir340/ir340-apr-2026.pdf";
const IR330 = "https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir300---ir399/ir330/ir330.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "$50,000 from all jobs, $1,500 from the second job with a student loan",
    origen: {
      tipo: "oficial",
      url: IR340,
      detalle: "IR330: income between $15,601 and $53,500 is code S. IR340 April 2026, weekly $1,500 with code S: PAYE $288.75; secondary student loan $180.",
    },
    fecha: "2026-10-14",
    entrada: { total: 50000, pago: 1500, prestamo: true },
    esperado: { codigo: "S SL", tasa: 19.25, paye: 288.75, prestamo: 180, neto: 1031.25 },
  },
  {
    nombre: "$15,600 is still SB",
    origen: { tipo: "oficial", url: IR330, detalle: "IR330: annual PAYE income of $15,600 or less uses SB. IR340 weekly $1,500 SB: $183.75." },
    fecha: "2026-10-14",
    entrada: { total: 15600, pago: 1500, prestamo: false },
    esperado: { codigo: "SB", paye: 183.75 },
  },
  {
    nombre: "SH, ST and SA",
    origen: { tipo: "oficial", url: IR340, detalle: "IR340 weekly $1,500: SH $476.25 (31.75%)." },
    fecha: "2026-10-14",
    entrada: { total: 70000, pago: 1500, prestamo: false },
    esperado: { codigo: "SH", paye: 476.25 },
  },
  {
    nombre: "ST",
    origen: { tipo: "oficial", url: IR340, detalle: "IR340 weekly $1,500: ST $521.25 (34.75%)." },
    fecha: "2026-10-14",
    entrada: { total: 120000, pago: 1500, prestamo: false },
    esperado: { codigo: "ST", paye: 521.25 },
  },
  {
    nombre: "SA",
    origen: { tipo: "oficial", url: IR340, detalle: "IR340 weekly $1,500: SA $611.25 (40.75%)." },
    fecha: "2026-10-14",
    entrada: { total: 250000, pago: 1500, prestamo: false },
    esperado: { codigo: "SA", paye: 611.25 },
  },
  {
    nombre: "No income",
    origen: { tipo: "recalculado", detalle: "Income of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { total: 0, pago: 100, prestamo: false },
    esperaError: true,
  },
]);
