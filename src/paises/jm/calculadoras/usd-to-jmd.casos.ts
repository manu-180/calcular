import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-jmd";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the BOJ rates of October 23, 2026",
    origen: { tipo: "oficial", url: "https://boj.org.jm/", detalle: "Weighted average buying rate 158.1879. 100 × 158.1879 = 15,818.79." },
    fecha: "2026-10-25",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { jmd: 15818.79, compra: 158.1879, venta: 159.6487 },
  },
  {
    nombre: "J$100,000 to US dollars",
    origen: { tipo: "recalculado", detalle: "Selling rate 159.6487. 100,000 / 159.6487 = 626.38." },
    fecha: "2026-10-25",
    entrada: { monto: 100000, sentido: "jmd" },
    esperado: { usd: 626.38 },
  },
  {
    nombre: "Fixed rates",
    origen: { tipo: "recalculado", detalle: "With a buying rate of 150, US$20 is J$3,000." },
    fecha: "2026-10-25",
    entrada: { monto: 20, sentido: "usd" },
    valores: { "jm.usd-buy": { fecha: "2026-10-23", valor: 150 }, "jm.usd-sell": { fecha: "2026-10-23", valor: 152 } },
    esperado: { jmd: 3000 },
  },
]);
