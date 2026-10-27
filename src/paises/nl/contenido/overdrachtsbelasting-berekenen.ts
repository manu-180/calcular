import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.overdrachtsbelasting-berekenen",
  h1: "Overdrachtsbelasting berekenen {{anio}}",
  title: "Overdrachtsbelasting {{anio}} berekenen: 0%, 2%, 8% of 10,4%",
  description:
    "Bereken de overdrachtsbelasting bij het kopen van een huis in {{anio}}. Met de startersvrijstelling tot {{nl.startersvrijstelling-grens}} en het tarief van 8% voor beleggingswoningen.",
  intro: [
    "Koop je een huis of ander vastgoed, dan betaal je overdrachtsbelasting over de koopsom. Voor een woning waarin je zelf gaat wonen is dat {{nl.overdrachtsbelasting[eigen-woning]}}. Voor een woning waarin je niet zelf woont {{nl.overdrachtsbelasting[overige-woning]}}, en voor andere onroerende zaken {{nl.overdrachtsbelasting[niet-woning]}}.",
    "Ben je jonger dan {{nl.startersvrijstelling-leeftijd}} en koop je een huis tot {{nl.startersvrijstelling-grens}} om er zelf te wonen? Dan betaal je met de startersvrijstelling meestal geen overdrachtsbelasting, ook als je eerder een koopwoning had.",
  ],
  comoSeCalcula: [
    "Kies wat je koopt. Ga je er zelf wonen, dan kijken we of je recht hebt op de startersvrijstelling.",
    "Voor de startersvrijstelling moet je meerderjarig en jonger dan {{nl.startersvrijstelling-leeftijd}} zijn op de dag van de overdracht, de vrijstelling niet eerder hebben gebruikt en mag de woning niet meer kosten dan {{nl.startersvrijstelling-grens}}.",
    "Koop je samen, vul dan je eigen aandeel in. De belasting gaat over jouw deel, maar de woningwaardegrens over de hele woning.",
  ],
  ejemplo: [
    "Je bent 40 en koopt een huis voor € 450.000 om er zelf te wonen. Je betaalt {{nl.overdrachtsbelasting[eigen-woning]}}: € 9.000 overdrachtsbelasting.",
  ],
  faq: [
    {
      pregunta: "Wanneer betaal je 8% overdrachtsbelasting?",
      respuesta: "Sinds 2026 voor een woning waarin je niet zelf voor langere tijd gaat wonen, zoals een tweede woning, een vakantiewoning of een woning voor verhuur. Daarvoor gold 10,4%.",
    },
    {
      pregunta: "Wat als de woning net boven de grens kost?",
      respuesta: "Dan geldt de startersvrijstelling helemaal niet en betaal je {{nl.overdrachtsbelasting[eigen-woning]}} over de hele koopsom. Het gaat om de waarde inclusief aanhorigheden zoals een tuin, schuur of garage.",
    },
    {
      pregunta: "Kunnen we de startersvrijstelling allebei gebruiken?",
      respuesta: "Ja, als jullie allebei aan de voorwaarden voldoen. Voldoet maar één van jullie, dan geldt de vrijstelling alleen voor het deel van die persoon.",
    },
    {
      pregunta: "Moet je de startersvrijstelling gebruiken?",
      respuesta: "Nee. Je mag kiezen voor het tarief van {{nl.overdrachtsbelasting[eigen-woning]}}. Dan kun je de vrijstelling later nog gebruiken, als je dan nog aan de voorwaarden voldoet.",
    },
  ],
  glosario: [
    { termino: "Startersvrijstelling", definicion: "Eenmalige vrijstelling van overdrachtsbelasting voor kopers van 18 tot 35 jaar die zelf in de woning gaan wonen." },
    { termino: "Waarde in het economisch verkeer", definicion: "De prijs die de woning op de vrije markt zou opbrengen. Meestal de koopsom." },
  ],
});
