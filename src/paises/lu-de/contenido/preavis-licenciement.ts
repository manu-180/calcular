import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.preavis-licenciement",
  h1: "Kündigungsfrist in Luxemburg berechnen",
  title: "Kündigungsfrist Luxemburg: Rechner für das Vertragsende",
  description: "Kündigungsfrist in Luxemburg nach Betriebszugehörigkeit: 2, 4 oder 6 Monate bei Kündigung durch den Arbeitgeber, die Hälfte, wenn der Arbeitnehmer kündigt.",
  intro: [
    "Bei Kündigung durch den Arbeitgeber hängt die Frist von der Betriebszugehörigkeit ab: 2 Monate unter 5 Jahren, 4 Monate von 5 bis unter 10 Jahren, 6 Monate ab 10 Jahren.",
    "Kündigt der Arbeitnehmer, ist die Frist halb so lang: 1, 2 oder 3 Monate.",
  ],
  comoSeCalcula: [
    "Wird die Kündigung vor dem 15. des Monats zugestellt, beginnt die Frist am 15. Sonst beginnt sie am 1. des Folgemonats.",
    "Das Vertragsende fällt auf den Vortag desselben Tages, einen, zwei, vier oder sechs Monate später.",
    "Der Rechner zählt die Betriebszugehörigkeit in vollen Jahren bis zur Zustellung.",
  ],
  ejemplo: [
    "Eine Kündigung, die am 10. Oktober 2026 nach 6 Jahren Betriebszugehörigkeit zugestellt wird, löst eine Frist von 4 Monaten vom 15. Oktober 2026 bis zum 14. Februar 2027 aus.",
  ],
  faq: [
    { pregunta: "Wie muss die Kündigung zugestellt werden?", respuesta: "Per Einschreiben bei der Post. Die Unterschrift des Arbeitnehmers auf dem Doppel des Schreibens gilt als Empfangsbestätigung." },
    { pregunta: "Und wenn der Arbeitnehmer kündigt?", respuesta: "Er kündigt ebenfalls per Einschreiben. Seine Frist ist halb so lang wie die des Arbeitgebers." },
    { pregunta: "Kann ein kleines Unternehmen die Frist verlängern?", respuesta: "Ein Arbeitgeber mit weniger als zwanzig Arbeitnehmern kann ab fünf Jahren Betriebszugehörigkeit statt der Abfindung eine verlängerte Kündigungsfrist wählen." },
  ],
  glosario: [
    { termino: "Kündigungsfrist", definicion: "Zeit zwischen der Zustellung der Kündigung und dem Ende des Arbeitsvertrags." },
  ],
});
