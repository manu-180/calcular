import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

const URL = "https://www.gov.uk/capital-gains-tax/rates";

export default definirCasos(calculadora, [
  {
    nombre: "HMRC example 1: gains within the basic band",
    origen: {
      tipo: "oficial",
      url: URL,
      detalle: "Taxable income £20,000 (an income of £32,570 less the Personal Allowance), gains £12,600. After the £3,000 allowance, £9,600 at 18% = £1,728.",
    },
    fecha: "2026-10-14",
    entrada: { ganancia: 12600, ingreso: 32570 },
    esperado: { impuesto: 1728, gravable: 9600 },
  },
  {
    nombre: "HMRC example 2: gains crossing the basic band",
    origen: {
      tipo: "oficial",
      url: URL,
      detalle: "Taxable income £20,000, gains £52,600. £17,700 at 18% and £31,900 at 24%. Total £10,842.",
    },
    fecha: "2026-10-14",
    entrada: { ganancia: 52600, ingreso: 32570 },
    esperado: { impuesto: 10842, aTasaBaja: 17700, aTasaAlta: 31900 },
  },
  {
    nombre: "Higher rate taxpayer",
    origen: { tipo: "recalculado", detalle: "Income 80,000: no basic band left. Gains 20,000 − 3,000 = 17,000 × 24% = 4,080." },
    fecha: "2026-10-14",
    entrada: { ganancia: 20000, ingreso: 80000 },
    esperado: { impuesto: 4080 },
  },
  {
    nombre: "Gains under the annual exempt amount",
    origen: { tipo: "recalculado", detalle: "2,500 is under the 3,000 allowance: no tax." },
    fecha: "2026-10-14",
    entrada: { ganancia: 2500, ingreso: 30000 },
    esperado: { impuesto: 0 },
  },
]);
