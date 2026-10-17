import { definirCasos } from "@/motor/calculo";
import calculadora from "./overuren-berekenen";

const BRON = "https://werk.belgie.be/nl/themas/arbeidsreglementering/arbeidsduur-en-rusttijden/arbeidsduur-en-vermindering-van-arbeidsduur" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 3.250, 38 uur, 5 overuren in de week en 2 op zondag",
    origen: { tipo: "recalculado", url: BRON, detalle: "Uurloon 3.250 × 3 ÷ 13 ÷ 38 = 19,74. Week 5 × 19,74 = 98,70 + 50 % = 49,35. Zondag 2 × 19,74 = 39,48 + 100 % = 39,48. Totaal 98,70 + 39,48 + 88,83 = 227,01." },
    fecha: "2026-10-14",
    entrada: { maandloon: 3250, uren: 38, week: 5, zondag: 2 },
    esperado: { uurloon: 19.74, gewoonLoon: 138.18, toeslag: 88.83, totaal: 227.01 },
  },
  {
    nombre: "Alleen overuren in de week",
    origen: { tipo: "recalculado", url: BRON, detalle: "Uurloon 2.600 × 3 ÷ 13 ÷ 40 = 15. 4 uur × 15 = 60 + 50 % = 30. Totaal 90." },
    fecha: "2026-10-14",
    entrada: { maandloon: 2600, uren: 40, week: 4, zondag: 0 },
    esperado: { uurloon: 15, toeslag: 30, totaal: 90 },
  },
  {
    nombre: "Nul loon is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder loon valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { maandloon: 0, uren: 38, week: 1, zondag: 0 },
    esperaError: true,
  },
]);
