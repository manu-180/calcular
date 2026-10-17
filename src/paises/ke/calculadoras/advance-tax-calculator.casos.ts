import { definirCasos } from "@/motor/calculo";
import calculadora from "./advance-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Lorry with 10 tons of load capacity",
    origen: { tipo: "recalculado", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/advance-tax", detalle: "10 × 1,500 = 15,000 a year." },
    fecha: "2026-10-17",
    entrada: { tipo: "goods", toneladas: 10, pasajeros: null },
    esperado: { anual: 15000, mensual: 1250 },
  },
  {
    nombre: "14-seater matatu",
    origen: { tipo: "recalculado", detalle: "14 × 60 × 12 = 10,080 a year." },
    fecha: "2026-10-17",
    entrada: { tipo: "passenger", toneladas: null, pasajeros: 14 },
    esperado: { anual: 10080 },
  },
  {
    nombre: "Pick-up of 1 ton pays the minimum",
    origen: { tipo: "recalculado", detalle: "1 × 1,500 = 1,500, below the minimum of 2,400." },
    fecha: "2026-10-17",
    entrada: { tipo: "goods", toneladas: 1, pasajeros: null },
    esperado: { anual: 2400, calculado: 1500 },
  },
]);
