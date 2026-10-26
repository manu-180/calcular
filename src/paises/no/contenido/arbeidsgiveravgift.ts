import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.arbeidsgiveravgift",
  h1: "Arbeidsgiveravgift 2026: kalkulator med alle soner",
  title: "Arbeidsgiveravgift 2026: regn ut kostnaden per sone",
  description:
    "Regn ut arbeidsgiveravgift og hva en ansatt koster i 2026. Satsene går fra {{no.arbeidsgiveravgift[1]}} i sone 1 til {{no.arbeidsgiveravgift[5]}} i sone 5, med feriepenger og pensjon.",
  intro: [
    "Arbeidsgiveravgift er en avgift arbeidsgiveren betaler til folketrygden av lønn og annen godtgjørelse. Satsen avhenger av hvilken sone virksomheten hører til.",
    "Skriv inn årslønnen og velg sone. Kalkulatoren legger til feriepenger og innskudd til tjenestepensjon hvis du vil, og viser hva den ansatte koster i året.",
  ],
  comoSeCalcula: [
    "Satser for 2026: sone 1 {{no.arbeidsgiveravgift[1]}}, sone 1a og 2 {{no.arbeidsgiveravgift[2]}}, sone 3 {{no.arbeidsgiveravgift[3]}}, sone 4 {{no.arbeidsgiveravgift[4]}}, sone 4a {{no.arbeidsgiveravgift[4a]}} og sone 5 {{no.arbeidsgiveravgift[5]}}.",
    "Feriepengene er {{no.feriepenger-sats}} av lønnen etter ferieloven, og det betales arbeidsgiveravgift også av dem.",
    "Arbeidsgiveravgiften er grunnlaget (lønn, feriepenger og pensjonsinnskudd) ganget med satsen i sonen. Kostnaden er grunnlaget pluss avgiften.",
    "I sone 1a betaler virksomheten den lave satsen til den har spart et fribeløp på {{no.fribelop-sone-1a}} i året sammenlignet med full sats.",
  ],
  ejemplo: ["En ansatt med 600 000 kr i årslønn i sone 1 koster 754 429 kr i året med feriepenger: 61 200 kr i feriepenger og 93 229 kr i arbeidsgiveravgift."],
  faq: [
    {
      pregunta: "Hvor mye er arbeidsgiveravgiften?",
      respuesta: "{{no.arbeidsgiveravgift[1]}} i sone 1, som gjelder i sentrale strøk. I distriktene er satsen lavere, og i sone 5 (tiltakssonen i Finnmark og Nord-Troms) er den {{no.arbeidsgiveravgift[5]}}.",
    },
    {
      pregunta: "Hvor mye koster en ansatt i tillegg til lønnen?",
      respuesta: "I sone 1 med feriepenger etter ferieloven blir påslaget rundt 25 %. Kommer tjenestepensjon, forsikringer og andre kostnader i tillegg, blir det mer.",
    },
    {
      pregunta: "Hvilken sone hører virksomheten til?",
      respuesta: "Det avgjøres i hovedsak av kommunen der virksomheten (underenheten) er registrert. Skatteetaten har en oversikt over hvilke kommuner som er i hver sone.",
    },
  ],
  glosario: [
    { termino: "Avgiftsgrunnlag", definicion: "Lønn, feriepenger, pensjonsinnskudd og andre ytelser som det betales arbeidsgiveravgift av." },
    { termino: "Fribeløp", definicion: "Hvor mye en virksomhet i sone 1a kan spare i året med den lave satsen." },
  ],
});
