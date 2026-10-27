import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.arbeidskorting-berekenen",
  h1: "Arbeidskorting berekenen {{anio}}",
  title: "Arbeidskorting {{anio}} berekenen: maximaal {{nl.arbeidskorting-grenzen[max3]}}",
  description:
    "Bereken je arbeidskorting over {{anio}}. De korting loopt op tot {{nl.arbeidskorting-grenzen[max3]}} en wordt boven {{nl.arbeidskorting-grenzen[grens3]}} arbeidsinkomen weer afgebouwd.",
  intro: [
    "De arbeidskorting is een heffingskorting voor iedereen die werkt, in loondienst of als ondernemer. Ze gaat direct van je belasting af.",
    "Hoe hoog de korting is, hangt af van je arbeidsinkomen. Vul je loon of winst per jaar in en je ziet je arbeidskorting voor 2026.",
  ],
  comoSeCalcula: [
    "Tot {{nl.arbeidskorting-grenzen[grens1]}}: {{nl.arbeidskorting-tarieven[opbouw1]}} van je arbeidsinkomen.",
    "Daarboven komt er {{nl.arbeidskorting-tarieven[opbouw2]}} bij over het deel boven {{nl.arbeidskorting-grenzen[grens1]}}, tot een totaal van {{nl.arbeidskorting-grenzen[max2]}}.",
    "Boven {{nl.arbeidskorting-grenzen[grens2]}} komt er nog {{nl.arbeidskorting-tarieven[opbouw3]}} bij, tot het maximum van {{nl.arbeidskorting-grenzen[max3]}}.",
    "Boven {{nl.arbeidskorting-grenzen[grens3]}} gaat er {{nl.arbeidskorting-tarieven[afbouw]}} af over het meerdere, tot nul vanaf {{nl.arbeidskorting-grenzen[einde]}}.",
  ],
  ejemplo: ["Met een arbeidsinkomen van € 40.000 is je arbeidskorting € 5.300 + 1,95% × (€ 40.000 − € 25.845) = € 5.576,02."],
  faq: [
    {
      pregunta: "Wat telt als arbeidsinkomen?",
      respuesta: "Wat je verdient met werken: je loon, winst uit een onderneming en resultaat uit overig werk. Ook loon tijdens ziekte in je dienstverband en uitkeringen uit de Wet arbeid en zorg tellen mee. Een WW-uitkering of pensioen niet.",
    },
    {
      pregunta: "Krijg je de arbeidskorting ook als zzp'er?",
      respuesta: "Ja. Je winst uit onderneming telt als arbeidsinkomen, dus ook als ondernemer krijg je arbeidskorting.",
    },
    {
      pregunta: "Waarom wordt de arbeidskorting afgebouwd?",
      respuesta: "De wet bouwt de korting af boven {{nl.arbeidskorting-grenzen[grens3]}} arbeidsinkomen. Vanaf {{nl.arbeidskorting-grenzen[einde]}} krijg je geen arbeidskorting meer.",
    },
    {
      pregunta: "Kan de arbeidskorting hoger zijn dan je belasting?",
      respuesta: "Je kunt nooit meer korting krijgen dan je aan belasting en premies betaalt. Bij een laag inkomen gebruik je de kortingen daardoor soms niet helemaal.",
    },
  ],
  glosario: [
    { termino: "Heffingskorting", definicion: "Een bedrag dat direct van je inkomstenbelasting afgaat." },
    { termino: "Afbouwgrens", definicion: "Het inkomen vanaf waar de korting weer kleiner wordt." },
  ],
});
