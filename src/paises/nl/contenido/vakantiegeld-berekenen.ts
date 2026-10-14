import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.vakantiegeld-berekenen",
  h1: "Vakantiegeld berekenen",
  title: "Vakantiegeld berekenen 2026: minstens {{nl.vakantiebijslag}} van je loon",
  description:
    "Bereken hoeveel bruto vakantiegeld je krijgt. Het wettelijk minimum is {{nl.vakantiebijslag}} van je brutoloon over de opbouwperiode van juni tot en met mei.",
  intro: [
    "Als werknemer heb je recht op vakantiebijslag, beter bekend als vakantiegeld. Volgens de Wet minimumloon en minimumvakantiebijslag is dat minstens {{nl.vakantiebijslag}} van je brutoloon.",
    "Je bouwt het op van juni tot en met mei, en de wet zegt dat je werkgever het in juni uitbetaalt. In je contract of cao kan een ander moment of een hoger percentage staan.",
  ],
  comoSeCalcula: [
    "Tel je brutoloon op over de maanden dat je in de opbouwperiode hebt gewerkt.",
    "Neem daar {{nl.vakantiebijslag}} van, of het percentage uit je contract of cao als dat hoger is.",
    "Het resultaat is een brutobedrag. Over vakantiegeld betaal je loonheffing, dus netto houd je minder over.",
  ],
  ejemplo: ["Verdien je € 3.500 bruto per maand en werk je het hele jaar, dan is je loon € 42.000 en je vakantiegeld minstens € 3.360 bruto."],
  faq: [
    {
      pregunta: "Wanneer krijg je vakantiegeld?",
      respuesta: "De wet zegt dat je werkgever het vakantiegeld in juni uitbetaalt, over de periode tot en met 31 mei. In een schriftelijke afspraak of cao kan een ander moment staan, maar je krijgt het minstens één keer per jaar.",
    },
    {
      pregunta: "Krijg je vakantiegeld als je uit dienst gaat?",
      respuesta: "Ja. Bij het einde van je dienstverband betaalt je werkgever het vakantiegeld uit dat je tot dan hebt opgebouwd.",
    },
    {
      pregunta: "Kan het vakantiegeld lager zijn dan {{nl.vakantiebijslag}}?",
      respuesta: "Alleen als een cao of publiekrechtelijke regeling dat bepaalt, en ook dan gelden er grenzen. Bij een hoog loon (boven drie keer het minimumloon) hoeft de wettelijke vakantiebijslag niet over het hele loon te worden berekend. Kijk in je contract of cao wat er voor jou geldt.",
    },
    {
      pregunta: "Telt een uitkering mee voor je vakantiegeld?",
      respuesta: "Ja. Krijg je tijdens je dienstverband een uitkering uit de Ziektewet of de Werkloosheidswet, dan telt die volgens de wet mee voor de berekening van je vakantiegeld.",
    },
  ],
  glosario: [
    { termino: "Vakantiebijslag", definicion: "De officiële naam van vakantiegeld." },
    { termino: "Opbouwperiode", definicion: "De periode waarover je vakantiegeld opbouwt: wettelijk van 1 juni tot en met 31 mei." },
  ],
});
