import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.ektakti-eisfora-merismata",
  h1: "Special Defence Contribution on dividends",
  title: "Cyprus dividend tax 2026: {{cy.ektakti-eisfora-amynas[merismata]}} defence contribution",
  description: "Work out your net dividend after the Special Defence Contribution ({{cy.ektakti-eisfora-amynas[merismata]}} from 2026) and GeSY of {{cy.eisfores-gesy[eisodimatias]}}.",
  intro: [
    "Since the tax reform, the Special Defence Contribution on dividends for Cyprus tax residents is {{cy.ektakti-eisfora-amynas[merismata]}}.",
    "Dividends from older profits still pay the old rate. Choose which profits the dividend comes from.",
  ],
  comoSeCalcula: [
    "Special Defence Contribution: {{cy.ektakti-eisfora-amynas[merismata]}} of the dividend, or {{cy.ektakti-eisfora-amynas[merismata-palaia]}} for dividends from profits up to 2025 paid within six years of the amendment.",
    "GeSY: {{cy.eisfores-gesy[eisodimatias]}} of the dividend.",
    "Dividends don't pay income tax on the bands.",
  ],
  ejemplo: [
    "A €10,000 dividend from 2026 profits pays €500 defence contribution and €265 GeSY. You keep €9,235.",
  ],
  faq: [
    { pregunta: "Who pays the defence contribution?", respuesta: "Individuals who are Cyprus tax residents. The law has special rules for companies and for dividends passed through other companies." },
    { pregunta: "Are dividends subject to income tax?", respuesta: "No. The income tax law exempts dividend income. The defence contribution and GeSY apply instead." },
    { pregunta: "Does deemed dividend distribution still apply?", respuesta: "Only for profits up to tax year 2025. Dividends already deemed distributed are deducted from dividends paid later." },
  ],
  glosario: [
    { termino: "Tax resident", definicion: "Someone who spends more than 183 days a year in Cyprus or meets the 60-day rule." },
  ],
});
