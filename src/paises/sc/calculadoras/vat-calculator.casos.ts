import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add VAT to SCR 1,000",
    origen: { tipo: "recalculado", detalle: "15 % of 1,000 = 150, so the price with VAT is 1,150." },
    fecha: "2026-10-29",
    entrada: { modo: "add", monto: 1000 },
    esperado: { neto: 1000, iva: 150, bruto: 1150 },
  },
  {
    nombre: "Take VAT out of SCR 1,150",
    origen: { tipo: "recalculado", detalle: "1,150 ÷ 1.15 = 1,000, so the VAT inside is 150." },
    fecha: "2026-10-29",
    entrada: { modo: "remove", monto: 1150 },
    esperado: { neto: 1000, iva: 150, bruto: 1150 },
  },
  {
    nombre: "Import example from the SRC FAQ",
    origen: { tipo: "oficial", url: "https://src.gov.sc/faq/", detalle: "The SRC FAQ computes VAT of SCR 390 on an import base of SCR 2,600 (2,000 customs value plus 600 duty) at 15 %." },
    fecha: "2026-10-29",
    entrada: { modo: "add", monto: 2600 },
    esperado: { iva: 390, bruto: 2990 },
  },
]);
