import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.mva-kalkulator",
  h1: "Mva-kalkulator: legg til eller trekk ut merverdiavgift",
  title: "Mva-kalkulator: {{no.mva[alminnelig]}}, {{no.mva[naeringsmidler]}} og {{no.mva[lav]}} mva.",
  description:
    "Legg til eller trekk ut mva. med alminnelig sats {{no.mva[alminnelig]}}, {{no.mva[naeringsmidler]}} på mat og {{no.mva[lav]}} på transport, hotell og kino. Pris eks. og inkl. mva.",
  intro: [
    "Merverdiavgift (mva.) er en avgift på de fleste varer og tjenester i Norge. Den alminnelige satsen er {{no.mva[alminnelig]}}, og noen varer og tjenester har lavere sats.",
    "Velg om beløpet er med eller uten mva., og velg sats. Da ser du prisen eks. mva., avgiften og prisen inkl. mva.",
  ],
  comoSeCalcula: [
    "Legge til mva.: mva. = pris eks. mva. × satsen. Pris inkl. mva. = pris eks. mva. + mva.",
    "Trekke ut mva.: pris eks. mva. = pris inkl. mva. delt på (1 + satsen). Mva. er forskjellen.",
    "Satser: alminnelig {{no.mva[alminnelig]}}, næringsmidler {{no.mva[naeringsmidler]}}, og {{no.mva[lav]}} på persontransport, overnatting, allmennkringkasting og adgang til kino, idrettsarrangementer og fornøyelsesparker.",
  ],
  ejemplo: ["1 000 kr eks. mva. med {{no.mva[alminnelig]}} blir 1 250 kr inkl. mva. Av 1 250 kr inkl. mva. er 250 kr merverdiavgift."],
  faq: [
    {
      pregunta: "Hvordan regner jeg ut mva. av en pris inkl. mva.?",
      respuesta: "Del prisen inkl. mva. på 1 pluss satsen som desimaltall. Det du får, er prisen eks. mva., og forskjellen er mva. Trekker du bare prosenten fra totalen, tar du bort for mye.",
    },
    {
      pregunta: "Hvilken mva-sats gjelder for mat?",
      respuesta: "Næringsmidler har {{no.mva[naeringsmidler]}}. Det gjelder også vann- og avløpstjenester.",
    },
    {
      pregunta: "Hvilke tjenester har den lave mva-satsen?",
      respuesta: "{{no.mva[lav]}} gjelder persontransport, utleie av rom (hotell og overnatting), allmennkringkasting og adgang til kino, idrettsarrangementer, fornøyelsesparker og opplevelsessentre.",
    },
  ],
  glosario: [
    { termino: "Eks. mva.", definicion: "Prisen uten merverdiavgift." },
    { termino: "Inkl. mva.", definicion: "Prisen med merverdiavgift, det kunden betaler." },
  ],
});
