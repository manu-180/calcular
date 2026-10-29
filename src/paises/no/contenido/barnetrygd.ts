import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.barnetrygd",
  h1: "Barnetrygd {{anio}}: hvor mye får dere?",
  title: "Barnetrygd {{anio}}: satser og kalkulator per barn",
  description:
    "Barnetrygden er {{no.barnetrygd}} per barn i måneden fra {{no.barnetrygd#desde}}. Regn ut hva dere får per måned og per år, med Finnmarks- og Svalbardtillegget.",
  intro: [
    "Barnetrygd er en månedlig støtte fra Nav for barn under 18 år. Beløpet er det samme uansett inntekt og alder på barnet.",
    "Skriv inn hvor mange barn dere har, så ser du barnetrygden per måned og per år.",
  ],
  comoSeCalcula: [
    "Fra {{no.barnetrygd#desde}} er barnetrygden {{no.barnetrygd}} i måneden for hvert barn fra 0 til 18 år.",
    "Bor dere i Finnmark, i tiltakssonen i Nord-Troms eller på Svalbard, kommer et tillegg på {{no.barnetrygd-tillegg}} per barn i måneden.",
    "Barnetrygd per år er månedsbeløpet ganger 12.",
  ],
  ejemplo: ["To barn gir 4 024 kr i måneden og 48 288 kr i året med satsene fra februar 2026."],
  faq: [
    {
      pregunta: "Hvor mye er barnetrygden i 2026?",
      respuesta: "{{no.barnetrygd}} per barn i måneden fra {{no.barnetrygd#desde}}. Satsen er den samme for alle barn fra 0 til 18 år.",
    },
    {
      pregunta: "Er barnetrygden skattepliktig?",
      respuesta: "Nei. Barnetrygd er ikke skattepliktig inntekt, så du får hele beløpet utbetalt.",
    },
    {
      pregunta: "Hvem får Finnmarks- og Svalbardtillegget?",
      respuesta: "Familier der både du og barnet bor på Svalbard, i Finnmark eller i enkelte kommuner i Nord-Troms. Tillegget er {{no.barnetrygd-tillegg}} per barn i måneden.",
    },
    {
      pregunta: "Hva med utvidet barnetrygd?",
      respuesta: "Er du alene med barn, kan du ha rett til utvidet barnetrygd i tillegg. Den er ikke med i kalkulatoren, så sjekk satsen hos Nav.",
    },
  ],
  glosario: [
    { termino: "Ordinær barnetrygd", definicion: "Barnetrygden alle får for barn under 18 år som bor i Norge." },
    { termino: "Utvidet barnetrygd", definicion: "Ekstra barnetrygd for den som bor alene med barn." },
  ],
});
