import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.einkommensteuer-rechner",
  h1: "Einkommensteuerrechner 2026",
  title: "Einkommensteuerrechner 2026 mit Splittingtarif",
  description:
    "Einkommensteuer nach dem Tarif 2026 (§ 32a EStG) für Ihr zu versteuerndes Einkommen, mit Splitting, Soli, Kirchensteuer, Durchschnitts- und Grenzsteuersatz.",
  intro: [
    "Tragen Sie Ihr zu versteuerndes Einkommen ein, also das Einkommen nach allen Werbungskosten, Sonderausgaben und Freibeträgen. Der Rechner wendet den Tarif 2026 an.",
    "Bei Zusammenveranlagung von Ehepaaren gilt der Splittingtarif. Sie sehen außerdem, wie viel Prozent Ihres Einkommens Steuer sind und wie stark ein zusätzlicher Euro belastet wird.",
  ],
  comoSeCalcula: [
    "Bis zum Grundfreibetrag von {{de.est-tarif[grundfreibetrag]}} fällt keine Steuer an.",
    "Danach steigt der Steuersatz in zwei Progressionszonen von 14 % bis 42 %.",
    "Ab {{de.est-tarif[zone3-bis]}} gilt der Spitzensteuersatz von 42 %, ab {{de.est-tarif[zone4-bis]}} der Reichensteuersatz von 45 %.",
    "Beim Splitting wird das gemeinsame Einkommen halbiert, die Steuer darauf berechnet und verdoppelt.",
    "Der Solidaritätszuschlag beträgt {{de.soli-satz}} der Steuer, fällt aber erst oberhalb einer Steuer von {{de.soli-freigrenze}} an (Splitting: das Doppelte) und steigt danach gleitend.",
  ],
  ejemplo: ["Bei 50.000 Euro zu versteuerndem Einkommen beträgt die Einkommensteuer 10.548 Euro. Das sind 21,1 % im Durchschnitt; jeder weitere Euro wird mit gut 35 % besteuert."],
  faq: [
    {
      pregunta: "Was ist das zu versteuernde Einkommen?",
      respuesta: "Ihre Einkünfte abzüglich Sonderausgaben, außergewöhnlicher Belastungen und Freibeträge. Es steht im Steuerbescheid und ist kleiner als Ihr Bruttogehalt.",
    },
    {
      pregunta: "Was bedeutet der Grenzsteuersatz?",
      respuesta: "Er sagt, wie viel Steuer auf den nächsten verdienten Euro fällt. Für Gehaltserhöhungen und Steuerspartipps ist er wichtiger als der Durchschnittssteuersatz.",
    },
    {
      pregunta: "Wer zahlt noch Solidaritätszuschlag?",
      respuesta: "Nur wer eine Einkommensteuer über der Freigrenze hat. Das betrifft vor allem hohe Einkommen.",
    },
    {
      pregunta: "Wie hoch ist die Kirchensteuer?",
      respuesta: "In Bayern und Baden-Württemberg {{de.kirchensteuer@by}} der Einkommensteuer, in allen anderen Ländern {{de.kirchensteuer@be}}.",
    },
  ],
  glosario: [
    { termino: "Grundfreibetrag", definicion: "Der Teil des Einkommens, der steuerfrei bleibt, damit das Existenzminimum gesichert ist." },
    { termino: "Splittingtarif", definicion: "Tarif für zusammen veranlagte Ehepaare und eingetragene Lebenspartner." },
  ],
});
