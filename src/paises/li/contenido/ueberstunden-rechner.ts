import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.ueberstunden-rechner",
  h1: "Überstunden in Liechtenstein berechnen",
  title: "Überstunden Liechtenstein: Zuschlag von 25 % berechnen",
  description: "Überstunden in Liechtenstein: Lohn plus Zuschlag von mindestens {{li.ueberstunden-zuschlag}}, wenn sie nicht durch Freizeit ausgeglichen werden. Mit Stundenlohn aus dem Monatslohn.",
  intro: [
    "Werden Überstunden nicht durch Freizeit ausgeglichen, schuldet der Arbeitgeber den Normallohn plus einen Zuschlag von mindestens einem Viertel.",
    "Ein anderer Zuschlag gilt nur, wenn er schriftlich vereinbart oder im Normal- oder Gesamtarbeitsvertrag geregelt ist.",
  ],
  comoSeCalcula: [
    "Stundenlohn aus Monatslohn = Monatslohn x 12 / 52 / Wochenstunden.",
    "Vergütung = Stundenlohn x Überstunden x (100 % + {{li.ueberstunden-zuschlag}}).",
  ],
  ejemplo: [
    "Bei 6500 Franken Monatslohn und 42 Stunden pro Woche sind 10 Überstunden 446.43 Franken wert.",
  ],
  faq: [
    { pregunta: "Muss ich Überstunden leisten?", respuesta: "Nur soweit Sie sie leisten können und sie Ihnen nach Treu und Glauben zugemutet werden können." },
    { pregunta: "Können Überstunden mit Freizeit ausgeglichen werden?", respuesta: "Ja, mit Ihrem Einverständnis, durch Freizeit von mindestens gleicher Dauer. Dann gibt es keinen Zuschlag." },
    { pregunta: "Kann der Zuschlag wegfallen?", respuesta: "Ja, wenn das schriftlich vereinbart oder in einem Normal- oder Gesamtarbeitsvertrag so geregelt ist." },
  ],
  glosario: [
    { termino: "Überstunden", definicion: "Arbeit über die vereinbarte, übliche oder im Vertrag bestimmte Arbeitszeit hinaus." },
  ],
});
