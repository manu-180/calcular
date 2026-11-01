import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.kursi-i-kembimit",
  h1: "Kursi i këmbimit: euro dhe dollar në lekë",
  title: "Kursi i këmbimit sot: {{al.eur}} për një euro",
  description: "Kursi zyrtar i Bankës së Shqipërisë: euro {{al.eur}}, dollar {{al.usd}}. Këmbeni shumën tuaj nga valuta në lekë ose nga lekët në valutë.",
  intro: [
    "Banka e Shqipërisë publikon çdo ditë pune kursin zyrtar të lekut: më {{al.eur#desde}} një euro vlente {{al.eur}} dhe një dollar amerikan {{al.usd}}.",
    "Kursi llogaritet nga kuotimet e bankave në tregun ndërbankar, në intervalin 11.30 deri 12.00. Është një nivel reference. Bankat dhe zyrat e këmbimit përdorin kurset e tyre.",
  ],
  comoSeCalcula: [
    "Nga valuta në lekë: shuma shumëzohet me kursin zyrtar.",
    "Nga lekët në valutë: shuma pjesëtohet me kursin zyrtar.",
    "Shqipëria ka regjim të lirë të kursit të këmbimit: vlera e lekut përcaktohet në treg, dhe Banka e Shqipërisë mund të ndërhyjë për të shmangur çrregullimet.",
  ],
  ejemplo: [
    "Me kursin 90,90 lekë për një euro, 100 euro bëjnë 9 090 lekë. Nëse keni 8 116 lekë dhe dollari është 81,16 lekë, ato bëjnë 100 dollarë.",
  ],
  faq: [
    {
      pregunta: "Pse banka më jep një kurs tjetër?",
      respuesta: "Kursi zyrtar është një nivel reference, sipas Bankës së Shqipërisë. Bankat dhe zyrat e këmbimit shtojnë diferencën midis blerjes dhe shitjes.",
    },
    {
      pregunta: "Kur përditësohet kursi zyrtar?",
      respuesta: "Në ditët e punës, pas mesditës, sipas Udhëzimit 66/2006 të Bankës së Shqipërisë. Në fundjavë mbetet kursi i ditës së fundit të punës.",
    },
    {
      pregunta: "Sa është norma bazë e interesit?",
      respuesta: "Banka e Shqipërisë e publikon në faqen e saj. Norma bazë ndikon te interesat e kredive dhe depozitave në lekë, jo drejtpërdrejt te kursi i ditës.",
    },
  ],
  glosario: [
    { termino: "Kursi zyrtar", definicion: "Kursi që llogarit dhe publikon Banka e Shqipërisë." },
    { termino: "Fiks", definicion: "Procesi ku bankat japin kuotimet nga dalin kursi dhe mesataret e blerjes e shitjes." },
  ],
});
