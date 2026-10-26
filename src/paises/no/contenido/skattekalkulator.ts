import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.skattekalkulator",
  h1: "Skattekalkulator 2026: skatt, restskatt eller penger til gode",
  title: "Skattekalkulator 2026: restskatt eller til gode",
  description:
    "Regn ut skatten for 2026 med lønn, renter og fradrag. Legg inn skatten som er trukket, så ser du om du får restskatt eller penger til gode.",
  intro: [
    "Kalkulatoren regner ut skatten for hele inntektsåret 2026: skatt på alminnelig inntekt, trinnskatt og trygdeavgift.",
    "Skriver du inn hvor mye skatt som er trukket av lønnen i år, ser du om du kan vente penger til gode eller restskatt i skatteoppgjøret.",
  ],
  comoSeCalcula: [
    "Alminnelig inntekt er lønn minus minstefradrag ({{no.minstefradrag-sats[lonn]}}, høyst {{no.minstefradrag-maks[lonn]}}), pluss kapitalinntekter, minus gjeldsrenter og andre fradrag.",
    "Etter personfradraget på {{no.personfradrag}} betaler du {{no.skatt-alminnelig-inntekt}} av alminnelig inntekt. I tiltakssonen er satsen {{no.skatt-alminnelig-tiltakssonen}}, og du får i tillegg {{no.fradrag-tiltakssonen}} i særskilt fradrag.",
    "Trinnskatt og trygdeavgift ({{no.trygdeavgift[lonn]}}) regnes bare av lønnen, ikke av renter eller utleie, og uten fradrag.",
    "Er det trukket mer enn skatten for året, får du penger til gode. Er det trukket mindre, får du restskatt.",
  ],
  ejemplo: [
    "Med 650 000 kr i lønn, 5 000 kr i renteinntekter og 40 000 kr i gjeldsrenter blir skatten 153 282,60 kr. Er det trukket 160 000 kr, får du rundt 6 700 kr til gode.",
  ],
  faq: [
    {
      pregunta: "Hvorfor får jeg restskatt?",
      respuesta: "Oftest fordi skattekortet bygger på lavere inntekt eller større fradrag enn det du faktisk fikk. Høyere lønn, en ekstra jobb eller mindre gjeldsrenter enn ventet gir for lite trekk.",
    },
    {
      pregunta: "Hvor mye sparer jeg i skatt på gjeldsrenter?",
      respuesta: "Gjeldsrenter trekkes fra i alminnelig inntekt, så du sparer {{no.skatt-alminnelig-inntekt}} av rentene. Betaler du 40 000 kr i renter, blir skatten 8 800 kr lavere.",
    },
    {
      pregunta: "Gjelder trinnskatt også for renteinntekter?",
      respuesta: "Nei. Trinnskatt og trygdeavgift regnes av personinntekt, altså lønn og annen arbeidsinntekt. Renteinntekter og utleie skattlegges bare som alminnelig inntekt.",
    },
    {
      pregunta: "Hva tar ikke kalkulatoren med?",
      respuesta: "Formuesskatt, skatt på aksjer, pensjonsinntekt, næringsinntekt og særfradrag. Har du noe av dette, viser skattemeldingen den riktige skatten.",
    },
  ],
  glosario: [
    { termino: "Skatteoppgjøret", definicion: "Skatteetatens beregning av hva du skulle betalt i skatt for året, sammenlignet med det som er trukket." },
    { termino: "Restskatt", definicion: "Skatt du må betale fordi det er trukket for lite i løpet av året." },
    { termino: "Penger til gode", definicion: "Skatt som er trukket for mye og som blir betalt tilbake." },
  ],
});
