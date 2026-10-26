import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.loen-efter-skat",
  h1: "Løn efter skat: beregn din nettoløn",
  title: "Løn efter skat 2026: beregn din nettoløn",
  description:
    "Se hvad du får udbetalt af din løn efter am-bidrag, kommuneskat, bundskat og mellemskat. Vælg din kommune og se skatten måned for måned.",
  intro: [
    "Skriv din månedsløn før skat og vælg din kommune. Beregneren trækker am-bidrag, ATP og din egen pension fra og regner skatten ud med de gældende satser.",
    "Resultatet er din løn efter skat i gennemsnit pr. måned. Du ser også hver skat for sig, så du kan sammenligne med din lønseddel og din forskudsopgørelse.",
  ],
  comoSeCalcula: [
    "Am-bidraget er {{dk.am-bidrag}} af lønnen efter din egen pension og ATP. Resten er din personlige indkomst.",
    "Fra den personlige indkomst trækkes beskæftigelsesfradraget ({{dk.beskaeftigelsesfradrag-sats}} af lønnen før am-bidrag, højst {{dk.beskaeftigelsesfradrag-max}}) og jobfradraget (højst {{dk.jobfradrag-max}}). Det giver den skattepligtige indkomst.",
    "Kommuneskat og kirkeskat betales af den skattepligtige indkomst over personfradraget på {{dk.personfradrag}}. I København er kommuneskatten {{dk.kommuneskat[koebenhavn]}}.",
    "Bundskatten er {{dk.bundskat}} af den personlige indkomst over personfradraget.",
    "Over {{dk.mellemskat-graense}} betaler du {{dk.mellemskat-sats}} i mellemskat, over {{dk.topskat-graense}} {{dk.topskat-sats}} i topskat og over {{dk.toptopskat-graense}} {{dk.toptopskat-sats}} i toptopskat. Grænserne gælder den personlige indkomst efter am-bidrag.",
    "Skatteloftet på {{dk.skatteloft}} sætter mellemskatten ned i kommuner med høj kommuneskat.",
  ],
  ejemplo: [
    "I 2026 med 40.000 kr. om måneden i København og kirkeskat betaler du 38.304,96 kr. i am-bidrag og 124.325,19 kr. i skat om året. Du får 26.348,49 kr. udbetalt om måneden.",
  ],
  faq: [
    {
      pregunta: "Hvor meget får jeg udbetalt af 40.000 kr. før skat?",
      respuesta:
        "I 2026 får du i København med kirkeskat og fuldt ATP-bidrag cirka 26.348 kr. om måneden. Bor du i en kommune med højere skat, bliver beløbet lidt mindre.",
    },
    {
      pregunta: "Hvornår betaler jeg mellemskat og topskat?",
      respuesta:
        "Mellemskat på {{dk.mellemskat-sats}} betaler du af den personlige indkomst efter am-bidrag, der overstiger {{dk.mellemskat-graense}} om året. Topskat på {{dk.topskat-sats}} kommer oven i over {{dk.topskat-graense}}.",
    },
    {
      pregunta: "Hvorfor er min lønseddel ikke helt den samme?",
      respuesta:
        "Skattekortet fordeler dit fradrag på årets måneder, og trækprocenten er afrundet. Pension fra arbejdsgiveren, personalegoder og fradrag for fx renter eller transport ændrer også tallet. Beregneren viser et gennemsnit over året.",
    },
    {
      pregunta: "Hvor stort er personfradraget?",
      respuesta: "Fra {{dk.personfradrag#desde}} er personfradraget {{dk.personfradrag}} for personer over 18 år. Du betaler ikke bundskat, kommuneskat og kirkeskat af den del af indkomsten.",
    },
  ],
  glosario: [
    { termino: "Am-bidrag", definicion: "Arbejdsmarkedsbidrag på {{dk.am-bidrag}} af lønnen. Det trækkes før skatten." },
    { termino: "Personlig indkomst", definicion: "Lønnen efter am-bidrag. Den bruges til bundskat, mellemskat og topskat." },
    { termino: "Skattepligtig indkomst", definicion: "Den personlige indkomst minus fradrag som beskæftigelsesfradrag. Den bruges til kommuneskat og kirkeskat." },
    { termino: "Trækprocent", definicion: "Den procent, arbejdsgiveren trækker i skat hver måned efter dit fradrag." },
  ],
});
