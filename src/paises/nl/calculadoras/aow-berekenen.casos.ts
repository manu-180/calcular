import { definirCasos } from "@/motor/calculo";
import calculadora from "./aow-berekenen";

const LEEFTIJD = "https://www.svb.nl/nl/aow/aow-leeftijd/uw-aow-leeftijd" as const;
const BEDRAGEN = "https://www.svb.nl/nl/aow/bedragen-aow/aow-bedragen" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Geboren in 1960, alleenstaand, volledige opbouw",
    origen: { tipo: "oficial", url: LEEFTIJD, detalle: "01-03-1957 tot en met 31-12-1960: 67 jaar. AOW alleenstaand per 1 juli 2026: € 1.662,16, vakantiegeld € 104,78." },
    fecha: "2026-10-14",
    entrada: { geboren: "1960-05-20", situatie: "alleenstaand", jarenNiet: 0 },
    esperado: { leeftijd: "67 jaar", datum: "2027-05-20", status: "Vastgesteld", opbouw: 100, bruto: 1662.16, vakantiegeld: 104.78 },
  },
  {
    nombre: "Geboren in 1980, samenwonend, 4 jaar niet verzekerd",
    origen: {
      tipo: "oficial",
      url: BEDRAGEN,
      detalle: "Verwacht 01-10-1978 tot en met 30-06-1982: 68 jaar en 6 maanden. Opbouw 100 − 4 × 2 = 92%. 1.139,39 × 92% = 1.048,24; vakantiegeld 74,85 × 92% = 68,86.",
    },
    fecha: "2026-10-14",
    entrada: { geboren: "1980-03-15", situatie: "samenwonend", jarenNiet: 4 },
    esperado: { leeftijd: "68 jaar en 6 maanden", datum: "2048-09-15", status: "Verwacht (nog niet definitief)", opbouw: 92, bruto: 1048.24, vakantiegeld: 68.86 },
  },
  {
    nombre: "Geboren in 1962: 67 jaar en 3 maanden",
    origen: { tipo: "oficial", url: LEEFTIJD, detalle: "01-01-1961 tot en met 30-09-1964: 67 jaar en 3 maanden." },
    fecha: "2026-10-14",
    entrada: { geboren: "1962-07-01", situatie: "alleenstaand", jarenNiet: 0 },
    esperado: { leeftijd: "67 jaar en 3 maanden", datum: "2029-10-01" },
  },
  {
    nombre: "Geboren in 1950: AOW-leeftijd al bereikt",
    origen: { tipo: "recalculado", url: LEEFTIJD, detalle: "Wie voor 1 juni 1956 is geboren, heeft de AOW-leeftijd voor 2023 al bereikt." },
    fecha: "2026-10-14",
    entrada: { geboren: "1950-01-01", situatie: "alleenstaand", jarenNiet: 0 },
    esperado: { datum: null, status: "Je hebt de AOW-leeftijd al bereikt." },
  },
  {
    nombre: "Geboren na 2000: nog geen verwachte leeftijd",
    origen: { tipo: "oficial", url: LEEFTIJD, detalle: "De verwachte leeftijden lopen tot en met geboortedatum 31-12-2000." },
    fecha: "2026-10-14",
    entrada: { geboren: "2003-04-01", situatie: "alleenstaand", jarenNiet: 0 },
    esperaError: true,
  },
]);
