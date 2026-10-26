import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.ejendomsvaerdiskat",
  h1: "Beregn ejendomsværdiskat for din bolig",
  title: "Ejendomsværdiskat 2026: beregn din boligskat",
  description:
    "Beregn ejendomsværdiskatten af din ejerbolig: {{dk.ejendomsvaerdiskat-satser[alm]}} promille af {{dk.beskatningsgrundlag-andel}} af ejendomsværdien og mere over grænsen.",
  intro: [
    "Ejer du din bolig, betaler du ejendomsværdiskat til staten. Skatten beregnes af den offentlige ejendomsvurdering.",
    "Skriv ejendomsværdien fra din vurdering. Beregneren viser skatten om året og pr. måned efter reglerne fra 2024.",
  ],
  comoSeCalcula: [
    "Beskatningsgrundlaget er {{dk.beskatningsgrundlag-andel}} af ejendomsværdien.",
    "Du betaler {{dk.ejendomsvaerdiskat-satser[alm]}} promille af beskatningsgrundlaget op til {{dk.ejendomsvaerdiskat-graense}}.",
    "Af den del af grundlaget, der ligger over {{dk.ejendomsvaerdiskat-graense}}, betaler du {{dk.ejendomsvaerdiskat-satser[progressiv]}} promille.",
  ],
  ejemplo: ["En bolig med en ejendomsværdi på 3,5 mio. kr. har et beskatningsgrundlag på 2,8 mio. kr. Ejendomsværdiskatten er 14.280 kr. om året."],
  faq: [
    {
      pregunta: "Hvor meget er ejendomsværdiskatten?",
      respuesta: "Den er {{dk.ejendomsvaerdiskat-satser[alm]}} promille af beskatningsgrundlaget op til {{dk.ejendomsvaerdiskat-graense}} og {{dk.ejendomsvaerdiskat-satser[progressiv]}} promille af resten.",
    },
    {
      pregunta: "Hvorfor betaler jeg mindre end beregneren viser?",
      respuesta: "Mange boligejere har en skatterabat eller et nedslag, fx som pensionist eller fordi boligen er købt senest 1. juli 1998. Din ejendomsskattebillet og forskudsopgørelse viser dit præcise beløb.",
    },
    {
      pregunta: "Hvilken vurdering bruges?",
      respuesta: "Skatten for et år beregnes af den ejendomsværdi, der er fastsat for året før.",
    },
  ],
  glosario: [
    { termino: "Ejendomsværdi", definicion: "Den offentlige vurdering af hele ejendommen, både hus og grund." },
    { termino: "Beskatningsgrundlag", definicion: "{{dk.beskatningsgrundlag-andel}} af ejendomsværdien. Det er det beløb, skatten beregnes af." },
  ],
});
