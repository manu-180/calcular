import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-tax-calculator";

const TAJ = "https://www.jamaicatax.gov.jm/documents/10194/7675012/Feature_Layout_TAJ_Property_Tax_052022.pdf/f2d97afb-9274-e86d-5947-bea766d92f81";

export default definirCasos(calculadora, [
  {
    nombre: "Land valued at J$400,000",
    origen: { tipo: "oficial", url: TAJ, detalle: "Unimproved value of $400,000 or less: $1,000." },
    fecha: "2026-10-24",
    entrada: { valor: 400000 },
    esperado: { anual: 1000 },
  },
  {
    nombre: "Land valued at J$5,000,000",
    origen: {
      tipo: "recalculado",
      url: TAJ,
      detalle: "1,000 + 0.5% of 400,000 + 0.55% of 700,000 + 0.6% of 1,500,000 + 0.65% of 1,500,000 + 0.7% of 500,000 = 29,100.",
    },
    fecha: "2026-10-24",
    entrada: { valor: 5000000 },
    esperado: { anual: 29100, mensual: 2425 },
  },
  {
    nombre: "Land valued at J$20,000,000",
    origen: { tipo: "recalculado", url: TAJ, detalle: "Bands to 12 million add 80,600, then 0.8% of 8,000,000 = 64,000. Total 144,600." },
    fecha: "2026-10-24",
    entrada: { valor: 20000000 },
    esperado: { anual: 144600 },
  },
  {
    nombre: "Land valued at J$35,000,000",
    origen: {
      tipo: "recalculado",
      url: TAJ,
      detalle: "Above 30 million the 12 to 30 million band is 0.85%: 80,600 + 153,000 + 0.9% of 5,000,000 = 278,600.",
    },
    fecha: "2026-10-24",
    entrada: { valor: 35000000 },
    esperado: { anual: 278600 },
  },
]);
