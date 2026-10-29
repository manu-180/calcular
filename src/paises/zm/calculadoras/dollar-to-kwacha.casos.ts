import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-kwacha";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the BoZ mid-rate of 23 October 2026",
    origen: { tipo: "recalculado", url: "https://www.boz.zm/api/v1/views/boz_zmw_usd_daily_exchange_rates", detalle: "100 × 20.1203 = 2,012.03." },
    fecha: "2026-10-25",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { kwacha: 2012.03, tasa: 20.1203, fecha: "2026-10-23" },
  },
  {
    nombre: "K5,000 to dollars on 26 October 2026",
    origen: { tipo: "recalculado", detalle: "5,000 / 20.1507 = 248.13." },
    fecha: "2026-10-26",
    entrada: { monto: 5000, sentido: "zmw" },
    esperado: { dolares: 248.13, fecha: "2026-10-26" },
  },
]);
