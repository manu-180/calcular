import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-rate";

export default definirCasos(calculadora, [
  {
    nombre: "Fórmula con una tasa de prueba",
    origen: { tipo: "recalculado", detalle: "Solo la fórmula: 100 × 120 = 12,000 (la tasa no es un dato verificado)." },
    fecha: "2026-10-24",
    entrada: { monto: 100, sentido: "usd" },
    valores: { "bd.usd-bdt": 120 },
    esperado: { taka: 12000, dolares: null },
  },
]);
