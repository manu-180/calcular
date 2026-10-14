import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.kest-rechner",
  h1: "KESt-Rechner: Kapitalertragsteuer berechnen",
  title: "KESt-Rechner: Kapitalertragsteuer 25 % und 27,5 %",
  description: "Berechnen Sie die Kapitalertragsteuer auf Zinsen, Dividenden und Kursgewinne: {{at.kest[sparbuch]}} für Sparbuch und Girokonto, {{at.kest[sonstige]}} für alles andere.",
  intro: [
    "Erträge aus Kapitalvermögen werden in Österreich mit einem besonderen Steuersatz besteuert, getrennt vom übrigen Einkommen. Ist eine österreichische Bank eingebunden, zieht sie die Steuer in den meisten Fällen direkt ab.",
    "Der Rechner zeigt, wie viel Kapitalertragsteuer (KESt) anfällt und was Ihnen bleibt.",
  ],
  comoSeCalcula: [
    "Zinsen aus Sparbüchern und Girokonten: {{at.kest[sparbuch]}}.",
    "Alle anderen Kapitalerträge, etwa Dividenden, Wertpapierzinsen, Fondserträge und Kursgewinne: {{at.kest[sonstige]}}.",
    "KESt ist Ertrag mal Steuersatz, der Rest ist Ihr Ertrag nach Steuer.",
  ],
  ejemplo: [
    "Auf 1.000 Euro Dividende fallen 275 Euro KESt an, es bleiben 725 Euro. Auf 250 Euro Sparbuchzinsen sind es 62,50 Euro.",
  ],
  faq: [
    {
      pregunta: "Muss ich Kapitalerträge in der Steuererklärung angeben?",
      respuesta: "Hat eine österreichische Bank die KESt abgezogen, hat sie die Steuer bereits an das Finanzamt abgeführt. Erträge ohne inländischen Abzug, etwa Zinsen einer ausländischen Bank, müssen Sie in der Steuererklärung angeben. Sie werden auch dann mit dem besonderen Steuersatz besteuert.",
    },
    {
      pregunta: "Welcher Steuersatz gilt für Sparbuchzinsen?",
      respuesta: "Für Zinsen aus Sparbüchern und Girokonten gilt der besondere Steuersatz von {{at.kest[sparbuch]}}, für alle anderen Kapitalerträge {{at.kest[sonstige]}}.",
    },
    {
      pregunta: "Gilt die KESt auch für Kryptowährungen?",
      respuesta: "Ja. Ist ein inländischer Kryptodienstleister eingebunden, zieht er die KESt seit 2024 verpflichtend ab, so wie eine Bank.",
    },
  ],
  glosario: [
    { termino: "KESt", definicion: "Kapitalertragsteuer, die Steuer auf Zinsen, Dividenden und Kursgewinne." },
    { termino: "Abzugsteuer", definicion: "Eine Steuer, die die auszahlende Stelle einbehält und an das Finanzamt abführt." },
  ],
});
