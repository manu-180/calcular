import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator-vic";

const URL = "https://www.sro.vic.gov.au/buying-property/land-transfer-stamp-duty/concessions-exemptions-and-waivers/principal-place-residence-duty-concession";

export default definirCasos(calculadora, [
  {
    nombre: "SRO example: Aaliyah and Luca, $400,000 home",
    origen: { tipo: "oficial", url: URL, detalle: "Instead of paying $19,070 in land transfer duty, they will pay $16,370. This saves them $2,700." },
    fecha: "2026-10-14",
    entrada: { valor: 400000, vivienda: true, primeraVivienda: false },
    esperado: { general: 19070, duty: 16370, ahorro: 2700 },
  },
  {
    nombre: "SRO example: Amara, $550,000 home",
    origen: { tipo: "oficial", url: URL, detalle: "Instead of paying $28,070 in duty, Amara will pay $24,970. This saves her $3,100." },
    fecha: "2026-10-14",
    entrada: { valor: 550000, vivienda: true, primeraVivienda: false },
    esperado: { general: 28070, duty: 24970, ahorro: 3100 },
  },
  {
    nombre: "First home at $500,000",
    origen: { tipo: "recalculado", detalle: "First home buyers pay no duty on homes up to $600,000." },
    fecha: "2026-10-14",
    entrada: { valor: 500000, vivienda: true, primeraVivienda: true },
    esperado: { duty: 0 },
  },
  {
    nombre: "$1,000,000 investment property",
    origen: { tipo: "recalculado", detalle: "Between $960,000 and $2,000,000: 5.5% of the dutiable value = 55,000." },
    fecha: "2026-10-14",
    entrada: { valor: 1000000, vivienda: false, primeraVivienda: false },
    esperado: { duty: 55000 },
  },
  {
    nombre: "$2,500,000 property",
    origen: { tipo: "recalculado", detalle: "$110,000 plus 6.5% of the amount over $2,000,000 = 142,500." },
    fecha: "2026-10-14",
    entrada: { valor: 2500000, vivienda: true, primeraVivienda: false },
    esperado: { duty: 142500 },
  },
  {
    nombre: "$20,000 property",
    origen: { tipo: "recalculado", detalle: "1.4% of 20,000 = 280." },
    fecha: "2026-10-14",
    entrada: { valor: 20000, vivienda: false, primeraVivienda: false },
    esperado: { duty: 280 },
  },
]);
