import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-allowance-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Industrial building of BND 100,000, 2 years",
    origen: { tipo: "oficial", url: "https://www.mof.gov.bn/div_revenue_typesoftaxes_incometax/", detalle: "Initial allowance 20% and annual allowance 4% of the cost: 20,000 and 4,000 a year." },
    fecha: "2026-10-29",
    entrada: { costo: 100000, activo: "industrial", tasaPlanta: null, anios: 2 },
    esperado: { inicial: 20000, reclamado: 8000, residual: 72000, anualProximo: 4000 },
  },
  {
    nombre: "Plant of BND 200,000 at 10%, 2 years",
    origen: { tipo: "recalculado", detalle: "Initial 20% = 40,000. On 160,000 at 10% a year for 2 years: 160,000 x (1 - 0.9 x 0.9) = 30,400. Left 129,600, next year 12,960." },
    fecha: "2026-10-29",
    entrada: { costo: 200000, activo: "plant", tasaPlanta: 10, anios: 2 },
    esperado: { inicial: 40000, reclamado: 30400, residual: 129600, anualProximo: 12960 },
  },
  {
    nombre: "Plant rate outside the range",
    origen: { tipo: "oficial", url: "https://www.mof.gov.bn/div_revenue_typesoftaxes_incometax/", detalle: "The Collector sets plant rates between 3% and 25%." },
    fecha: "2026-10-29",
    entrada: { costo: 200000, activo: "plant", tasaPlanta: 30, anios: 1 },
    esperaError: true,
  },
]);
