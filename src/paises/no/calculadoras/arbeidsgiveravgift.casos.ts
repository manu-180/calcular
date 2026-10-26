import { definirCasos } from "@/motor/calculo";
import arbeidsgiveravgift from "./arbeidsgiveravgift";

const SATSER = "https://www.skatteetaten.no/satser/arbeidsgiveravgift/?year=2026";

export default definirCasos(arbeidsgiveravgift, [
  {
    nombre: "600 000 kr i sone 1 med feriepenger",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Feriepenger 10,2 % = 61 200. Grunnlag 661 200 × 14,1 % = 93 229,20. Kostnad 754 429,20." },
    fecha: "2026-10-24",
    entrada: { lonn: 600000, sone: "1", feriepenger: true, pensjon: 0 },
    esperado: { avgift: 93229.2, kostnad: 754429.2, perManed: 62869.1, paslag: 25.74 },
  },
  {
    nombre: "Sone 5 uten feriepenger",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Sone 5 har 0 % arbeidsgiveravgift." },
    fecha: "2026-10-24",
    entrada: { lonn: 600000, sone: "5", feriepenger: false, pensjon: 0 },
    esperado: { avgift: 0, kostnad: 600000 },
  },
  {
    nombre: "Sone 3 med 2 % tjenestepensjon",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Grunnlag 600 000 + 61 200 + 12 000 = 673 200 × 6,4 % = 43 084,80. Kostnad 716 284,80." },
    fecha: "2026-10-24",
    entrada: { lonn: 600000, sone: "3", feriepenger: true, pensjon: 2 },
    esperado: { avgift: 43084.8, kostnad: 716284.8, pensjon: 12000 },
  },
  {
    nombre: "Lønn null",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Uten lønn er det ingenting å regne på." },
    fecha: "2026-10-24",
    entrada: { lonn: 0, sone: "1", feriepenger: true, pensjon: 0 },
    esperaError: true,
  },
]);
