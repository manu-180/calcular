import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-wst";

const URL = "https://www.cbs.gov.ws/daily-exchange-rates";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the CBS rate of 29 October 2026",
    origen: { tipo: "recalculado", url: URL, detalle: "The CBS lists 0.36201 US dollars per tala. 100 / 0.36201 = 276.24." },
    fecha: "2026-10-29",
    entrada: { monto: 100, moneda: "usd", sentido: "a-tala" },
    esperado: { tala: 276.24, tasa: 0.36201, fecha: "2026-10-29" },
  },
  {
    nombre: "WST 100 to New Zealand dollars",
    origen: { tipo: "recalculado", url: URL, detalle: "100 × 0.64306 = 64.31." },
    fecha: "2026-10-29",
    entrada: { monto: 100, moneda: "nzd", sentido: "desde-tala" },
    esperado: { extranjera: 64.31 },
  },
  {
    nombre: "NZ$100 to tala",
    origen: { tipo: "recalculado", url: URL, detalle: "100 / 0.64306 = 155.51." },
    fecha: "2026-10-29",
    entrada: { monto: 100, moneda: "nzd", sentido: "a-tala" },
    esperado: { tala: 155.51 },
  },
]);
