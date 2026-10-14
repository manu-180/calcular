import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-tax-relief";

export default definirCasos(calculadora, [
  {
    nombre: "HMRC example: £60,270 income and £12,000 into a relief at source scheme",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief",
      detalle: "The scheme claims the first 20%. Extra 20% on the £10,000 taxed at 40% = £2,000, no extra relief on the other £2,000. You pay 9,600 so the gross is 12,000.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 60270, region: "england-wales-ni", aporte: 9600 },
    esperado: { bruto: 12000, reliefBasico: 2400, extra: 2000, total: 4400, coste: 7600 },
  },
  {
    nombre: "Basic rate taxpayer",
    origen: { tipo: "recalculado", detalle: "Pay 4,000, gross 5,000, relief 1,000. Income 30,000 stays in the basic band: no extra relief." },
    fecha: "2026-10-14",
    entrada: { ingreso: 30000, region: "england-wales-ni", aporte: 4000 },
    esperado: { bruto: 5000, reliefBasico: 1000, extra: 0 },
  },
  {
    nombre: "£110,000 income, contribution restores Personal Allowance",
    origen: {
      tipo: "recalculado",
      detalle: "Pay 8,000, gross 10,000. Tax on 110,000 = 33,432; on 100,000 = 27,432. Relief 6,000 − 2,000 basic = 4,000 extra.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 110000, region: "england-wales-ni", aporte: 8000 },
    esperado: { extra: 4000, total: 6000 },
  },
  {
    nombre: "Scottish higher rate taxpayer",
    origen: {
      tipo: "recalculado",
      detalle: "Income 50,000, gross 5,000: all of it comes from income taxed at 42%, so extra relief is 22% of 5,000 = 1,100.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, region: "scotland", aporte: 4000 },
    esperado: { extra: 1100, total: 2100 },
  },
]);
