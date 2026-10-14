import { definirCasos } from "@/motor/calculo";
import calculadora from "./ww-uitkering-berekenen";

const UWV = "https://www.uwv.nl/nl/ww/hoogte-ww" as const;
const WW = "https://wetten.overheid.nl/BWBR0004045" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 3.500 per maand, 5 jaar arbeidsverleden",
    origen: { tipo: "recalculado", url: UWV, detalle: "75% × 3.500 = 2.625 de eerste 2 maanden, daarna 70% = 2.450. Duur 5 maanden. Totaal 2 × 2.625 + 3 × 2.450 = 12.600." },
    fecha: "2026-10-14",
    entrada: { maandloon: 3500, wekeneis: true, jareneis: true, jarenVoor2016: 0, jarenVanaf2016: 5 },
    esperado: { eerste: 2625, daarna: 2450, duur: 5, totaal: 12600 },
  },
  {
    nombre: "12 jaar voor 2016 en 3 jaar daarna",
    origen: { tipo: "recalculado", url: WW, detalle: "Artikel 42 WW: eerste 10 jaar 10 maanden, 2 jaar voor 2016 nog 2 maanden, 3 jaar vanaf 2016 een halve maand per jaar: 13,5 maanden." },
    fecha: "2026-10-14",
    entrada: { maandloon: 3000, wekeneis: true, jareneis: true, jarenVoor2016: 12, jarenVanaf2016: 3 },
    esperado: { duur: 13.5 },
  },
  {
    nombre: "Lang arbeidsverleden: maximaal 24 maanden",
    origen: { tipo: "recalculado", url: WW, detalle: "25 + 10 jaar geeft 10 + 15 + 5 = 30 maanden, begrensd op 24." },
    fecha: "2026-10-14",
    entrada: { maandloon: 3000, wekeneis: true, jareneis: true, jarenVoor2016: 25, jarenVanaf2016: 10 },
    esperado: { duur: 24 },
  },
  {
    nombre: "Hoog loon boven het maximumdagloon, alleen wekeneis",
    origen: {
      tipo: "recalculado",
      url: UWV,
      detalle: "Maximum 309,91 × 21,75 = 6.740,54 per maand. 75% = 5.055,41; 70% = 4.718,38. Alleen wekeneis: 3 maanden, totaal 2 × 5.055,41 + 4.718,38 = 14.829,20.",
    },
    fecha: "2026-10-14",
    entrada: { maandloon: 8000, wekeneis: true, jareneis: false, jarenVoor2016: 0, jarenVanaf2016: 0 },
    esperado: { wwMaandloon: 6740.54, eerste: 5055.41, daarna: 4718.38, duur: 3, totaal: 14829.2 },
  },
  {
    nombre: "Geen wekeneis, geen WW",
    origen: { tipo: "recalculado", url: UWV, detalle: "Zonder 26 van de laatste 36 weken gewerkt geen recht op WW." },
    fecha: "2026-10-14",
    entrada: { maandloon: 3000, wekeneis: false, jareneis: true, jarenVoor2016: 5, jarenVanaf2016: 5 },
    esperado: { duur: 0, totaal: 0, eerste: 0 },
  },
]);
