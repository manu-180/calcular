import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.indemnite-de-depart",
  h1: "Abfindung in Luxemburg berechnen",
  title: "Abfindungsrechner Luxemburg: nach Betriebszugehörigkeit",
  description: "Gesetzliche Mindestabfindung in Luxemburg: 1 bis 12 Monatslöhne je nach Betriebszugehörigkeit ab 5 Jahren, berechnet auf die letzten zwölf Monate.",
  intro: [
    "Ein Arbeitnehmer mit unbefristetem Vertrag, dem der Arbeitgeber kündigt, hat ab fünf Jahren Betriebszugehörigkeit Anspruch auf eine Abfindung.",
    "Sie reicht von einem Monatslohn nach 5 Jahren bis zu zwölf Monatslöhnen nach 30 Jahren.",
  ],
  comoSeCalcula: [
    "Betriebszugehörigkeit: maßgebend am Ende der Kündigungsfrist.",
    "Monatslöhne: 1 ab 5 Jahren, 2 ab 10, 3 ab 15, 6 ab 20, 9 ab 25 und 12 ab 30 Jahren.",
    "Grundlage: die Bruttolöhne der letzten zwölf Monate, ohne Überstunden und Gratifikationen.",
  ],
  ejemplo: [
    "Nach 12 Jahren mit einem Durchschnittslohn von 4.000 Euro beträgt die Mindestabfindung 2 Monatslöhne, also 8.000 Euro.",
  ],
  faq: [
    { pregunta: "Wann wird die Abfindung gezahlt?", respuesta: "Wenn der Arbeitnehmer die Arbeit tatsächlich verlässt." },
    { pregunta: "Welche Löhne zählen?", respuesta: "Die Bruttolöhne der letzten zwölf Monate, einschließlich Krankengeld und laufender Prämien, aber ohne Überstunden und Gratifikationen." },
    { pregunta: "Muss ein kleines Unternehmen sie zahlen?", respuesta: "Ein Arbeitgeber mit weniger als zwanzig Arbeitnehmern kann stattdessen eine verlängerte Kündigungsfrist wählen." },
  ],
  glosario: [
    { termino: "Betriebszugehörigkeit", definicion: "Dauer der ununterbrochenen Beschäftigung beim selben Arbeitgeber." },
  ],
});
