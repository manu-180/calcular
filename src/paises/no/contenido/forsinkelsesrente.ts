import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.forsinkelsesrente",
  h1: "Forsinkelsesrente: regn ut renten på en ubetalt regning",
  title: "Forsinkelsesrente {{anio}}: kalkulator med satsen nå",
  description:
    "Regn ut forsinkelsesrenten på en regning som er betalt for sent. Satsen er {{no.forsinkelsesrente}} i året fra {{no.forsinkelsesrente#desde}}, og hvert halvår regnes for seg.",
  intro: [
    "Betaler du en regning for sent, kan den du skylder penger kreve forsinkelsesrente fra forfallsdatoen. Satsen fastsettes for et halvår om gangen.",
    "Skriv inn beløpet, forfallsdatoen og datoen det ble betalt, så ser du renten for hver periode og til sammen.",
  ],
  comoSeCalcula: [
    "Forsinkelsesrenten er {{no.forsinkelsesrente}} per år fra {{no.forsinkelsesrente#desde}}. Satsen følger styringsrenten til Norges Bank per 1. januar og 1. juli, med et tillegg.",
    "Renten regnes for hver dag fra dagen etter forfall til og med betalingsdagen: beløp × sats × dager / 365.",
    "Går perioden over et halvårsskifte, regnes hver del med satsen som gjaldt da.",
  ],
  ejemplo: ["En regning på 10 000 kr som forfalt 31. mars og ble betalt 24. oktober 2026, gir 688,49 kr i forsinkelsesrente."],
  faq: [
    {
      pregunta: "Hva er forsinkelsesrenten nå?",
      respuesta: "{{no.forsinkelsesrente}} per år fra {{no.forsinkelsesrente#desde}}. Går perioden din lenger tilbake, viser tabellen satsen for hvert halvår.",
    },
    {
      pregunta: "Fra hvilken dag løper forsinkelsesrenten?",
      respuesta: "Fra forfallsdatoen er passert. Kalkulatoren regner fra dagen etter forfall til og med dagen regningen ble betalt.",
    },
    {
      pregunta: "Kan jeg også kreve gebyr?",
      respuesta: "Ved purring og inkasso finnes egne regler for gebyrer og kompensasjon. De er ikke med i kalkulatoren, som bare regner renten.",
    },
  ],
  glosario: [
    { termino: "Forfallsdato", definicion: "Siste dag for å betale regningen uten rente." },
    { termino: "Styringsrenten", definicion: "Renten Norges Bank setter, som forsinkelsesrenten bygger på." },
  ],
});
