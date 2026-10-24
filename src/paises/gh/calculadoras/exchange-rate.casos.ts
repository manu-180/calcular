import { definirCasos } from "@/motor/calculo";
import calculadora from "./exchange-rate";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 to cedis",
    origen: { tipo: "oficial", url: "https://www.bog.gov.gh/treasury-and-the-markets/daily-interbank-fx-rates/", detalle: "BoG mid rate 16 Oct 2026: 11.6650. 100 × 11.665 = 1,166.50." },
    fecha: "2026-10-18",
    entrada: { monto: 100, sentido: "usd-ghs" },
    esperado: { resultado: 1166.5, tasa: 11.665 },
  },
  {
    nombre: "GH₵1,000 to dollars",
    origen: { tipo: "recalculado", detalle: "1,000 / 11.665 = 85.73." },
    fecha: "2026-10-18",
    entrada: { monto: 1000, sentido: "ghs-usd" },
    esperado: { resultado: 85.73 },
  },
]);
