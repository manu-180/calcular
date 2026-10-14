import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.familienbonus-rechner",
  h1: "Familienbonus-Plus-Rechner",
  title: "Familienbonus Plus 2026: Steuerersparnis berechnen",
  description: "Berechnen Sie, wie viel Lohnsteuer Ihnen der Familienbonus Plus 2026 spart: bis zu {{at.familienbonus[unter-18]}} im Monat je Kind, auch geteilt zwischen den Eltern.",
  intro: [
    "Der Familienbonus Plus ist ein Absetzbetrag: Er zieht für jedes Kind, für das Familienbeihilfe bezogen wird, direkt Geld von Ihrer Lohnsteuer ab.",
    "Wie viel davon tatsächlich bei Ihnen ankommt, hängt von Ihrer Steuer ab. Der Rechner zeigt, welcher Teil wirkt und wie viel mehr netto Sie im Monat haben.",
  ],
  comoSeCalcula: [
    "Je Kind bis zum 18. Geburtstag stehen {{at.familienbonus[unter-18]}} im Monat zu, für ältere Kinder mit Familienbeihilfe {{at.familienbonus[ab-18]}}. Teilen sich beide Eltern den Bonus, bekommt jeder die Hälfte.",
    "Der Rechner ermittelt Ihre monatliche Lohnsteuer aus dem Bruttogehalt wie im Brutto-Netto-Rechner. Der Bonus senkt diese Steuer bis auf null, mehr nicht.",
    "Die Ersparnis im Jahr ist das Zwölffache der monatlichen Wirkung.",
  ],
  ejemplo: [
    "Bei 3.500 Euro brutto und einem Kind sinkt die Lohnsteuer von 406,72 auf 240,04 Euro im Monat. Das sind 2.000,16 Euro im Jahr.",
  ],
  faq: [
    {
      pregunta: "Wie beantrage ich den Familienbonus Plus?",
      respuesta: "Monatlich über den Arbeitgeber mit dem Formular E 30, oder nachträglich in der Arbeitnehmerveranlagung für das ganze Jahr.",
    },
    {
      pregunta: "Was passiert, wenn meine Steuer niedriger ist als der Bonus?",
      respuesta: "Dann wirkt der Bonus nur bis zur Höhe Ihrer Steuer. Alleinverdiener und Alleinerzieher mit geringem Einkommen können in der Veranlagung einen Kindermehrbetrag bekommen.",
    },
    {
      pregunta: "Gibt es den Familienbonus auch für Kinder über 18?",
      respuesta: "Ja, solange für das Kind Familienbeihilfe bezogen wird, allerdings reduziert auf {{at.familienbonus[ab-18]}} im Monat.",
    },
  ],
  glosario: [
    { termino: "Familienbonus Plus", definicion: "Absetzbetrag für Kinder, der die Lohnsteuer oder Einkommensteuer direkt senkt." },
    { termino: "Kindermehrbetrag", definicion: "Eine Zahlung in der Veranlagung für Alleinverdiener und Alleinerzieher mit wenig oder keiner Steuer." },
  ],
});
