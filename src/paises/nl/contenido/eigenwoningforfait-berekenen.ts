import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.eigenwoningforfait-berekenen",
  h1: "Eigenwoningforfait berekenen {{anio}}",
  title: "Eigenwoningforfait {{anio}} berekenen met je WOZ-waarde",
  description:
    "Bereken je eigenwoningforfait over {{anio}}: een percentage van de WOZ-waarde van je koopwoning dat je bij je inkomen in box 1 telt. Volgens de tabel uit de wet.",
  intro: [
    "Woon je in je eigen koopwoning, dan tel je een bedrag bij je inkomen op: het eigenwoningforfait. Het is een percentage van de WOZ-waarde van je woning.",
    "Daar staat tegenover dat je de hypotheekrente mag aftrekken. Het verschil tussen die twee bepaalt of je belasting terugkrijgt of betaalt.",
  ],
  comoSeCalcula: [
    "Tot een WOZ-waarde van € 12.500 is het forfait nul. Daarboven loopt het percentage op: 0,10%, 0,20% en 0,25% voor lage waarden, en 0,35% voor woningen van € 75.000 tot en met € 1.350.000.",
    "Boven € 1.350.000 betaal je € 4.725 plus 2,35% over het deel van de WOZ-waarde boven € 1.350.000.",
    "Woon je maar een deel van het jaar in de woning, dan tel je een evenredig deel mee. Wij rekenen in hele maanden.",
  ],
  ejemplo: ["Is de WOZ-waarde van je woning € 400.000, dan is je eigenwoningforfait 0,35% daarvan: € 1.400 per jaar."],
  faq: [
    {
      pregunta: "Welke WOZ-waarde gebruik je?",
      respuesta: "De WOZ-waarde die je gemeente voor het kalenderjaar heeft vastgesteld. Die staat op je WOZ-beschikking.",
    },
    {
      pregunta: "Wat als je geen of weinig hypotheekrente betaalt?",
      respuesta: "Is je eigenwoningforfait hoger dan je aftrekbare kosten, dan krijg je een extra aftrek van {{nl.hillen}} van het verschil. Je betaalt dus maar over een klein deel van het forfait belasting.",
    },
    {
      pregunta: "Geldt het forfait ook voor een tweede woning?",
      respuesta: "Nee. Het eigenwoningforfait hoort bij je hoofdverblijf in box 1. Een tweede woning valt in box 3.",
    },
  ],
  glosario: [
    { termino: "WOZ-waarde", definicion: "De waarde van je woning volgens de Wet waardering onroerende zaken, vastgesteld door je gemeente." },
    { termino: "Villataks", definicion: "De hogere heffing van 2,35% over het deel van de WOZ-waarde boven € 1.350.000." },
  ],
});
