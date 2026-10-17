import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.kinderbijslag-berekenen",
  h1: "Kinderbijslag berekenen 2026",
  title: "Kinderbijslag 2026 berekenen: bedrag per kind per kwartaal",
  description:
    "Bereken hoeveel kinderbijslag je krijgt. In 2026 is het per kind per kwartaal {{nl.kinderbijslag[0-5]}} tot {{nl.kinderbijslag[12-17]}}, afhankelijk van de leeftijd. Bedragen van de SVB.",
  intro: [
    "Kinderbijslag is een bijdrage van de overheid in de kosten voor je kinderen tot 18 jaar. De SVB betaalt het per kwartaal, en het bedrag hangt af van de leeftijd van je kind.",
    "Nu krijg je per kind per kwartaal {{nl.kinderbijslag[0-5]}} voor een kind van 0 tot en met 5 jaar, {{nl.kinderbijslag[6-11]}} van 6 tot en met 11 jaar en {{nl.kinderbijslag[12-17]}} van 12 tot en met 17 jaar.",
  ],
  comoSeCalcula: [
    "Tel per leeftijdsgroep hoeveel kinderen je hebt en vermenigvuldig met het bedrag per kwartaal.",
    "De leeftijd telt op de eerste dag van het kwartaal: 1 januari, 1 april, 1 juli of 1 oktober.",
    "Voor een bedrag per jaar rekenen we vier keer het bedrag van nu.",
  ],
  ejemplo: ["Met een kind van 3 en een kind van 13 krijg je nu {{nl.kinderbijslag[0-5]}} + {{nl.kinderbijslag[12-17]}} per kwartaal."],
  faq: [
    {
      pregunta: "Wanneer betaalt de SVB de kinderbijslag?",
      respuesta: "Na afloop van elk kwartaal. De betaling over het vierde kwartaal van 2026 komt op 4 januari 2027.",
    },
    {
      pregunta: "Wanneer krijg je het hogere bedrag als je kind 6 of 12 wordt?",
      respuesta: "Vanaf het kwartaal nadat je kind jarig is geweest. Is je kind op de eerste dag van het kwartaal nog geen 6 of 12, dan krijg je dat kwartaal nog het oude bedrag.",
    },
    {
      pregunta: "Vanaf wanneer krijg je kinderbijslag voor een pasgeboren kind?",
      respuesta: "Is je kind op de eerste dag van een kwartaal geboren, dan vanaf dat kwartaal. Anders vanaf het volgende kwartaal.",
    },
  ],
  glosario: [
    { termino: "SVB", definicion: "De Sociale Verzekeringsbank, die de kinderbijslag en de AOW uitbetaalt." },
    { termino: "Kwartaal", definicion: "Een periode van drie maanden. De kwartalen beginnen op 1 januari, 1 april, 1 juli en 1 oktober." },
  ],
});
