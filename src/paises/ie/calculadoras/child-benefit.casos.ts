import { definirCasos } from "@/motor/calculo";
import calculadora from "./child-benefit";

const SW19 = "https://assets.gov.ie/static/documents/9c18b85f/20260520_Rates_of_Payment_Booklet_-_SW19_-_2026_May.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Two children",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: €140 a month for each child. 2 × 140 = 280 a month, 3,360 a year." },
    fecha: "2026-10-14",
    entrada: { hijos: 2, gemelos: 0, multiples: 0 },
    esperado: { mensual: 280, anual: 3360 },
  },
  {
    nombre: "A pair of twins",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: twins get one and a half times the rate, €210 each. 2 × 210 = 420." },
    fecha: "2026-10-14",
    entrada: { hijos: 0, gemelos: 2, multiples: 0 },
    esperado: { mensual: 420 },
  },
  {
    nombre: "One child and triplets",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: other multiple births get double, €280 each. 140 + 3 × 280 = 980." },
    fecha: "2026-10-14",
    entrada: { hijos: 1, gemelos: 0, multiples: 3 },
    esperado: { mensual: 980, ninos: 4 },
  },
  {
    nombre: "No children",
    origen: { tipo: "recalculado", detalle: "At least one child is needed." },
    fecha: "2026-10-14",
    entrada: { hijos: 0, gemelos: 0, multiples: 0 },
    esperaError: true,
  },
]);
