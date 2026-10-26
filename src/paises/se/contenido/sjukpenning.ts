import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.sjukpenning",
  h1: "Räkna ut sjukpenning från Försäkringskassan",
  title: "Sjukpenning 2026: räkna ut hur mycket du får per dag",
  description:
    "Räkna ut din sjukpenning per dag: {{se.sjukpenning[normal]}} procent av inkomsten upp till taket, och {{se.sjukpenning[fortsattning]}} procent efter ett år.",
  intro: [
    "Är du sjuk längre än två veckor kan du få sjukpenning från Försäkringskassan. Beloppet beror på din sjukpenninggrundande inkomst, SGI.",
    "Kalkylatorn visar sjukpenningen per kalenderdag och för 30 dagar, före skatt.",
  ],
  comoSeCalcula: [
    "Lönen räknas om till en årsinkomst, avrundas nedåt till hela hundratal och begränsas till {{se.sjukpenning[tak]}} prisbasbelopp ({{se.prisbasbelopp}} per prisbasbelopp).",
    "Inkomsten multipliceras med {{se.sjukpenning[faktor]}}.",
    "På normalnivån får du {{se.sjukpenning[normal]}} procent av det beloppet och på fortsättningsnivån {{se.sjukpenning[fortsattning]}} procent.",
    "Årsbeloppet delas med 365 och avrundas till hela kronor.",
  ],
  ejemplo: ["Med 32 000 kronor i månaden blir SGI 384 000 kronor. Sjukpenningen på normalnivån blir 816 kronor per dag, alltså 24 480 kronor för 30 dagar."],
  faq: [
    {
      pregunta: "Från vilken dag får jag sjukpenning?",
      respuesta: "Är du anställd betalar arbetsgivaren sjuklön de första 14 dagarna. Sjukpenningen från Försäkringskassan börjar dag 15.",
    },
    {
      pregunta: "Hur länge får jag sjukpenning på normalnivån?",
      respuesta: "I högst 364 dagar under en period på 450 dagar. Därefter kan du få sjukpenning på fortsättningsnivån.",
    },
    {
      pregunta: "Vad är SGI?",
      respuesta: "Den sjukpenninggrundande inkomsten är den årsinkomst du kan antas få för ditt arbete. Försäkringskassan räknar ersättningen på den.",
    },
  ],
  glosario: [
    { termino: "Sjukpenning", definicion: "Ersättning från Försäkringskassan när du inte kan arbeta på grund av sjukdom." },
    { termino: "Normalnivå", definicion: "Sjukpenningen under de första 364 dagarna." },
    { termino: "Fortsättningsnivå", definicion: "Den lägre sjukpenningen efter 364 dagar." },
  ],
});
