import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.viivastyskorkolaskuri",
  h1: "Viivästyskorkolaskuri: laske korko myöhästyneelle maksulle",
  title: "Viivästyskorkolaskuri: korkolain mukainen viivästyskorko",
  description:
    "Laske viivästyskorko korkolain mukaan. Viitekorko on nyt {{fi.viitekorko}}, ja tavallinen viivästyskorko on viitekorko plus {{fi.viivastyskoron-lisa[kuluttaja]}}.",
  intro: [
    "Kun lasku maksetaan myöhässä, velkoja voi periä viivästyskorkoa. Laskuri laskee koron eräpäivästä maksupäivään korkolain mukaisella korolla.",
    "Jos viivästys osuu usealle puolivuotiskaudelle, laskuri käyttää kunkin kauden omaa viitekorkoa.",
  ],
  comoSeCalcula: [
    "Suomen Pankki vahvistaa viitekoron puoleksi vuodeksi kerrallaan. Viitekorko on nyt {{fi.viitekorko}}.",
    "Tavallinen viivästyskorko on viitekorko plus {{fi.viivastyskoron-lisa[kuluttaja]}}. Yritysten välisissä kaupallisissa sopimuksissa lisä on {{fi.viivastyskoron-lisa[kaupallinen]}}.",
    "Korko lasketaan jokaiselta viivästyspäivältä: summa kertaa vuosikorko kertaa päivät jaettuna 365:llä.",
  ],
  ejemplo: [
    "Lasku on 1 000 euroa, ja se maksetaan 30 päivää eräpäivän jälkeen vuonna 2026. Viivästyskorko on 9,5 % vuodessa.",
    "Korkoa kertyy 1 000 × 9,5 % × 30 / 365 eli 7,81 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko viivästyskorko on nyt?",
      respuesta: "Viitekorko on {{fi.viitekorko}}, joten tavallinen viivästyskorko on viitekorko plus {{fi.viivastyskoron-lisa[kuluttaja]}} ja kaupallisissa sopimuksissa viitekorko plus {{fi.viivastyskoron-lisa[kaupallinen]}}.",
    },
    {
      pregunta: "Mistä päivästä viivästyskorko alkaa?",
      respuesta: "Jos eräpäivä on sovittu etukäteen, viivästyskorkoa maksetaan eräpäivästä lukien. Jos eräpäivää ei ole sovittu, korko alkaa, kun laskun lähettämisestä on kulunut 30 päivää.",
    },
    {
      pregunta: "Voiko sopimuksessa olla korkeampi korko?",
      respuesta: "Jos velalle maksettiin ennen eräpäivää korkeampaa korkoa kuin viivästyskorko, viivästyskorko maksetaan saman perusteen mukaan kuin ennen eräpäivää.",
    },
  ],
  glosario: [
    { termino: "Viitekorko", definicion: "Suomen Pankin puolivuosittain vahvistama korko, josta viivästyskorko lasketaan." },
    { termino: "Viivästyskorko", definicion: "Korko, jonka velallinen maksaa myöhästyneelle maksulle." },
  ],
});
