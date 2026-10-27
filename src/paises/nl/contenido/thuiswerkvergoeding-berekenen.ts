import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.thuiswerkvergoeding-berekenen",
  h1: "Thuiswerkvergoeding berekenen {{anio}}",
  title: "Thuiswerkvergoeding {{anio}}: {{nl.thuiswerkvergoeding}} per dag onbelast",
  description:
    "Bereken hoeveel thuiswerkvergoeding je werkgever je in {{anio}} onbelast mag geven: {{nl.thuiswerkvergoeding}} per thuiswerkdag. Per jaar en per maand.",
  intro: [
    "Werk je thuis, dan mag je werkgever je een vergoeding geven voor de kosten van thuiswerken. Tot {{nl.thuiswerkvergoeding}} per thuiswerkdag is die onbelast.",
    "Vul in hoeveel dagen je per week thuiswerkt en je ziet hoeveel je per jaar onbelast kunt krijgen.",
  ],
  comoSeCalcula: [
    "Thuiswerkdagen per jaar = dagen per week × werkweken per jaar.",
    "Onbelaste vergoeding = thuiswerkdagen × {{nl.thuiswerkvergoeding}}.",
    "Krijg je meer per dag, dan is het deel daarboven belast loon, tenzij je werkgever het in de vrije ruimte onderbrengt.",
  ],
  ejemplo: ["Werk je 2 dagen per week thuis, 46 weken per jaar, dan zijn dat 92 dagen. Je kunt € 225,40 per jaar onbelast krijgen."],
  faq: [
    {
      pregunta: "Hoeveel is de onbelaste thuiswerkvergoeding in 2026?",
      respuesta: "{{nl.thuiswerkvergoeding}} per thuiswerkdag.",
    },
    {
      pregunta: "Wat als ik meer krijg dan {{nl.thuiswerkvergoeding}} per dag?",
      respuesta: "Dan is het deel daarboven belast loon. Je werkgever kan dat deel in de vrije ruimte van de werkkostenregeling onderbrengen.",
    },
    {
      pregunta: "En de dagen dat ik naar kantoor ga?",
      respuesta: "Voor de dagen dat je naar je werk reist, mag je werkgever een onbelaste reiskostenvergoeding per kilometer geven. Daarvoor hebben we een aparte berekening.",
    },
  ],
  glosario: [
    { termino: "Gerichte vrijstelling", definicion: "Een vergoeding die onbelast is tot een vast bedrag, los van de vrije ruimte." },
    { termino: "Thuiswerkdag", definicion: "Een dag waarop je thuis werkt in plaats van op je werkplek." },
  ],
});
