import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.kapitalbezug-steuer-rechner",
  h1: "Kapitalbezug: Bundessteuer auf Pensionskasse und Säule 3a",
  title: "Kapitalbezug Steuer Rechner: Bundessteuer auf PK und 3a",
  description:
    "Direkte Bundessteuer auf den Bezug von Pensionskassen- oder Säule-3a-Kapital: ein Fünftel des Tarifs nach Art. 38 DBG, mit den Tarifen {{anio}}.",
  intro: [
    "Wer Kapital aus der Pensionskasse oder der Säule 3a bezieht, zahlt darauf eine eigene Steuer. Sie wird getrennt vom übrigen Einkommen erhoben, für das Jahr der Auszahlung.",
    "Der Rechner zeigt den Anteil des Bundes. Kanton und Gemeinde besteuern den Bezug zusätzlich.",
  ],
  comoSeCalcula: [
    "Die Bundessteuer auf Kapitalleistungen aus Vorsorge beträgt einen Fünftel der normalen Steuer nach dem Tarif für das Einkommen (Art. 38 DBG).",
    "Es gilt der Tarif für Alleinstehende oder für Verheiratete. Wer mit Kindern im gleichen Haushalt lebt, rechnet mit dem Tarif für Verheiratete, aber ohne die Ermässigung je Kind.",
    "Sozialabzüge gibt es keine. Gerechnet wird mit vollen 100 Franken.",
  ],
  ejemplo: [
    "Für 200 000 Franken Kapital zahlt eine alleinstehende Person rund 2581 Franken direkte Bundessteuer, etwa 1.3 % des Betrags.",
  ],
  faq: [
    {
      pregunta: "Wird der Kapitalbezug mit dem Lohn zusammengerechnet?",
      respuesta: "Nein. Kapitalleistungen aus Vorsorge werden gesondert besteuert. Sie zählen nicht zum übrigen Einkommen des Jahres.",
    },
    {
      pregunta: "Gilt das auch für die Säule 3a?",
      respuesta: "Ja. Kapital aus der gebundenen Selbstvorsorge wird gleich besteuert wie Kapital aus der Pensionskasse.",
    },
    {
      pregunta: "Warum ist der Kanton hier nicht enthalten?",
      respuesta: "Jeder Kanton hat eigene Tarife und Regeln für Kapitalleistungen. Für die kantonale Steuer hilft der Steuerrechner Ihres Kantons.",
    },
  ],
  glosario: [
    { termino: "Kapitalleistung aus Vorsorge", definicion: "Auszahlung des Guthabens aus Pensionskasse oder Säule 3a als einmaliger Betrag statt als Rente." },
  ],
});
