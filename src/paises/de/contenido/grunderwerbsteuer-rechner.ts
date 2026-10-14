import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.grunderwerbsteuer-rechner",
  h1: "Grunderwerbsteuer-Rechner",
  title: "Grunderwerbsteuer berechnen: Satz je Bundesland",
  description: "Grunderwerbsteuer beim Kauf einer Immobilie: Kaufpreis mal Steuersatz Ihres Bundeslandes, mit Gesamtkosten aus Kaufpreis und Steuer.",
  intro: [
    "Wer in Deutschland ein Grundstück oder eine Immobilie kauft, zahlt Grunderwerbsteuer. Den Satz legt jedes Bundesland selbst fest.",
  ],
  comoSeCalcula: ["Grunderwerbsteuer = Kaufpreis × Steuersatz des Bundeslandes, in dem die Immobilie liegt."],
  faq: [],
  glosario: [{ termino: "Grunderwerbsteuer", definicion: "Steuer auf den Erwerb von Grundstücken und Immobilien." }],
});
