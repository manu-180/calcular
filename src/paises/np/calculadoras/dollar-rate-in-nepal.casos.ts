import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-rate-in-nepal";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the NRB buying rate of 29 October 2026",
    origen: { tipo: "recalculado", url: "https://www.nrb.org.np/forex/", detalle: "100 × 152.06 = 15,206." },
    fecha: "2026-10-29",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { rupias: 15206, compra: 152.06, venta: 152.66, fecha: "2026-10-29" },
  },
  {
    nombre: "NPR 50,000 to dollars at the selling rate",
    origen: { tipo: "recalculado", detalle: "50,000 / 152.66 = 327.53." },
    fecha: "2026-10-29",
    entrada: { monto: 50000, sentido: "npr" },
    esperado: { dolares: 327.53 },
  },
  {
    nombre: "Negative amount",
    origen: { tipo: "recalculado", detalle: "The amount cannot be negative." },
    fecha: "2026-10-29",
    entrada: { monto: -1, sentido: "usd" },
    esperaError: true,
  },
]);
