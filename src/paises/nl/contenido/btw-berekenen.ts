import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.btw-berekenen",
  h1: "Btw berekenen: 21% en 9%",
  title: "Btw berekenen {{anio}}: erbij of eraf, {{nl.btw-hoog}} en {{nl.btw-laag}}",
  description:
    "Reken btw uit met het algemene tarief van {{nl.btw-hoog}} of het verlaagde tarief van {{nl.btw-laag}}. Van exclusief naar inclusief btw en terug, met de tarieven van de Belastingdienst.",
  intro: [
    "In Nederland is het algemene btw-tarief {{nl.btw-hoog}}. Voor een beperkte lijst goederen en diensten geldt het verlaagde tarief van {{nl.btw-laag}}, en voor onder meer export het 0%-tarief.",
    "Vul een bedrag in, kies of het exclusief of inclusief btw is, en je ziet meteen hoeveel btw erin zit.",
  ],
  comoSeCalcula: [
    "Btw erbij: bedrag exclusief btw × tarief. Bij {{nl.btw-hoog}} is dat bedrag × 0,21.",
    "Btw eruit halen: bedrag inclusief btw ÷ (1 + tarief) geeft het bedrag exclusief btw. Het verschil is de btw. Bij {{nl.btw-hoog}} deel je door 1,21, bij {{nl.btw-laag}} door 1,09.",
    "We ronden af op hele centen.",
  ],
  ejemplo: [
    "Een factuur van € 250 inclusief {{nl.btw-hoog}} btw: 250 ÷ 1,21 = € 206,61 exclusief btw, dus er zit € 43,39 btw in.",
  ],
  faq: [
    {
      pregunta: "Wanneer geldt het verlaagde btw-tarief?",
      respuesta:
        "Het verlaagde tarief geldt voor een beperkte lijst goederen en diensten. Volgens de Belastingdienst gaat het bij goederen onder meer om voedingsmiddelen, water, sierteeltproducten, geneesmiddelen en hulpmiddelen, kunst en antiek, en boeken en tijdschriften.",
    },
    {
      pregunta: "Wanneer reken je 0% btw?",
      respuesta: "Het 0%-tarief geldt vooral bij levering van goederen aan het buitenland en bij een aantal grensoverschrijdende diensten, zoals personenvervoer per vliegtuig van of naar een bestemming buiten Nederland. Op de factuur vermeld je dat het 0%-tarief is toegepast.",
    },
    {
      pregunta: "Is 0% btw hetzelfde als vrijgesteld van btw?",
      respuesta: "Nee. Bij het 0%-tarief valt de levering wel onder de btw, alleen is het tarief nul. Bij een vrijstelling reken je helemaal geen btw, bijvoorbeeld bij onderwijs, gezondheidszorg, kinderopvang en financiële diensten. Voor vrijgestelde activiteiten gelden andere regels voor het aftrekken van btw over je kosten.",
    },
    {
      pregunta: "Waarom deel je door 1,21 en trek je niet gewoon 21% af?",
      respuesta: "Omdat de 21% berekend is over het bedrag zonder btw. Van € 121 inclusief btw is € 100 het bedrag zonder btw en € 21 de btw. Haal je 21% van € 121 af, dan kom je op € 95,59 uit, en dat klopt niet.",
    },
  ],
  glosario: [
    { termino: "Btw", definicion: "Belasting over de toegevoegde waarde, de omzetbelasting die ondernemers over hun verkopen rekenen en aan de Belastingdienst afdragen." },
    { termino: "Exclusief btw", definicion: "Het bedrag zonder btw. Hierover bereken je de btw." },
    { termino: "Inclusief btw", definicion: "Het bedrag met btw, de prijs die een consument betaalt." },
  ],
});
