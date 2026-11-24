import { definirCasos } from "@/motor/calculo";
import calculadora from "./exchange-rate";

const URL = "https://www.tax.gov.kh/kh/exchange-rate?for_year=2026&for_month=10";

export default definirCasos(calculadora, [
  { nombre: "100 ដុល្លារ 30 តុលា 2026", origen: { tipo: "oficial", url: URL, detalle: "អត្រា 4,081 រៀល: 100 x 4,081 = 408,100" }, fecha: "2026-10-30", entrada: { sentido: "a-riel", monto: 100 }, esperado: { resultado: 408100, tasa: 4081 } },
  { nombre: "រៀល ទៅ ដុល្លារ", origen: { tipo: "recalculado", detalle: "408,100 / 4,081 = 100" }, fecha: "2026-10-30", entrada: { sentido: "a-usd", monto: 408100 }, esperado: { resultado: 100 } },
]);
