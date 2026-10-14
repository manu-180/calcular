import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.zzp-belasting-berekenen",
  h1: "Belasting berekenen als zzp'er",
  title: "Zzp belasting berekenen 2026: hoeveel moet je opzij zetten?",
  description:
    "Bereken je inkomstenbelasting en Zvw-bijdrage als zzp'er in 2026, met zelfstandigenaftrek van {{nl.zelfstandigenaftrek}}, startersaftrek en {{nl.mkb-winstvrijstelling}} mkb-winstvrijstelling.",
  intro: [
    "Als zzp'er betaal je inkomstenbelasting over je winst, plus de inkomensafhankelijke bijdrage voor de Zorgverzekeringswet. Er houdt niemand iets voor je in, dus je moet zelf geld opzij zetten.",
    "Vul je winst in en of je aan het urencriterium voldoet. Je ziet hoeveel belasting je over 2026 betaalt en hoeveel je per maand moet reserveren.",
  ],
  comoSeCalcula: [
    "Van je winst gaat de ondernemersaftrek af: de zelfstandigenaftrek van {{nl.zelfstandigenaftrek}} als je minstens 1.225 uur per jaar aan je bedrijf werkt, en voor starters ook de startersaftrek van {{nl.startersaftrek}}.",
    "Van wat overblijft is {{nl.mkb-winstvrijstelling}} vrijgesteld: de mkb-winstvrijstelling. De rest is je belastbare winst.",
    "Over je belastbare winst (en eventueel loon) betaal je inkomstenbelasting in box 1. Daar gaan de algemene heffingskorting en de arbeidskorting af. Voor de arbeidskorting telt je winst vóór aftrekposten.",
    "Valt je inkomen in de hoogste schijf, dan leveren de aftrekposten maar {{nl.aftrek-maximumtarief}} op.",
    "Daarnaast betaal je {{nl.zvw-bijdrage}} Zvw-bijdrage over je belastbare winst, tot een inkomen van {{nl.zvw-maximum}}.",
  ],
  ejemplo: [
    "Met € 50.000 winst en het urencriterium is je belastbare winst € 42.602,40. Je betaalt € 7.607,83 inkomstenbelasting en € 2.066,22 Zvw-bijdrage, samen € 9.674,05. Zet dus ongeveer € 806 per maand opzij.",
  ],
  faq: [
    {
      pregunta: "Wat is het urencriterium?",
      respuesta: "Je besteedt in een kalenderjaar minstens 1.225 uur aan je onderneming. Alleen dan krijg je de zelfstandigenaftrek en de startersaftrek.",
    },
    {
      pregunta: "Wanneer krijg je de startersaftrek?",
      respuesta: "Als je in 1 of meer van de 5 voorgaande jaren geen ondernemer was en in die periode niet meer dan 2 keer zelfstandigenaftrek hebt gebruikt. De startersaftrek is {{nl.startersaftrek}} bovenop de zelfstandigenaftrek.",
    },
    {
      pregunta: "Is de zelfstandigenaftrek hoger dan je winst?",
      respuesta: "Dan is de aftrek niet hoger dan je winst. Het deel dat je niet kunt gebruiken, kun je de volgende 9 jaar verrekenen. Als starter krijg je wel de volledige aftrek.",
    },
    {
      pregunta: "Krijg je de mkb-winstvrijstelling zonder urencriterium?",
      respuesta: "Ja. De mkb-winstvrijstelling geldt voor elke ondernemer, ook als je niet aan het urencriterium voldoet.",
    },
  ],
  glosario: [
    { termino: "Ondernemersaftrek", definicion: "Aftrekposten voor ondernemers, zoals de zelfstandigenaftrek en de startersaftrek." },
    { termino: "Mkb-winstvrijstelling", definicion: "Een percentage van je winst na ondernemersaftrek waarover je geen belasting betaalt." },
    { termino: "Zvw-bijdrage", definicion: "De inkomensafhankelijke bijdrage voor de Zorgverzekeringswet, die je als ondernemer via een aanslag betaalt." },
  ],
});
