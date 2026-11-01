import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.overuren-berekenen",
  h1: "Overuren berekenen in Suriname",
  title: "Overuren berekenen Suriname: toeslag en overwerkbelasting",
  description:
    "Bereken je overwerkloon met de wettelijke toeslag (minstens {{sr.overwerk-factor}} keer je uurloon, op rustdagen {{sr.overwerk-factor-rustdag}} keer) en de lagere loonbelasting op overwerk.",
  intro: [
    "Werk je langer dan je rooster, dan heb je recht op een vergoeding voor overwerk. De Arbeidswet bepaalt hoeveel die minimaal is.",
    "Overwerk kan bovendien apart worden belast, met lagere tarieven dan je gewone loon. Dat gebeurt op jouw verzoek.",
  ],
  comoSeCalcula: [
    "Overuren op een gewone werkdag: minstens {{sr.overwerk-factor}} × je uurloon.",
    "Overuren op een rustdag of op zondag: minstens {{sr.overwerk-factor-rustdag}} × je uurloon.",
    "Loonbelasting op overwerk per maand: {{sr.overwerk-tarief[0].tasa}} tot en met {{sr.overwerk-tarief[0].hasta}}, {{sr.overwerk-tarief[1].tasa}} tot en met {{sr.overwerk-tarief[1].hasta}} en {{sr.overwerk-tarief[-1].tasa}} over de rest.",
  ],
  ejemplo: ["Met een uurloon van SRD 100 en 10 overuren op werkdagen verdien je SRD 1.500 extra. Met het aparte tarief betaal je daarover SRD 75 loonbelasting."],
  faq: [
    {
      pregunta: "Wat telt als overwerk?",
      respuesta: "Werk dat je in opdracht of met toestemming van je werkgever doet buiten het rooster dat voor jou geldt, binnen de regels van de wet.",
    },
    {
      pregunta: "Hoeveel krijg ik als ik op zondag werk?",
      respuesta: "Wie op zondag of een gelijkgestelde dag werkt, krijgt minstens {{sr.overwerk-factor-rustdag}} keer het uurloon. Is schriftelijk of in een cao afgesproken dat je daarvoor geen andere rustdag terugkrijgt, dan is het minstens drie keer het uurloon.",
    },
    {
      pregunta: "Moet ik het aparte belastingtarief zelf aanvragen?",
      respuesta: "Ja. De wet zegt dat overwerk op verzoek van de werknemer zo wordt belast. Vraag het aan bij je werkgever, die de loonbelasting inhoudt.",
    },
    {
      pregunta: "Betaal ik ook AOV-premie over overwerk?",
      respuesta: "Ja. Overwerkloon is loon, en de AOV-premie wordt over je hele zuiver loon berekend. Het aparte tarief geldt alleen voor de loonbelasting.",
    },
  ],
  glosario: [
    { termino: "Overwerk", definicion: "Werk buiten het vastgestelde arbeidsrooster, in opdracht of met toestemming van de werkgever." },
    { termino: "Rustdag", definicion: "Een vrije dag in de week volgens de Arbeidswet." },
  ],
});
