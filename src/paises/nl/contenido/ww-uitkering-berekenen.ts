import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.ww-uitkering-berekenen",
  h1: "WW-uitkering berekenen: hoogte en duur",
  title: "WW-uitkering berekenen {{anio}}: hoeveel en hoelang?",
  description:
    "Bereken je WW-uitkering: {{nl.ww-percentages[eerste-twee-maanden]}} van je maandloon de eerste twee maanden, daarna {{nl.ww-percentages[daarna]}}. Met de duur op basis van je arbeidsverleden.",
  intro: [
    "Word je werkloos, dan kun je een WW-uitkering krijgen van het UWV. De eerste twee maanden krijg je {{nl.ww-percentages[eerste-twee-maanden]}} van je WW-maandloon, daarna {{nl.ww-percentages[daarna]}}.",
    "Hoelang je WW krijgt, hangt af van je arbeidsverleden. Met alleen de wekeneis is het drie maanden. Voldoe je ook aan de jareneis, dan krijg je langer WW, tot maximaal 24 maanden.",
  ],
  comoSeCalcula: [
    "Het UWV rekent met je dagloon: je loon in het jaar voor je werkloosheid gedeeld door het aantal werkdagen. Je WW-maandloon is je dagloon maal 21,75. Dat komt ongeveer uit op je gemiddelde bruto maandloon.",
    "Het dagloon is begrensd op het maximumdagloon van {{nl.ww-maximumdagloon}}.",
    "Duur: de eerste 10 jaar arbeidsverleden geven elk een maand WW. Daarna telt elk jaar tot en met 2015 voor een maand, en elk jaar vanaf 2016 voor een halve maand. Minimaal 3 en maximaal 24 maanden.",
  ],
  ejemplo: [
    "Verdiende je € 3.500 bruto per maand en heb je 5 jaar arbeidsverleden, dan krijg je ongeveer € 2.625 bruto per maand de eerste twee maanden en daarna € 2.450, vijf maanden lang.",
  ],
  faq: [
    {
      pregunta: "Wat is de wekeneis?",
      respuesta: "Je moet in de laatste 36 weken voordat je werkloos werd in minstens 26 weken hebben gewerkt. Hoeveel uur je per week werkte, maakt niet uit. Voldoe je daaraan, dan krijg je minstens 3 maanden WW.",
    },
    {
      pregunta: "Wat is de jareneis?",
      respuesta: "Je moet in de laatste 5 kalenderjaren voor het jaar waarin je werkloos werd, in minstens 4 jaar loon hebben gehad over 208 uur of meer. Dan wordt je WW langer dan 3 maanden.",
    },
    {
      pregunta: "Telt het jaar waarin je werkloos wordt mee?",
      respuesta: "Nee. Het jaar waarin je WW begint, telt niet mee voor je arbeidsverleden.",
    },
    {
      pregunta: "Krijg je de WW netto of bruto?",
      respuesta: "De bedragen zijn bruto. Het UWV houdt er loonheffing op in. Hoeveel dat is, verschilt per situatie.",
    },
  ],
  glosario: [
    { termino: "Dagloon", definicion: "Je gemiddelde loon per werkdag in het jaar voor je werkloosheid, waarmee het UWV je WW berekent." },
    { termino: "Arbeidsverleden", definicion: "Het aantal kalenderjaren waarin je genoeg hebt gewerkt om mee te tellen voor de duur van je WW." },
    { termino: "Maximumdagloon", definicion: "Het hoogste dagloon waarmee het UWV rekent." },
  ],
});
