import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.topskat",
  h1: "Topskat og mellemskat 2026: beregn hvad du betaler",
  title: "Topskat 2026: beregn mellemskat og topskat",
  description:
    "Betaler du mellemskat eller topskat? Skriv din løn og se skatten over grænserne på {{dk.mellemskat-graense}} og {{dk.topskat-graense}}.",
  intro: [
    "Fra 2026 er der tre skatter oven i bundskatten: mellemskat, topskat og toptopskat. Den gamle topskat hedder nu mellemskat.",
    "Beregneren viser, hvor meget af din løn der ligger over grænserne, hvad du betaler, og hvilken månedsløn der får dig over hver grænse.",
  ],
  comoSeCalcula: [
    "Grænserne gælder din personlige indkomst efter am-bidrag. Vi trækker din egen pension og ATP fra lønnen og derefter am-bidraget på {{dk.am-bidrag}}.",
    "Mellemskat: {{dk.mellemskat-sats}} af indkomsten over {{dk.mellemskat-graense}}.",
    "Topskat: {{dk.topskat-sats}} af indkomsten over {{dk.topskat-graense}}.",
    "Toptopskat: {{dk.toptopskat-sats}} af indkomsten over {{dk.toptopskat-graense}}.",
    "I kommuner med høj kommuneskat sætter skatteloftet på {{dk.skatteloft}} mellemskatten ned.",
  ],
  ejemplo: [
    "I 2026 med 80.000 kr. om måneden i København er din personlige indkomst 882.107,04 kr. Du betaler 18.068,03 kr. i mellemskat og 7.815,53 kr. i topskat om året.",
  ],
  faq: [
    {
      pregunta: "Hvad er topskattegrænsen?",
      respuesta: "Fra {{dk.topskat-graense#desde}} gælder topskatten på {{dk.topskat-sats}} personlig indkomst efter am-bidrag over {{dk.topskat-graense}}. Mellemskatten begynder allerede ved {{dk.mellemskat-graense}}.",
    },
    {
      pregunta: "Hvor meget skal jeg tjene for at betale topskat?",
      respuesta: "I 2026 rammer du uden egen pension og med fuldt ATP-bidrag topskattegrænsen ved en månedsløn på cirka 70.561 kr. før skat. Mellemskatten begynder ved cirka 58.179 kr. om måneden.",
    },
    {
      pregunta: "Hvad er forskellen på mellemskat og topskat?",
      respuesta: "Mellemskat er den skat, der til og med 2025 hed topskat. Den nye topskat er en ekstra skat på {{dk.topskat-sats}} for de højeste indkomster, og toptopskatten på {{dk.toptopskat-sats}} gælder over {{dk.toptopskat-graense}}.",
    },
    {
      pregunta: "Kan pension holde mig under grænsen?",
      respuesta: "Ja. Pension, der trækkes i lønnen, betaler du ikke am-bidrag og topskat af nu. Derfor sænker en højere egen pensionsindbetaling den personlige indkomst.",
    },
  ],
  glosario: [
    { termino: "Mellemskat", definicion: "Skat på {{dk.mellemskat-sats}} af personlig indkomst over {{dk.mellemskat-graense}}. Hed topskat til og med 2025." },
    { termino: "Topskat", definicion: "Skat på {{dk.topskat-sats}} af personlig indkomst over {{dk.topskat-graense}}." },
    { termino: "Skatteloft", definicion: "Grænse for den samlede marginalskat. Overstiger kommuneskat, bundskat og mellemskat loftet, sættes mellemskatten ned." },
  ],
});
