import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.momsberegner",
  h1: "Momsberegner: læg moms til eller træk den fra",
  title: "Momsberegner: beregn {{dk.moms}} moms",
  description:
    "Læg {{dk.moms}} moms til en pris, eller træk momsen ud af en pris med moms. Se momsbeløbet og prisen med og uden moms med det samme.",
  intro: [
    "Momsen i Danmark er {{dk.moms}} på næsten alle varer og ydelser. Beregneren lægger momsen til eller trækker den ud af en pris.",
    "Den er nyttig, når du skal skrive en faktura, tjekke en kvittering eller sammenligne priser med og uden moms.",
  ],
  comoSeCalcula: [
    "Pris med moms = pris uden moms × 1,25.",
    "Pris uden moms = pris med moms / 1,25.",
    "Momsen udgør 20 % af en pris med moms. Det er den såkaldte momsbrøk.",
  ],
  ejemplo: ["En vare til 1.000 kr. uden moms koster 1.250 kr. med moms. Momsen er 250 kr."],
  faq: [
    {
      pregunta: "Hvor meget er momsen i Danmark?",
      respuesta: "Momsen er {{dk.moms}} af prisen uden moms. Satsen står i momslovens § 33 og gælder både for varer og ydelser.",
    },
    {
      pregunta: "Hvorfor er momsen 20 % og ikke 25 %?",
      respuesta: "Når du trækker momsen ud af en pris med moms, udgør den 20 % af beløbet. 25 % af 1.000 kr. er 250 kr., og 250 kr. er 20 % af 1.250 kr.",
    },
    {
      pregunta: "Hvornår skal min virksomhed momsregistreres?",
      respuesta: "Hovedreglen er, at virksomheden skal momsregistreres, når den årlige omsætning er over 50.000 kr.",
    },
  ],
  glosario: [
    { termino: "Moms", definicion: "Merværdiafgift. En afgift på {{dk.moms}}, som lægges på prisen." },
    { termino: "Momsbrøk", definicion: "Momsens andel af en pris med moms: 20 %." },
  ],
});
