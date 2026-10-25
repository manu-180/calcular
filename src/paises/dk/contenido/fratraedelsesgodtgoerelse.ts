import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.fratraedelsesgodtgoerelse",
  h1: "Fratrædelsesgodtgørelse efter funktionærloven",
  title: "Fratrædelsesgodtgørelse: beregn efter 12 og 17 år",
  description:
    "Har du været ansat i 12 eller 17 år, har du ret til fratrædelsesgodtgørelse efter funktionærlovens § 2 a. Beregn beløbet ud fra din løn og anciennitet.",
  intro: [
    "Bliver du sagt op efter mange år i samme virksomhed, skal arbejdsgiveren betale en fratrædelsesgodtgørelse, når du fratræder.",
    "Skriv din ansættelsesdato, din sidste arbejdsdag og din månedsløn. Beregneren finder din anciennitet og godtgørelsen.",
  ],
  comoSeCalcula: [
    "Ancienniteten regnes i hele år fra ansættelsen til fratrædelsesdagen.",
    "Efter 12 års uafbrudt ansættelse er godtgørelsen {{dk.fratraedelsesgodtgoerelse[12-aar]}} løn.",
    "Efter 17 års uafbrudt ansættelse er godtgørelsen {{dk.fratraedelsesgodtgoerelse[17-aar]}} løn.",
  ],
  ejemplo: ["Er du ansat 1. januar 2009 og fratræder 1. februar 2026 med 45.000 kr. om måneden, har du 17 års anciennitet. Godtgørelsen er 135.000 kr. før skat."],
  faq: [
    {
      pregunta: "Hvornår har jeg ret til fratrædelsesgodtgørelse?",
      respuesta: "Når du er funktionær, har været uafbrudt ansat i samme virksomhed i mindst 12 år og bliver sagt op af arbejdsgiveren. Det gælder også ved uberettiget bortvisning.",
    },
    {
      pregunta: "Får jeg godtgørelse, hvis jeg selv siger op?",
      respuesta: "Nej. Funktionærlovens § 2 a gælder kun, når arbejdsgiveren siger dig op eller bortviser dig uden grund.",
    },
    {
      pregunta: "Er fratrædelsesgodtgørelse det samme som godtgørelse for usaglig opsigelse?",
      respuesta: "Nej. Godtgørelse for en opsigelse, der ikke er rimeligt begrundet, står i § 2 b. Den afhænger af sagen og er højst 6 måneders løn efter 15 års ansættelse.",
    },
  ],
  glosario: [
    { termino: "Funktionær", definicion: "En ansat inden for fx handel, kontor, teknisk bistand eller ledelse, der arbejder mere end 8 timer om ugen for arbejdsgiveren." },
    { termino: "Anciennitet", definicion: "Hvor længe du har været uafbrudt ansat i virksomheden." },
  ],
});
