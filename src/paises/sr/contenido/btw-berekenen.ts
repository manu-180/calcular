import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.btw-berekenen",
  h1: "Btw berekenen in Suriname",
  title: "Btw berekenen Suriname: {{sr.btw-algemeen}}, {{sr.btw-verlaagd}} en {{sr.btw-verhoogd}}",
  description:
    "Tel btw op bij een bedrag of haal de btw eruit. Met het algemene tarief van {{sr.btw-algemeen}}, het verlaagde tarief van {{sr.btw-verlaagd}} en het verhoogde tarief van {{sr.btw-verhoogd}}.",
  intro: [
    "Sinds 1 januari 2023 heeft Suriname een belasting over de toegevoegde waarde, de btw. Die verving de omzetbelasting. Het algemene tarief is {{sr.btw-algemeen}}.",
    "Vul een bedrag in, kies of het met of zonder btw is en kies het tarief. Je ziet meteen hoeveel btw erin zit.",
  ],
  comoSeCalcula: [
    "Btw erbij: bedrag zonder btw × tarief. Bij {{sr.btw-algemeen}} is dat het bedrag × 0,10.",
    "Btw eruit: bedrag inclusief btw ÷ (1 + tarief) geeft het bedrag zonder btw. Het verschil is de btw. Bij {{sr.btw-algemeen}} deel je door 1,10.",
    "We ronden af op hele centen.",
  ],
  ejemplo: ["Een rekening van SRD 1.100 inclusief {{sr.btw-algemeen}} btw: 1.100 ÷ 1,10 = SRD 1.000 zonder btw, dus er zit SRD 100 btw in."],
  faq: [
    {
      pregunta: "Wanneer geldt het verlaagde tarief?",
      respuesta: "Volgens de Belastingdienst geldt {{sr.btw-verlaagd}} onder meer voor water voor huishoudelijk gebruik, elektriciteit, kookgas en binnenlands goederenvervoer. De wet noemt ook motorbrandstof en verzekering voor internationale ziektekosten.",
    },
    {
      pregunta: "Wanneer geldt het verhoogde tarief?",
      respuesta: "Het tarief van {{sr.btw-verhoogd}} geldt voor de goederen in bijlage 3 van de Wet BTW: personenauto's met een cilinderinhoud boven 2.500 cm3 of een cif-waarde vanaf US$ 40.000, motorfietsen boven 125 cm3, speedboten en jachten, kleine helikopters en vliegtuigen, wapens en munitie, en vuurwerk.",
    },
    {
      pregunta: "Wanneer reken je 0% btw?",
      respuesta: "Onder meer bij export van goederen, internationaal goederenvervoer door de lucht en over zee, en diensten voor afnemers die niet in Suriname wonen of gevestigd zijn. Daarnaast noemt bijlage 1 van de wet goederen en diensten met het nultarief.",
    },
    {
      pregunta: "Is vrijgesteld hetzelfde als 0%?",
      respuesta: "Nee. Bij een vrijstelling reken je geen btw, maar mag je de btw op je inkoop meestal ook niet aftrekken. Vrijgesteld zijn onder meer gezondheidszorg, financiële diensten, binnenlands personenvervoer en een aantal basisgoederen zoals verse groente, kip en vis.",
    },
  ],
  glosario: [
    { termino: "Btw", definicion: "Belasting over de toegevoegde waarde. Ondernemers rekenen die bij hun verkopen en dragen die af aan de Belastingdienst." },
    { termino: "Nultarief", definicion: "Een btw-tarief van 0%. De levering valt wel onder de btw, maar er wordt niets bijgeteld." },
  ],
});
