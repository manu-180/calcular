import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.kilometervergoeding-berekenen",
  h1: "Kilometervergoeding berekenen {{anio}}",
  title: "Kilometervergoeding {{anio}}: {{nl.kilometervergoeding}} per km onbelast",
  description:
    "Bereken je onbelaste reiskostenvergoeding voor woon-werkverkeer in {{anio}}. Je werkgever mag {{nl.kilometervergoeding}} per kilometer onbelast vergoeden.",
  intro: [
    "Je werkgever mag je reiskosten vergoeden zonder dat je daar belasting over betaalt, tot {{nl.kilometervergoeding}} per kilometer. Dit heet een gerichte vrijstelling in de werkkostenregeling.",
    "Vul je afstand en het aantal dagen in en je ziet hoeveel je per jaar onbelast kunt krijgen.",
  ],
  comoSeCalcula: [
    "Kilometers per jaar = enkele reis × 2 × dagen per week × werkweken per jaar.",
    "Onbelaste vergoeding = kilometers × {{nl.kilometervergoeding}}.",
    "Krijg je meer per kilometer, dan is het deel daarboven belast loon, tenzij je werkgever het in de vrije ruimte van de werkkostenregeling onderbrengt.",
  ],
  ejemplo: ["Rijd je 3 dagen per week 20 kilometer heen en 20 terug, 46 weken per jaar, dan is dat 5.520 kilometer. Je kunt € 1.269,60 per jaar onbelast krijgen."],
  faq: [
    {
      pregunta: "Hoeveel is de onbelaste kilometervergoeding in 2026?",
      respuesta: "{{nl.kilometervergoeding}} per kilometer.",
    },
    {
      pregunta: "Wat als ik meer dan {{nl.kilometervergoeding}} per kilometer krijg?",
      respuesta: "Dan is het deel boven {{nl.kilometervergoeding}} per kilometer belast loon. Je werkgever kan dat deel ook in de vrije ruimte van de werkkostenregeling onderbrengen.",
    },
    {
      pregunta: "Krijg je ook een vergoeding als je thuiswerkt?",
      respuesta: "Je werkgever mag voor een thuiswerkdag een onbelaste thuiswerkvergoeding geven. Daarvoor hebben we een aparte berekening.",
    },
  ],
  glosario: [
    { termino: "Werkkostenregeling", definicion: "De regels voor onbelaste vergoedingen en verstrekkingen van werkgevers aan werknemers." },
    { termino: "Vrije ruimte", definicion: "Het deel van de loonsom waarbinnen een werkgever onbelast vergoedingen mag geven." },
  ],
});
