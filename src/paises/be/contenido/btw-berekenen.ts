import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.btw-berekenen",
  h1: "Btw berekenen: 21 %, 12 % en 6 %",
  title: "Btw berekenen in België: {{be.btw-standaard}}, {{be.btw-tussen}} en {{be.btw-verlaagd}}",
  description:
    "Reken btw erbij of eruit met het Belgische standaardtarief van {{be.btw-standaard}}, het tussentarief van {{be.btw-tussen}} of het verlaagde tarief van {{be.btw-verlaagd}}.",
  intro: [
    "België heeft drie btw-tarieven: het standaardtarief van {{be.btw-standaard}}, het tussentarief van {{be.btw-tussen}} en het verlaagde tarief van {{be.btw-verlaagd}}. Voor sommige goederen en diensten geldt uitzonderlijk het nultarief.",
    "Vul een bedrag in, kies of het exclusief of inclusief btw is en kies het tarief. Je ziet meteen hoeveel btw erin zit.",
  ],
  comoSeCalcula: [
    "Btw erbij: bedrag exclusief btw × tarief. Bij {{be.btw-standaard}} is dat bedrag × 0,21.",
    "Btw eruit halen: bedrag inclusief btw ÷ (1 + tarief) geeft het bedrag exclusief btw. Het verschil is de btw. Bij {{be.btw-standaard}} deel je door 1,21, bij {{be.btw-verlaagd}} door 1,06.",
    "We ronden af op de cent.",
  ],
  ejemplo: [
    "Een factuur van € 250 inclusief {{be.btw-standaard}} btw: 250 ÷ 1,21 = € 206,61 exclusief btw, dus er zit € 43,39 btw in.",
  ],
  faq: [
    {
      pregunta: "Welk btw-tarief geldt voor mijn product of dienst?",
      respuesta:
        "Het standaardtarief van {{be.btw-standaard}} is de regel. Het tussentarief en het verlaagde tarief gelden alleen voor de goederen en diensten die in het koninklijk besluit nr. 20 staan. Twijfel je, kijk dan in die lijst of vraag het na bij de FOD Financiën.",
    },
    {
      pregunta: "Waarom deel je door 1,21 en trek je niet gewoon 21 % af?",
      respuesta:
        "Omdat de btw berekend wordt op het bedrag zonder btw. Van € 121 inclusief btw is € 100 het bedrag zonder btw en € 21 de btw. Trek je 21 % af van € 121, dan kom je op € 95,59 uit, en dat klopt niet.",
    },
    {
      pregunta: "Waar staan de btw-tarieven op mijn aangifte?",
      respuesta:
        "In de btw-aangifte heeft elk tarief een eigen rooster voor je uitgaande handelingen: rooster 03 voor {{be.btw-standaard}}, rooster 02 voor {{be.btw-tussen}}, rooster 01 voor {{be.btw-verlaagd}} en rooster 00 voor het nultarief.",
    },
  ],
  glosario: [
    { termino: "Btw", definicion: "Belasting over de toegevoegde waarde, de belasting die ondernemingen op hun verkopen aanrekenen en aan de FOD Financiën doorstorten." },
    { termino: "Exclusief btw", definicion: "Het bedrag zonder btw. Daarop bereken je de btw." },
    { termino: "Inclusief btw", definicion: "Het bedrag met btw, de prijs die een consument betaalt." },
  ],
});
