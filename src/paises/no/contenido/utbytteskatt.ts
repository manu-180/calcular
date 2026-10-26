import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.utbytteskatt",
  h1: "Skatt på utbytte og aksjegevinst",
  title: "Utbytteskatt 2026: skatt på aksjer, fond og ASK",
  description:
    "Regn ut skatten på utbytte, aksjegevinst og uttak fra aksjesparekonto i 2026: {{no.skatt-alminnelig-inntekt}} ganget med oppjusteringsfaktoren {{no.oppjusteringsfaktor}}.",
  intro: [
    "Utbytte og gevinst på aksjer og aksjefond skattlegges høyere enn vanlig kapitalinntekt. Beløpet ganges først med en oppjusteringsfaktor, og så betaler du {{no.skatt-alminnelig-inntekt}} skatt.",
    "Velg hva du skal skatte av og skriv inn beløpet. Har du skjermingsfradrag, trekkes det fra først.",
  ],
  comoSeCalcula: [
    "Skattepliktig beløp er utbyttet eller gevinsten minus skjermingsfradraget.",
    "Beløpet ganges med oppjusteringsfaktoren {{no.oppjusteringsfaktor}} for 2026 og skattlegges med {{no.skatt-alminnelig-inntekt}}. Den effektive satsen er de to tallene ganget med hverandre, og den står i resultatet.",
    "På aksjesparekonto skattlegges verken gevinst eller utbytte mens pengene står på kontoen. Du betaler skatt først når du tar ut mer enn du har satt inn.",
  ],
  ejemplo: ["Får du 50 000 kr i utbytte uten skjermingsfradrag, blir skatten 18 920 kr, og du sitter igjen med 31 080 kr."],
  faq: [
    {
      pregunta: "Hvor mye er skatten på utbytte i 2026?",
      respuesta: "Utbyttet ganges med {{no.oppjusteringsfaktor}} og skattlegges med {{no.skatt-alminnelig-inntekt}}, så av 50 000 kr i utbytte går 18 920 kr til skatt. Skjermingsfradraget trekkes fra før oppjusteringen.",
    },
    {
      pregunta: "Når betaler jeg skatt på aksjesparekonto?",
      respuesta: "Når du tar ut mer enn du har satt inn. Innskuddet regnes som tatt ut først og er skattefritt. Det du tar ut ut over innskuddet, skattlegges etter fradrag for skjerming og med oppjusteringsfaktoren.",
    },
    {
      pregunta: "Hva er skjermingsfradrag?",
      respuesta: "Et fradrag som skal tilsvare en risikofri avkastning på det du har investert. Den delen av utbyttet eller gevinsten skattlegges ikke.",
    },
  ],
  glosario: [
    { termino: "Oppjusteringsfaktor", definicion: "Tallet utbytte og gevinst ganges med før skatten på {{no.skatt-alminnelig-inntekt}}." },
    { termino: "Aksjesparekonto (ASK)", definicion: "En konto for aksjer og aksjefond der skatten utsettes til du tar ut gevinsten." },
  ],
});
