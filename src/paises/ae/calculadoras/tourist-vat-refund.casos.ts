import { definirCasos } from "@/motor/calculo";
import calculadora from "./tourist-vat-refund";

export default definirCasos(calculadora, [
  {
    nombre: "AED 5,250 of shopping on two tags",
    origen: {
      tipo: "recalculado",
      detalle: "VAT included: 5,250 x 5 / 105 = 250. 85% of 250 = 212.50, less 2 tags x 4.80 = 9.60. Refund 202.90.",
    },
    fecha: "2026-10-18",
    entrada: { compras: 5250, etiquetas: 2 },
    esperado: { iva: 250, comision: 9.6, reembolso: 202.9 },
  },
  {
    nombre: "No purchases is not valid",
    origen: { tipo: "recalculado", detalle: "Amount 0." },
    fecha: "2026-10-18",
    entrada: { compras: 0, etiquetas: 1 },
    esperaError: true,
  },
]);
