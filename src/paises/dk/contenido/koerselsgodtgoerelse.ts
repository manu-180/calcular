import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.koerselsgodtgoerelse",
  h1: "Kørselsgodtgørelse: beregn skattefri kilometerpenge",
  title: "Kørselsgodtgørelse 2026: beregn kilometerpenge",
  description:
    "Beregn skattefri kørselsgodtgørelse for erhvervsmæssig kørsel i egen bil: {{dk.koerselsgodtgoerelse[bil-til-20000]}} pr. km i 2026. Også for cykel og knallert.",
  intro: [
    "Kører du i egen bil for din arbejdsgiver, kan du få skattefri kørselsgodtgørelse efter Skatterådets satser.",
    "Skriv antal kilometer og hvor mange kilometer, du allerede har fået godtgørelse for i år. Beregneren deler kørslen op på de to satser.",
  ],
  comoSeCalcula: [
    "Egen bil til og med {{dk.koerselsgodtgoerelse-km}} km om året: {{dk.koerselsgodtgoerelse[bil-til-20000]}} pr. km.",
    "Kørsel derudover: {{dk.koerselsgodtgoerelse[bil-over-20000]}} pr. km.",
    "Cykel, knallert eller el-løbehjul: {{dk.koerselsgodtgoerelse[cykel]}} pr. km.",
  ],
  ejemplo: ["I 2026 giver 1.000 km i egen bil 3.940 kr. i skattefri kørselsgodtgørelse."],
  faq: [
    {
      pregunta: "Hvad er satsen for kørselsgodtgørelse i 2026?",
      respuesta: "Skatterådets sats er {{dk.koerselsgodtgoerelse[bil-til-20000]}} pr. km til og med {{dk.koerselsgodtgoerelse-km}} km og {{dk.koerselsgodtgoerelse[bil-over-20000]}} derefter.",
    },
    {
      pregunta: "Gælder det for kørsel til og fra arbejde?",
      respuesta: "Nej. Kørselsgodtgørelse gælder erhvervsmæssig kørsel. Til turen mellem hjem og arbejde er der i stedet kørselsfradrag.",
    },
    {
      pregunta: "Hvem fastsætter satserne?",
      respuesta: "Skatterådet fastsætter satserne for hvert år. Satserne for 2027 er ikke fastsat endnu.",
    },
  ],
  glosario: [
    { termino: "Kørselsgodtgørelse", definicion: "Skattefri betaling fra arbejdsgiveren for erhvervsmæssig kørsel i eget køretøj." },
    { termino: "Erhvervsmæssig kørsel", definicion: "Kørsel for arbejdet, fx til kunder eller møder. Ikke turen mellem hjem og arbejde." },
  ],
});
