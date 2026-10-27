import { definirCasos } from "@/motor/calculo";
import calculadora from "./exchange-rate";

const CBG = "https://www.cbg.gm/indicative-exchange-rates-latest";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 on 27 October 2026",
    origen: { tipo: "oficial", url: CBG, detalle: "CBG daily valuation rate 27 Oct 2026: USD 72.50. 100 × 72.50 = 7,250." },
    fecha: "2026-10-27",
    entrada: { monto: 100, moneda: "usd", sentido: "a-dalasi" },
    esperado: { resultado: 7250, tasa: 72.5, fecha: "2026-10-27" },
  },
  {
    nombre: "D10,000 to euros",
    origen: { tipo: "oficial", url: CBG, detalle: "EUR 84.09 on 27 Oct 2026. 10,000 / 84.09 = 118.92." },
    fecha: "2026-10-27",
    entrada: { monto: 10000, moneda: "eur", sentido: "de-dalasi" },
    esperado: { resultado: 118.92, unidad: "euros" },
  },
  {
    nombre: "£50 the day before",
    origen: { tipo: "oficial", url: CBG, detalle: "GBP 97.92 on 26 Oct 2026. 50 × 97.92 = 4,896." },
    fecha: "2026-10-26",
    entrada: { monto: 50, moneda: "gbp", sentido: "a-dalasi" },
    esperado: { resultado: 4896 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, moneda: "usd", sentido: "a-dalasi" },
    esperaError: true,
  },
]);
