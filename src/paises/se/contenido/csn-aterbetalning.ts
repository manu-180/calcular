import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.csn-aterbetalning",
  h1: "Räkna ut återbetalning av CSN-lån",
  title: "CSN-lån 2026: räkna ut hur mycket du betalar per år",
  description:
    "Räkna ut ungefär hur mycket du betalar tillbaka på ditt studielån varje år. Räntan 2026 är {{se.csn-ranta}} och lägsta årsbelopp 15 procent av prisbasbeloppet.",
  intro: [
    "Studielån som du har tagit efter juni 2001 är annuitetslån. Du betalar ett årsbelopp som ökar lite varje år tills lånet är betalt.",
    "Kalkylatorn visar ett ungefärligt årsbelopp, hur många år du betalar och vad lånet kostar i ränta.",
  ],
  comoSeCalcula: [
    "Återbetalningstiden är {{se.csn-aterbetalning[tid]}} år, eller kortare om du fyller {{se.csn-aterbetalning[alder]}} år innan dess. Lånet ska vara betalt det år du fyller {{se.csn-aterbetalning[alder]}}.",
    "Årsbeloppet räknas så att det ökar med {{se.csn-aterbetalning[okning]}} procent varje år, med räntan för året, som är {{se.csn-ranta}} för 2026.",
    "Blir årsbeloppet lägre än {{se.csn-aterbetalning[minimum]}} procent av prisbasbeloppet betalar du det lägsta beloppet och blir klar tidigare.",
    "Utöver årsbeloppet betalar du en expeditionsavgift på {{se.csn-avgift}} per år.",
  ],
  ejemplo: ["Har du 250 000 kronor i studieskuld och börjar betala det år du fyller 26 blir årsbeloppet ungefär 10 376 kronor första året, eller 865 kronor i månaden."],
  faq: [
    {
      pregunta: "Vad är räntan på CSN-lån 2026?",
      respuesta: "Regeringen har bestämt räntan på studielån till {{se.csn-ranta}} för 2026.",
    },
    {
      pregunta: "Vad är det lägsta jag kan betala per år?",
      respuesta: "Årsbeloppet blir minst {{se.csn-aterbetalning[minimum]}} procent av prisbasbeloppet, alltså 8 880 kronor för 2026, plus expeditionsavgiften.",
    },
    {
      pregunta: "Varför ökar årsbeloppet?",
      respuesta: "Lagen säger att återbetalningen ska öka med {{se.csn-aterbetalning[okning]}} procent varje år om räntan är oförändrad. Därför blir de första åren lite billigare.",
    },
    {
      pregunta: "Stämmer beloppet exakt med CSN?",
      respuesta: "Nej, det är en uppskattning. CSN räknar om årsbeloppet varje år med årets ränta och din skuld. Se det exakta beloppet på Mina sidor hos CSN.",
    },
  ],
  glosario: [
    { termino: "Annuitetslån", definicion: "Studielån som är tagna efter 30 juni 2001." },
    { termino: "Årsbelopp", definicion: "Det du ska betala på lånet under ett kalenderår." },
  ],
});
