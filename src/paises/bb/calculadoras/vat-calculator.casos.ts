import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 17.5% to Bds$1,000",
    origen: { tipo: "recalculado", url: "https://bra.gov.bb/Popular-Topics/Value-Added-Tax/VAT-Rates", detalle: "1,000 × 17.5% = 175.00, so the price with VAT is 1,175.00." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, tipo: "standard", modo: "sumar" },
    esperado: { iva: 175, total: 1175, neto: 1000 },
  },
  {
    nombre: "Take VAT out of Bds$1,175",
    origen: { tipo: "recalculado", detalle: "1,175 / 1.175 = 1,000.00 before VAT, so the VAT in the price is 175.00." },
    fecha: "2026-10-27",
    entrada: { importe: 1175, tipo: "standard", modo: "quitar" },
    esperado: { neto: 1000, iva: 175 },
  },
  {
    nombre: "Hotel bill of Bds$800 at 7.5%",
    origen: { tipo: "recalculado", detalle: "800 × 7.5% = 60.00, total 860.00." },
    fecha: "2026-10-27",
    entrada: { importe: 800, tipo: "tourism", modo: "sumar" },
    esperado: { iva: 60, total: 860 },
  },
  {
    nombre: "Phone bill of Bds$200 at 22%",
    origen: { tipo: "recalculado", detalle: "200 × 22% = 44.00, total 244.00." },
    fecha: "2026-10-27",
    entrada: { importe: 200, tipo: "telecom", modo: "sumar" },
    esperado: { iva: 44, total: 244 },
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "A zero amount is rejected." },
    fecha: "2026-10-27",
    entrada: { importe: 0, tipo: "standard", modo: "sumar" },
    esperaError: true,
  },
]);
