import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.immoest-rechner",
  h1: "Immobilienertragsteuer berechnen",
  title: "ImmoESt-Rechner: Steuer beim Immobilienverkauf",
  description: "Berechnen Sie die Immobilienertragsteuer von {{at.immoest}} auf den Gewinn beim Verkauf einer Wohnung, eines Hauses oder Grundstücks in Österreich.",
  intro: [
    "Wer eine Immobilie mit Gewinn verkauft, zahlt in Österreich Immobilienertragsteuer (ImmoESt). Der Steuersatz beträgt seit 2016 {{at.immoest}} vom Veräußerungsgewinn.",
    "Der Rechner ermittelt den Gewinn aus Verkaufspreis und Anschaffungskosten und zeigt die Steuer.",
  ],
  comoSeCalcula: [
    "Gewinn: Verkaufspreis minus Anschaffungskosten minus Herstellungs- und Instandsetzungskosten.",
    "Steuer: {{at.immoest}} vom Gewinn. Ein Verlust führt zu keiner Steuer.",
    "Für Alt-Grundstücke, die vor dem 1. April 2002 angeschafft wurden, gilt eine pauschale Ermittlung. Diese bildet der Rechner nicht ab.",
  ],
  ejemplo: [
    "Eine Wohnung wurde um 250.000 Euro gekauft und um 400.000 Euro verkauft. Der Gewinn beträgt 150.000 Euro, die ImmoESt 45.000 Euro.",
  ],
  faq: [
    {
      pregunta: "Wer führt die Immobilienertragsteuer ab?",
      respuesta: "In der Regel berechnet und entrichtet der Notar oder Rechtsanwalt, der den Kaufvertrag abwickelt, die Steuer für Sie.",
    },
    {
      pregunta: "Was gilt für umgewidmete Grundstücke?",
      respuesta: "Bei Umwidmungen nach dem 31. Dezember 2024, vor allem von Grünland zu Bauland, erhöht sich der Gewinn aus dem Verkauf des umgewidmeten Grund und Bodens um einen Umwidmungszuschlag von 30 %.",
    },
    {
      pregunta: "Gilt der Steuersatz auch für Unternehmen?",
      respuesta: "Für Einzelunternehmen und Personengesellschaften gilt beim Verkauf von Grundstücken im Betriebsvermögen grundsätzlich ebenfalls der feste Satz von {{at.immoest}}.",
    },
  ],
  glosario: [
    { termino: "Veräußerungsgewinn", definicion: "Der Unterschied zwischen Verkaufspreis und Anschaffungskosten samt Aufwendungen." },
    { termino: "Alt-Grundstück", definicion: "Ein Grundstück, das vor dem 1. April 2002 angeschafft wurde." },
  ],
});
