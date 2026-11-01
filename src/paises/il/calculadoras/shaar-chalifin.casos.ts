import { definirCasos } from "@/motor/calculo";
import calculadora from "./shaar-chalifin";

export default definirCasos(calculadora, [
  {
    nombre: "100 dólares con el representativo del 23/10/2026",
    origen: { tipo: "recalculado", detalle: "Serie RER_USD_ILS del BOI: 3,112. 100 x 3,112 = 311,20." },
    fecha: "2026-10-24",
    entrada: { matbea: "usd", kivun: "le-shekel", schum: 100 },
    esperado: { totzaa: 311.2, shaar: 3.112 },
  },
  {
    nombre: "1.000 shekels a euros",
    origen: { tipo: "recalculado", detalle: "Serie RER_EUR_ILS: 3,4844. 1.000 / 3,4844 = 286,99." },
    fecha: "2026-10-24",
    entrada: { matbea: "eur", kivun: "mi-shekel", schum: 1000 },
    esperado: { totzaa: 286.99 },
  },
  {
    nombre: "50 libras",
    origen: { tipo: "recalculado", detalle: "Serie RER_GBP_ILS: 4,1624. 50 x 4,1624 = 208,12." },
    fecha: "2026-10-24",
    entrada: { matbea: "gbp", kivun: "le-shekel", schum: 50 },
    esperado: { totzaa: 208.12 },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Monto 0." },
    fecha: "2026-10-24",
    entrada: { matbea: "usd", kivun: "le-shekel", schum: 0 },
    esperaError: true,
  },
]);
