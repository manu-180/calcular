import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.valutaomregner",
  h1: "Valutaomregner med Nationalbankens kurser",
  title: "Valutaomregner: euro, dollar, pund og svenske kroner",
  description:
    "Omregn mellem danske kroner og euro, dollar, pund, svenske og norske kroner med Nationalbankens seneste kurs. En euro koster {{dk.eur}} pr. 100.",
  intro: [
    "Beregneren bruger Danmarks Nationalbanks officielle valutakurser, som opdateres hver bankdag.",
    "Vælg valuta og retning, og skriv beløbet. Du ser også kursen og datoen for kursen.",
  ],
  comoSeCalcula: [
    "Nationalbanken angiver kursen som kroner pr. 100 enheder af valutaen.",
    "Fra valuta til kroner: beløb × kurs / 100.",
    "Fra kroner til valuta: beløb / kurs × 100.",
  ],
  ejemplo: ["Med en eurokurs på 747,48 er 100 euro 747,48 kr."],
  faq: [
    {
      pregunta: "Hvad er kursen på euro i dag?",
      respuesta: "Nationalbankens seneste kurs er {{dk.eur}} for 100 euro ({{dk.eur#desde}}).",
    },
    {
      pregunta: "Hvorfor får jeg en anden kurs i banken?",
      respuesta: "Nationalbankens kurs er en midtkurs. Banker og vekselkontorer lægger et tillæg eller gebyr på, når de køber og sælger valuta.",
    },
    {
      pregunta: "Hvad koster en dollar?",
      respuesta: "Nationalbankens seneste kurs er {{dk.usd}} for 100 amerikanske dollar ({{dk.usd#desde}}).",
    },
  ],
  glosario: [
    { termino: "Valutakurs", definicion: "Prisen på en udenlandsk valuta i danske kroner." },
    { termino: "Midtkurs", definicion: "Kursen midt mellem købs- og salgskurs, uden bankens tillæg." },
  ],
});
