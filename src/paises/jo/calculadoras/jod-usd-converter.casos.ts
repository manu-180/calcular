import { definirCasos } from "@/motor/calculo";
import calculadora from "./jod-usd-converter";

// Solo la fórmula, con la paridad pisada: el dato todavía no está verificado.
export default definirCasos(calculadora, [
  {
    nombre: "100 dinares a dólares",
    origen: { tipo: "recalculado", detalle: "100 / 0,709 = 141,04." },
    fecha: "2026-10-24",
    entrada: { importe: 100, sentido: "jod-usd" },
    valores: { "jo.usd-peg": 0.709 },
    esperado: { resultado: 141.04 },
  },
  {
    nombre: "100 dólares a dinares",
    origen: { tipo: "recalculado", detalle: "100 × 0,709 = 70,9." },
    fecha: "2026-10-24",
    entrada: { importe: 100, sentido: "usd-jod" },
    valores: { "jo.usd-peg": 0.709 },
    esperado: { resultado: 70.9 },
  },
]);
