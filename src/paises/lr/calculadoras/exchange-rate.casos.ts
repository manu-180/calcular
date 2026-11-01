import { definirCasos } from "@/motor/calculo";
import calculadora from "./exchange-rate";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 to Liberian dollars on 27 October 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.cbl.org.lr/research/buying-selling-rates",
      detalle: "CBL market buying rate L$169.2950/US$1.00 on 27 October 2026: 100 × 169.2950 = 16,929.50.",
    },
    fecha: "2026-10-27",
    entrada: { monto: 100, sentido: "usd-lrd" },
    esperado: { resultado: 16929.5, compra: 169.295, venta: 171.3478 },
  },
  {
    nombre: "L$10,000 to US dollars on 27 October 2026",
    origen: { tipo: "recalculado", detalle: "Selling rate 171.3478: 10,000 ÷ 171.3478 = 58.36." },
    fecha: "2026-10-27",
    entrada: { monto: 10000, sentido: "lrd-usd" },
    esperado: { resultado: 58.36 },
  },
  {
    nombre: "Rate of 20 October 2026",
    origen: { tipo: "oficial", url: "https://www.cbl.org.lr/research/buying-selling-rates", detalle: "Buying L$169.5391 on 20 October 2026: 10 × 169.5391 = 1,695.39." },
    fecha: "2026-10-20",
    entrada: { monto: 10, sentido: "usd-lrd" },
    esperado: { resultado: 1695.39, compra: 169.5391 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, sentido: "usd-lrd" },
    esperaError: true,
  },
]);
