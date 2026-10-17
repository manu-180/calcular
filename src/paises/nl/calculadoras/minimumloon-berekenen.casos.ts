import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimumloon-berekenen";

const BRON = "https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026" as const;

export default definirCasos(calculadora, [
  {
    nombre: "21 jaar en ouder per 1 juli 2026, 36 uur",
    origen: { tipo: "oficial", url: BRON, detalle: "€ 14,99 per uur. 36 uur: 539,64 per week; × 52 = 28.061,28 per jaar; ÷ 12 = 2.338,44; vakantiegeld 8% = 2.244,90." },
    fecha: "2026-10-14",
    entrada: { leeftijd: "21-plus", uren: 36, uurloon: null },
    esperado: { perUur: 14.99, perWeek: 539.64, perJaar: 28061.28, perMaand: 2338.44, vakantiegeld: 2244.9 },
  },
  {
    nombre: "Laatste dag van de bedragen per 1 januari 2026",
    origen: { tipo: "oficial", url: BRON, detalle: "21 jaar en ouder per 1 januari 2026: € 14,71. 40 uur: 588,40 per week." },
    fecha: "2026-06-30",
    entrada: { leeftijd: "21-plus", uren: 40, uurloon: null },
    esperado: { perUur: 14.71, perWeek: 588.4 },
  },
  {
    nombre: "Eerste dag van de bedragen per 1 juli 2026, 18 jaar",
    origen: { tipo: "oficial", url: BRON, detalle: "18 jaar per 1 juli 2026: € 7,50. 20 uur: 150 per week." },
    fecha: "2026-07-01",
    entrada: { leeftijd: "18", uren: 20, uurloon: null },
    esperado: { perUur: 7.5, perWeek: 150 },
  },
  {
    nombre: "16 jaar, uurloon onder het minimum",
    origen: { tipo: "recalculado", detalle: "16 jaar per 1 juli 2026: € 5,17; verdient 5,00, dus 0,17 te weinig." },
    fecha: "2026-10-14",
    entrada: { leeftijd: "16", uren: 12, uurloon: 5 },
    esperado: { perUur: 5.17, verschil: -0.17 },
  },
  {
    nombre: "Nul uur is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder uren valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { leeftijd: "20", uren: 0, uurloon: null },
    esperaError: true,
  },
]);
