import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Basic 1,000 with housing provided and food allowance 300",
    origen: { tipo: "recalculado", detalle: "Decision 25/2020: basic 1,000, food allowance 300 when food isn't provided. Minimum 1,300, nothing missing." },
    fecha: "2026-10-26",
    entrada: { basico: 1000, casa: true, vivienda: null, comidaDada: false, comida: 300 },
    esperado: { falta: 0, minimo: 1300, estado: "Meets the minimum wage" },
  },
  {
    nombre: "No housing or food provided and low allowances",
    origen: { tipo: "recalculado", detalle: "Minimum 1,000 + 500 + 300 = 1,800. Missing 100 (basic) + 200 (housing) + 100 (food) = 400." },
    fecha: "2026-10-26",
    entrada: { basico: 900, casa: false, vivienda: 300, comidaDada: false, comida: 200 },
    esperado: { falta: 400, minimo: 1800, estado: "Below the minimum wage" },
  },
  {
    nombre: "Day the minimum wage came into force",
    origen: { tipo: "recalculado", detalle: "In force six months after publication: 20 March 2021. Housing and food provided, minimum 1,000." },
    fecha: "2021-03-20",
    entrada: { basico: 1000, casa: true, vivienda: null, comidaDada: true, comida: null },
    esperado: { minimo: 1000, falta: 0 },
  },
]);
