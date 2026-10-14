import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.solidaritaetszuschlag-rechner",
  h1: "Soli-Rechner 2026",
  title: "Solidaritätszuschlag 2026 berechnen: Freigrenze und Satz",
  description:
    "Zahlen Sie noch Soli? Der Rechner prüft die Freigrenze von {{de.soli-freigrenze}}, die Milderungszone und den vollen Satz von {{de.soli-satz}} auf Ihre Steuer.",
  intro: [
    "Der Solidaritätszuschlag ist ein Zuschlag auf die Einkommen- und Lohnsteuer. Seit der Freigrenze zahlen ihn nur noch Steuerpflichtige mit hoher Steuer.",
    "Geben Sie Ihre Einkommensteuer oder Jahreslohnsteuer ein. Der Rechner zeigt, ob und wie viel Soli anfällt.",
  ],
  comoSeCalcula: [
    "Bis zu einer Steuer von {{de.soli-freigrenze}} (Splitting: das Doppelte) fällt kein Soli an.",
    "Darüber beträgt er höchstens {{de.soli-milderung}} des Betrags, um den die Steuer die Freigrenze übersteigt (Milderungszone).",
    "Ab einer bestimmten Höhe gilt der volle Satz von {{de.soli-satz}} der Steuer.",
    "Auf Kapitalerträge mit Abgeltungsteuer gilt immer der volle Satz, ohne Freigrenze.",
  ],
  ejemplo: ["Bei 26.664 Euro Einkommensteuer beträgt der Soli 751,36 Euro statt 1.466,52 Euro mit vollem Satz."],
  faq: [
    {
      pregunta: "Ab welchem Einkommen zahlt man Soli?",
      respuesta: "Ab einer Einkommensteuer über {{de.soli-freigrenze}}. Das entspricht für Alleinstehende einem zu versteuernden Einkommen von rund 75.000 Euro.",
    },
    {
      pregunta: "Wirken Kinder auf den Soli?",
      respuesta: "Ja. Für den Soli wird die Steuer mit den Kinderfreibeträgen berechnet, auch wenn Sie Kindergeld bekommen. Tragen Sie dann diese niedrigere Steuer ein.",
    },
    {
      pregunta: "Zahlen Unternehmen weiter Soli?",
      respuesta: "Ja, auf die Körperschaftsteuer fällt der Soli ohne Freigrenze an.",
    },
  ],
  glosario: [
    { termino: "Freigrenze", definicion: "Bis zu dieser Steuer fällt kein Soli an. Wird sie überschritten, gilt die Milderungszone." },
    { termino: "Milderungszone", definicion: "Übergang zwischen Freigrenze und vollem Satz, damit der Soli nicht sprunghaft steigt." },
  ],
});
