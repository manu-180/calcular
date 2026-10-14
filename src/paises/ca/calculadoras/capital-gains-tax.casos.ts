import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario employee, $20,000 gain",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Taxable gain 10,000 at Ontario 29.65% = 2,965, plus 150 more Ontario Health Premium (taxable income passes 72,000) = 3,115."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "on",
      "venta": 50000,
      "costo": 30000,
      "empleo": 70000
    },
    "esperado": {
      "impuesto": 3115,
      "gravable": 10000,
      "neto": 16885
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "No gain",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Selling price below cost."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "provincia": "on",
      "venta": 10000,
      "costo": 20000,
      "empleo": 50000
    },
    "esperaError": true
  }
]);
