import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.dagpenge",
  h1: "Dagpengeberegner: hvor mange dagpenge får du?",
  title: "Dagpenge 2026: beregn din dagpengesats",
  description:
    "Beregn dine dagpenge i 2026 ud fra din løn. Du får {{dk.dagpenge-procent}} af lønnen efter am-bidrag, højst {{dk.dagpenge-hoejst[fuldtid]}} om måneden som fuldtidsforsikret.",
  intro: [
    "Bliver du ledig og er medlem af en a-kasse, får du dagpenge. Satsen afhænger af din tidligere løn og af, om du er fuldtids- eller deltidsforsikret.",
    "Skriv din gennemsnitlige månedsløn før skat. Beregneren viser din sats og om du rammer den højeste sats.",
  ],
  comoSeCalcula: [
    "Beregningsgrundlaget er din løn efter am-bidraget på {{dk.am-bidrag}}.",
    "Dagpengene er {{dk.dagpenge-procent}} af beregningsgrundlaget.",
    "Højeste sats er {{dk.dagpenge-hoejst[fuldtid]}} om måneden for fuldtidsforsikrede og {{dk.dagpenge-hoejst[deltid]}} for deltidsforsikrede.",
  ],
  ejemplo: ["Med 20.000 kr. om måneden er grundlaget 18.400 kr. efter am-bidrag. Dagpengene bliver 16.560 kr. om måneden før skat."],
  faq: [
    {
      pregunta: "Hvad er den højeste dagpengesats i 2026?",
      respuesta: "Den er {{dk.dagpenge-hoejst[fuldtid]}} om måneden for fuldtidsforsikrede og {{dk.dagpenge-hoejst[deltid]}} for deltidsforsikrede.",
    },
    {
      pregunta: "Hvor meget skal jeg tjene for at få højeste sats?",
      respuesta: "Du får højeste sats som fuldtidsforsikret, når {{dk.dagpenge-procent}} af din løn efter am-bidrag er mindst {{dk.dagpenge-hoejst[fuldtid]}}. Det svarer til en månedsløn på cirka 26.620 kr. før skat.",
    },
    {
      pregunta: "Hvilken løn bruger a-kassen?",
      respuesta: "A-kassen bruger din indkomst fra de 12 måneder med højest indkomst i de seneste 24 måneder. Beregneren bruger det gennemsnit, du skriver.",
    },
  ],
  glosario: [
    { termino: "Beregningsgrundlag", definicion: "Din tidligere løn efter am-bidrag, som dagpengene beregnes af." },
    { termino: "Fuldtidsforsikret", definicion: "Medlem af en a-kasse med forsikring for fuldtidsarbejde." },
  ],
});
