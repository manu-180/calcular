import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.skatt-pa-bostadsforsaljning",
  h1: "Räkna ut skatt vid bostadsförsäljning",
  title: "Reavinstskatt på bostad 2026: räkna ut skatten på vinsten",
  description:
    "Räkna ut vinsten och reavinstskatten när du säljer villa eller bostadsrätt: {{se.skatt-bostadsvinst}} på vinsten. Vid förlust får du dra av {{se.bostadsforlust-avdrag}}.",
  intro: [
    "Säljer du din bostad med vinst betalar du skatt på vinsten. Kalkylatorn räknar ut vinsten från priserna och utgifterna och visar skatten.",
    "Har du sålt med förlust visar den hur stor del du får dra av och ungefär hur mycket skatten minskar.",
  ],
  comoSeCalcula: [
    "Ta försäljningspriset och dra av utgifterna för försäljningen, till exempel mäklararvode.",
    "Dra sedan av inköpspriset med utgifterna för köpet, och de förbättringsutgifter du får räkna med.",
    "Är resultatet en vinst betalar du {{se.skatt-bostadsvinst}} i skatt på den.",
    "Är resultatet en förlust får du dra av {{se.bostadsforlust-avdrag}} av den. Avdraget ger en skattereduktion på {{se.ranteavdrag[sats]}} procent upp till {{se.ranteavdrag[grans]}} kronor och {{se.ranteavdrag[over]}} procent över det, om du inte har andra kapitalinkomster.",
  ],
  ejemplo: ["Du säljer en villa för 3 500 000 kronor, betalar 70 000 kronor i mäklararvode och köpte den för 2 800 000 kronor. Med 150 000 kronor i förbättringar blir vinsten 480 000 kronor och skatten 105 600 kronor."],
  faq: [
    {
      pregunta: "Hur mycket skatt betalar man när man säljer sin bostad?",
      respuesta: "{{se.skatt-bostadsvinst}} av vinsten när du säljer en privatbostad, till exempel en villa, en ägarlägenhet eller en bostadsrätt.",
    },
    {
      pregunta: "När betalar jag skatten?",
      respuesta: "Vinsten deklareras i inkomstdeklarationen året efter försäljningen, och skatten ingår i din slutliga skatt.",
    },
    {
      pregunta: "Kan jag skjuta upp skatten?",
      respuesta: "Köper du en ny bostad kan du i vissa fall begära uppskov med skatten. Läs om reglerna för uppskov hos Skatteverket innan du deklarerar.",
    },
    {
      pregunta: "Vad räknas som förbättringsutgifter?",
      respuesta: "Utgifter som gjort bostaden bättre, till exempel om- och tillbyggnad. Spara kvitton på dem.",
    },
  ],
  glosario: [
    { termino: "Reavinst", definicion: "Vinsten när du säljer något för mer än du betalade." },
    { termino: "Uppskov", definicion: "Att skjuta upp skatten på vinsten när du köper en ny bostad." },
  ],
});
