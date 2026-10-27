import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-transfer-tax-calculator";

const FOLLETO = "https://www.zra.org.zm/wp-content/uploads/2026/06/Property-Transfer.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "House sold for K1,000,000",
    origen: { tipo: "recalculado", url: FOLLETO, detalle: "Land and buildings at 8%: 80,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "land", valor: 1000000, regalo: false },
    esperado: { impuesto: 80000, tasa: 8 },
  },
  {
    nombre: "Mining licence right for K5,000,000",
    origen: { tipo: "recalculado", url: FOLLETO, detalle: "10% × 5,000,000 = 500,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "mining-licence", valor: 5000000, regalo: false },
    esperado: { impuesto: 500000, tasa: 10 },
  },
  {
    nombre: "Plot given to a child",
    origen: { tipo: "recalculado", url: FOLLETO, detalle: "A gift to immediate family has no realised value." },
    fecha: "2026-10-26",
    entrada: { tipo: "land", valor: 300000, regalo: true },
    esperado: { impuesto: 0 },
  },
]);
