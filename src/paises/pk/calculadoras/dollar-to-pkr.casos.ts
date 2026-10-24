import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-pkr";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the SBP rate of 16 October 2026",
    origen: { tipo: "recalculado", detalle: "M2M revaluation rate 276.9115: 100 × 276.9115 = 27,691.15." },
    fecha: "2026-10-16",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { rupias: 27691.15, dolares: null, tasa: 276.9115, fecha: "2026-10-16" },
  },
  {
    nombre: "Rs. 100,000 to dollars",
    origen: { tipo: "recalculado", detalle: "100,000 / 276.9115 = 361.13." },
    fecha: "2026-10-17",
    entrada: { monto: 100000, sentido: "pkr" },
    esperado: { dolares: 361.13 },
  },
]);
