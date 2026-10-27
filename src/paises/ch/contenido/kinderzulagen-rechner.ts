import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.kinderzulagen-rechner",
  h1: "Kinderzulagen-Rechner: Kinder- und Ausbildungszulagen",
  title: "Kinderzulagen Rechner Schweiz {{anio}}: Familienzulagen",
  description:
    "Familienzulagen in der Schweiz: Kinderzulage mindestens {{ch.kinderzulage}}, Ausbildungszulage mindestens {{ch.ausbildungszulage}} pro Monat. Mit höheren Ansätzen Ihres Kantons.",
  intro: [
    "Für Kinder gibt es in der Schweiz Familienzulagen. Das Bundesgesetz legt Mindestbeträge fest: {{ch.kinderzulage}} Kinderzulage und {{ch.ausbildungszulage}} Ausbildungszulage pro Monat.",
    "Die Kantone dürfen höhere Ansätze vorsehen. Geben Sie die Ansätze Ihres Kantons ein, wenn Sie sie kennen. Sonst rechnet der Rechner mit dem Minimum.",
  ],
  comoSeCalcula: [
    "Kinderzulage: vom Geburtsmonat bis zum Ende des Monats, in dem das Kind 16 Jahre alt wird.",
    "Ausbildungszulage: ab Beginn einer nachobligatorischen Ausbildung, frühestens ab dem Monat, in dem das Kind 15 wird, bis zum Abschluss, längstens bis zum Ende des Monats, in dem es 25 wird.",
    "Zulagen pro Monat: Anzahl Kinder mal Kinderzulage plus Anzahl Kinder in Ausbildung mal Ausbildungszulage.",
  ],
  ejemplo: ["Zwei Kinder unter 16 Jahren und eines in der Lehre ergeben mindestens 698 Franken pro Monat, 8376 Franken im Jahr."],
  faq: [
    {
      pregunta: "Wie hoch ist die Kinderzulage 2026?",
      respuesta: "Mindestens {{ch.kinderzulage}} pro Kind und Monat, die Ausbildungszulage mindestens {{ch.ausbildungszulage}}. Kantone dürfen höhere Mindestansätze und zusätzlich Geburts- und Adoptionszulagen vorsehen.",
    },
    {
      pregunta: "Bis wann gibt es die Ausbildungszulage?",
      respuesta: "Bis zum Abschluss der Ausbildung, längstens bis zum Ende des Monats, in dem das Kind 25 Jahre alt wird.",
    },
    {
      pregunta: "Gibt es die Zulage auch für ein erwerbsunfähiges Kind?",
      respuesta: "Ja. Für ein erwerbsunfähiges Kind wird die Kinderzulage bis zum Ende des Monats ausgerichtet, in dem es 20 Jahre alt wird.",
    },
  ],
  glosario: [
    { termino: "Kinderzulage", definicion: "Familienzulage für Kinder bis zum Ende des Monats, in dem sie 16 Jahre alt werden." },
    { termino: "Ausbildungszulage", definicion: "Familienzulage für Kinder in nachobligatorischer Ausbildung, längstens bis 25 Jahre." },
  ],
});
