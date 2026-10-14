import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.ueberstunden-rechner",
  h1: "Überstunden-Rechner Schweiz",
  title: "Überstunden Rechner Schweiz: Lohn mit {{ch.ueberstunden-zuschlag}} Zuschlag",
  description:
    "Überstunden nach Obligationenrecht auszahlen: Normallohn plus mindestens {{ch.ueberstunden-zuschlag}} Zuschlag. Aus Monats- oder Stundenlohn berechnen.",
  intro: [
    "Überstunden sind Stunden über der vereinbarten oder üblichen Arbeitszeit. Werden sie nicht mit Freizeit ausgeglichen, schuldet der Arbeitgeber den Normallohn plus einen Zuschlag von mindestens {{ch.ueberstunden-zuschlag}}.",
    "Der Zuschlag gilt, solange nichts anderes schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag geregelt ist.",
  ],
  comoSeCalcula: [
    "Stundenlohn aus dem Monatslohn: Monatslohn × 12 / 52 / Wochenstunden.",
    "Normallohn für die Überstunden: Stundenlohn × Anzahl Stunden.",
    "Zuschlag: {{ch.ueberstunden-zuschlag}} des Normallohns, oder der Satz aus Ihrem Vertrag.",
  ],
  ejemplo: ["Bei 6500 Franken Monatslohn und 42 Wochenstunden kosten 10 Überstunden mit Zuschlag rund 446 Franken."],
  faq: [
    {
      pregunta: "Muss ich Überstunden leisten?",
      respuesta: "Ja, wenn sie notwendig sind, soweit Sie sie leisten können und sie Ihnen nach Treu und Glauben zugemutet werden können.",
    },
    {
      pregunta: "Kann der Arbeitgeber Überstunden mit Freizeit ausgleichen?",
      respuesta: "Ja, mit Ihrem Einverständnis und innert angemessener Frist. Die Freizeit muss mindestens gleich lang sein wie die Überstunden.",
    },
    {
      pregunta: "Darf der Zuschlag wegfallen?",
      respuesta: "Ja, wenn das schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag geregelt ist. Ohne solche Abrede gilt der Zuschlag von mindestens {{ch.ueberstunden-zuschlag}}.",
    },
  ],
  glosario: [
    { termino: "Überstunden", definicion: "Arbeit über der vereinbarten oder üblichen Arbeitszeit, wenn sie notwendig ist." },
  ],
});
