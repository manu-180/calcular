import { definirCasos } from "@/motor/calculo";
import calculadora from "./rupee-exchange-rate";

const BOM = "https://www.bom.mu/markets/foreign-exchange/consolidated-indicative-exchange-rates";

export default definirCasos(calculadora, [
  {
    nombre: "US$ 100 on 23 October 2026",
    origen: { tipo: "recalculado", url: BOM, detalle: "BOM selling rate 47.86: 100 × 47.86 = 4,786." },
    fecha: "2026-10-24",
    entrada: { monto: 100, moneda: "usd", sentido: "a-rupias" },
    esperado: { rupias: 4786, divisa: null, tasa: 47.86, fecha: "2026-10-23" },
  },
  {
    nombre: "Rs 10,000 to euros",
    origen: { tipo: "recalculado", url: BOM, detalle: "EUR selling rate 53.66: 10,000 / 53.66 = 186.36." },
    fecha: "2026-10-24",
    entrada: { monto: 10000, moneda: "eur", sentido: "de-rupias" },
    esperado: { divisa: 186.36, rupias: null },
  },
  {
    nombre: "GBP 50 on 15 October 2026",
    origen: { tipo: "recalculado", url: BOM, detalle: "GBP selling rate 63.56: 50 × 63.56 = 3,178." },
    fecha: "2026-10-15",
    entrada: { monto: 50, moneda: "gbp", sentido: "a-rupias" },
    esperado: { rupias: 3178, fecha: "2026-10-15" },
  },
]);
