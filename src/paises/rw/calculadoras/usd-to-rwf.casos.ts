import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-rwf";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 on 26 October 2026",
    origen: { tipo: "recalculado", detalle: "BNR average rate 1,476.015: 100 × 1,476.015 = 147,601.5, rounded to 147,602." },
    fecha: "2026-10-26",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { francos: 147602, tasa: 1476.015, fecha: "2026-10-26" },
  },
  {
    nombre: "RWF 1,000,000 to euros",
    origen: { tipo: "recalculado", detalle: "1,000,000 ÷ 1,656.2364 = 603.78." },
    fecha: "2026-10-26",
    entrada: { monto: 1000000, sentido: "rwf-eur" },
    esperado: { divisa: 603.78 },
  },
]);
