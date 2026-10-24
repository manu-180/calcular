import { definirCasos } from "@/motor/calculo";
import calculadora from "./gold-zakat-calculator";

const KZH = "https://www.zakathouse.org.kw/calculate.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "100 g of 21 carat gold",
    origen: { tipo: "oficial", url: KZH, detalle: "Kuwait Zakat House, 18/10/2026: 21 ct at KD 36.44 a gram. 100 × 36.44 = 3,644; 2.5% = 91.1." },
    fecha: "2026-10-18",
    entrada: { g24: 0, g22: 0, g21: 100, g18: 0 },
    esperado: { zakat: 91.1, valor: 3644 },
  },
  {
    nombre: "Mixed jewellery",
    origen: { tipo: "recalculado", detalle: "50 × 41.61 + 20 × 38.18 + 30 × 31.24 = 2,080.5 + 763.6 + 937.2 = 3,781.3; 2.5% = 94.533." },
    fecha: "2026-10-18",
    entrada: { g24: 50, g22: 20, g21: 0, g18: 30 },
    esperado: { valor: 3781.3, zakat: 94.533, gramos: 100 },
  },
  {
    nombre: "No gold entered",
    origen: { tipo: "recalculado", detalle: "At least one weight is needed." },
    fecha: "2026-10-18",
    entrada: { g24: 0, g22: 0, g21: 0, g18: 0 },
    esperaError: true,
  },
]);
