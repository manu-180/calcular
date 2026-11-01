import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.morarenter",
  h1: "Beregn morarenter efter renteloven",
  title: "Morarenter {{anio}}: beregn renter ved for sen betaling",
  description:
    "Beregn morarenter af en regning, der er betalt for sent. Renten er referencesatsen plus {{dk.morarente-tillaeg}} om året, og der kan lægges rykkergebyrer på.",
  intro: [
    "Betaler en kunde eller skyldner for sent, kan du kræve morarenter efter renteloven. Renten følger Nationalbankens referencesats og skifter hvert halvår.",
    "Skriv beløbet, forfaldsdatoen og betalingsdatoen. Beregneren deler perioden op i halvår med den rigtige rente.",
  ],
  comoSeCalcula: [
    "Morarenten er referencesatsen plus {{dk.morarente-tillaeg}} om året.",
    "Referencesatsen er Nationalbankens udlånsrente den 1. januar og den 1. juli. Lige nu er den {{dk.referencesats}}.",
    "Renterne beregnes for hver dag fra forfaldsdagen til betalingsdagen: beløb × rente × dage / 365.",
    "For hver rykker kan der kræves højst {{dk.rykkergebyr}}, og højst for 3 rykkere.",
  ],
  ejemplo: ["Et beløb på 10.000 kr., der forfaldt 1. august 2026 og bliver betalt 24. oktober, giver 84 dage med 10 % rente. Morarenterne er 230,14 kr."],
  faq: [
    {
      pregunta: "Hvad er morarenten lige nu?",
      respuesta: "Referencesatsen er {{dk.referencesats}} fra {{dk.referencesats#desde}}. Med tillægget på {{dk.morarente-tillaeg}} giver det morarenten for halvåret.",
    },
    {
      pregunta: "Fra hvilken dag løber renten?",
      respuesta: "Er forfaldsdagen aftalt på forhånd, løber renten fra forfaldsdagen. Ellers løber den 30 dage efter, at du har sendt et krav om betaling.",
    },
    {
      pregunta: "Hvor meget må et rykkergebyr være?",
      respuesta: "Højst {{dk.rykkergebyr}} pr. rykker og højst for 3 rykkere om samme betaling.",
    },
  ],
  glosario: [
    { termino: "Referencesats", definicion: "Nationalbankens udlånsrente den 1. januar og den 1. juli." },
    { termino: "Forfaldsdag", definicion: "Den sidste dag, regningen skal være betalt." },
  ],
});
