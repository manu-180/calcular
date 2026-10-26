import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.sjuklon",
  h1: "Räkna ut sjuklön och karensavdrag",
  title: "Sjuklön 2026: räkna ut sjuklön och karensavdrag",
  description:
    "Räkna ut din sjuklön de första 14 dagarna: {{se.sjuklon}} av lönen, minus ett karensavdrag på {{se.karensavdrag}} av en veckas sjuklön.",
  intro: [
    "När du är sjuk betalar arbetsgivaren sjuklön de första 14 kalenderdagarna. Kalkylatorn visar hur mycket du får och hur mycket lägre lönen blir.",
    "Karensavdraget ersatte karensdagen. Det motsvarar en dags sjuklön för den som arbetar fem dagar i veckan.",
  ],
  comoSeCalcula: [
    "Sjuklönen är {{se.sjuklon}} av den lön du går miste om under sjukdagarna.",
    "Karensavdraget är {{se.karensavdrag}} av den sjuklön du skulle få under en genomsnittlig arbetsvecka.",
    "Avdraget görs en gång per sjukperiod. Blir du sjuk igen inom fem dagar räknas det som samma period, utan nytt avdrag.",
    "Har du fått tio karensavdrag under de senaste tolv månaderna görs inget nytt avdrag.",
  ],
  ejemplo: [
    "Med 32 000 kronor i månaden och 40 timmars arbetsvecka går du miste om 4 430,77 kronor i lön under tre sjukdagar. Sjuklönen blir 3 544,62 kronor, och efter karensavdraget på 1 181,54 kronor får du 2 363,08 kronor.",
  ],
  faq: [
    {
      pregunta: "Hur länge betalar arbetsgivaren sjuklön?",
      respuesta: "Under sjuklöneperioden, som är de första 14 kalenderdagarna i en sjukperiod. Därefter kan du få sjukpenning från Försäkringskassan.",
    },
    {
      pregunta: "När behöver jag läkarintyg?",
      respuesta: "Från och med den sjunde kalenderdagen efter sjukanmälan behöver du ett intyg från läkare eller tandläkare för att få sjuklön.",
    },
    {
      pregunta: "Varför får jag ingen sjuklön för en enda sjukdag?",
      respuesta:
        "Karensavdraget är en femtedel av en veckas sjuklön. Arbetar du fem dagar i veckan är det lika mycket som en dags sjuklön, så den första dagen blir utan ersättning.",
    },
  ],
  glosario: [
    { termino: "Sjuklön", definicion: "Ersättning från arbetsgivaren de första 14 dagarna du är sjuk." },
    { termino: "Karensavdrag", definicion: "Ett avdrag från sjuklönen som ersätter den tidigare karensdagen." },
    { termino: "Sjukperiod", definicion: "Tid då du i en följd är sjuk och inte kan arbeta." },
  ],
});
