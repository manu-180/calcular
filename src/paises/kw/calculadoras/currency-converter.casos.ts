import { definirCasos } from "@/motor/calculo";
import calculadora from "./currency-converter";

const USD = "https://www.cbk.gov.kw/en/monetary-policy/market-operations/exchange-rates/usd";

export default definirCasos(calculadora, [
  {
    nombre: "KD 100 to US dollars",
    origen: { tipo: "oficial", url: USD, detalle: "CBK 15.10.2026: 308.150 fils per USD. 100 / 0.30815 = 324.517." },
    fecha: "2026-10-15",
    entrada: { importe: 100, divisa: "usd", sentido: "from-kwd" },
    esperado: { resultado: 324.517, moneda: "USD", tasa: 0.30815, fecha: "2026-10-15" },
  },
  {
    nombre: "INR 10,000 to dinars",
    origen: { tipo: "oficial", url: "https://www.cbk.gov.kw/en/monetary-policy/market-operations/exchange-rates/inr", detalle: "CBK 15.10.2026: 3.244 fils per rupee. 10,000 × 0.003244 = 32.44." },
    fecha: "2026-10-15",
    entrada: { importe: 10000, divisa: "inr", sentido: "to-kwd" },
    esperado: { resultado: 32.44, moneda: "KWD" },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "An amount of 0 is not valid." },
    fecha: "2026-10-15",
    entrada: { importe: 0, divisa: "usd", sentido: "from-kwd" },
    esperaError: true,
  },
]);
