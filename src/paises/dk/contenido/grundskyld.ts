import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.grundskyld",
  h1: "Beregn grundskyld i din kommune",
  title: "Grundskyld 2026: beregn med din kommunes promille",
  description:
    "Beregn grundskylden af din grund med promillen i din kommune for 2026. I København er grundskylden {{dk.grundskyld[koebenhavn]}} promille af beskatningsgrundlaget.",
  intro: [
    "Grundskyld er en skat til kommunen af værdien af din grund. Promillen er forskellig fra kommune til kommune.",
    "Vælg din kommune og skriv enten grundværdien fra vurderingen eller beskatningsgrundlaget fra din ejendomsskattebillet.",
  ],
  comoSeCalcula: [
    "Beskatningsgrundlaget er {{dk.beskatningsgrundlag-andel}} af grundværdien.",
    "Grundskylden er kommunens promille af beskatningsgrundlaget.",
    "Bruger du beskatningsgrundlaget fra ejendomsskattebilletten, ganger beregneren direkte med promillen.",
  ],
  ejemplo: ["En grund med en grundværdi på 1,5 mio. kr. i København har et beskatningsgrundlag på 1,2 mio. kr. Grundskylden er 6.120 kr. om året."],
  faq: [
    {
      pregunta: "Hvad er grundskyldspromillen i min kommune?",
      respuesta: "Vælg kommunen i beregneren. Promillen ligger i 2026 mellem {{dk.grundskyld[frederiksberg]}} promille i Frederiksberg og {{dk.grundskyld[varde]}} promille i Varde.",
    },
    {
      pregunta: "Hvorfor er min grundskyld lavere end beregningen?",
      respuesta: "Er grundværdien steget, kan stigningsbegrænsning eller skatterabat gøre beskatningsgrundlaget lavere. Brug beløbet fra din ejendomsskattebillet for at få det præcise tal.",
    },
    {
      pregunta: "Hvem får grundskylden?",
      respuesta: "Grundskylden går til kommunen. Kommunen fastsætter selv promillen inden for lovens rammer.",
    },
  ],
  glosario: [
    { termino: "Grundværdi", definicion: "Værdien af grunden uden bygninger, fra den offentlige vurdering." },
    { termino: "Promille", definicion: "Tusindedele. 5 promille af 1.000.000 kr. er 5.000 kr." },
  ],
});
