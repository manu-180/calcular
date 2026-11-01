import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.grunnbelopet",
  h1: "Grunnbeløpet (G) {{anio}}: regn om mellom G og kroner",
  title: "Grunnbeløpet {{anio}}: G er {{no.grunnbelop}}",
  description:
    "Grunnbeløpet i folketrygden er {{no.grunnbelop}} fra {{no.grunnbelop#desde}}. Regn om fra G til kroner eller fra kroner til G, for eksempel 6 G eller 2 G.",
  intro: [
    "Grunnbeløpet, ofte kalt G, er et kronebeløp Nav bruker til å regne ut mange ytelser og grenser: taket for sykepenger og foreldrepenger, kravet til inntekt for dagpenger og mye mer.",
    "G justeres hvert år fra 1. mai. Skriv inn antall G eller et kronebeløp, så regner kalkulatoren om.",
  ],
  comoSeCalcula: [
    "Fra {{no.grunnbelop#desde}} er 1 G lik {{no.grunnbelop}}.",
    "Antall G ganger grunnbeløpet gir kronebeløpet. Et kronebeløp delt på grunnbeløpet gir antall G.",
  ],
  ejemplo: ["Med grunnbeløpet fra 1. mai 2026 (136 549 kr) er 6 G lik 819 294 kr. Det er taket for sykepenger, foreldrepenger og dagpenger."],
  faq: [
    {
      pregunta: "Hva er G i 2026?",
      respuesta: "{{no.grunnbelop}} fra {{no.grunnbelop#desde}}. Regner du på en periode før denne datoen, gjaldt det forrige grunnbeløpet.",
    },
    {
      pregunta: "Hva er 6 G?",
      respuesta: "Seks ganger grunnbeløpet. Velg 6 i kalkulatoren, så ser du beløpet i kroner. Nav dekker inntekt opp til 6 G for sykepenger, foreldrepenger og dagpenger.",
    },
    {
      pregunta: "Når endres grunnbeløpet?",
      respuesta: "Hvert år fra 1. mai. Kalkulatoren tar i bruk den nye G når Nav har publisert den.",
    },
  ],
  glosario: [
    { termino: "G", definicion: "Grunnbeløpet i folketrygden, {{no.grunnbelop}} fra {{no.grunnbelop#desde}}." },
    { termino: "6 G", definicion: "Seks ganger grunnbeløpet, taket for flere ytelser fra Nav." },
  ],
});
