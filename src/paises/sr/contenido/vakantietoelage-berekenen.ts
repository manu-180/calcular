import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.vakantietoelage-berekenen",
  h1: "Vakantietoelage berekenen",
  title: "Vakantietoelage Suriname berekenen: {{sr.vakantietoelage}} van je dagloon",
  description:
    "Je vakantietoelage is de helft van het loon over je vakantiedagen. Bereken het bedrag en zie welk deel vrij is van loonbelasting (tot {{sr.vrijstelling-vakantie-bonus}} per jaar).",
  intro: [
    "Neem je vakantie op, dan betaalt je werkgever volgens de Vacantiewet naast je gewone loon een vakantietoelage. Die is gelijk aan de helft van het loon over de dagen dat je vakantie hebt.",
    "Een deel van de toelage is vrij van loonbelasting. Hier zie je hoeveel je krijgt en welk deel belast is.",
  ],
  comoSeCalcula: [
    "Loon per werkdag: je maandloon × 12, gedeeld door het aantal werkdagen in een jaar (52 weken × 5 of 6 dagen).",
    "Vakantietoelage: {{sr.vakantietoelage}} × loon per werkdag × aantal vakantiedagen.",
    "Vrij van loonbelasting: per jaar tot het loon van een maand, met een maximum van {{sr.vrijstelling-vakantie-bonus}}. Wat daarboven komt, is belast.",
  ],
  ejemplo: ["Met SRD 15.000 per maand en een vijfdaagse werkweek is je dagloon SRD 692,31. Voor 12 vakantiedagen krijg je SRD 4.153,86 vakantietoelage, helemaal vrij van loonbelasting."],
  faq: [
    {
      pregunta: "Wanneer krijg ik de vakantietoelage?",
      respuesta: "De werkgever betaalt de toelage over de dagen dat je vakantie opneemt. Neem je zes dagen of meer achter elkaar op, dan moet hij de toelage over die periode in elk geval uitbetalen.",
    },
    {
      pregunta: "Mag mijn werkgever de toelage verrekenen?",
      respuesta: "Uitkeringen die de werkgever alleen voor je vakantie van dat jaar betaalt, mogen worden verrekend met de toelage. Beslag of verrekening op de toelage zelf mag niet, behalve voor belastingschulden en alimentatie.",
    },
    {
      pregunta: "Telt overwerk mee voor het loon?",
      respuesta: "Nee. Voor de Vacantiewet tellen overwerkgeld en vergoedingen voor tijdelijk ander werk niet mee als loon.",
    },
    {
      pregunta: "Waarom is het dagloon een schatting?",
      respuesta: "De wet noemt de helft van het loon over je vakantiedagen, maar geen rekenregel voor het dagloon. Wij delen het jaarloon door het aantal werkdagen. Staat in je contract of cao een andere regel, dan geldt die.",
    },
  ],
  glosario: [
    { termino: "Vakantietoelage", definicion: "Extra uitkering tijdens je vakantie, naast je gewone loon." },
    { termino: "Vrijstelling", definicion: "Het deel van een uitkering waarover je geen loonbelasting betaalt." },
  ],
});
