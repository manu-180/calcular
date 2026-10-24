import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.sperrfrist-rechner",
  h1: "Sperrfrist bei Krankheit in Liechtenstein",
  title: "Sperrfrist Liechtenstein: Kündigungsschutz bei Krankheit",
  description: "Kündigungsschutz bei Krankheit oder Unfall in Liechtenstein: Sperrfrist von 30, 90 oder 180 Tagen je nach Dienstjahr. Mit dem letzten geschützten Tag.",
  intro: [
    "Nach der Probezeit darf der Arbeitgeber nicht kündigen, solange Sie ohne eigenes Verschulden wegen Krankheit oder Unfall an der Arbeit verhindert sind.",
    "Der Schutz dauert im ersten Dienstjahr 30 Tage, ab dem zweiten Dienstjahr 90 Tage und ab dem sechsten Dienstjahr 180 Tage.",
  ],
  comoSeCalcula: [
    "Dienstjahr am ersten Tag der Arbeitsunfähigkeit bestimmen.",
    "Sperrfrist ab diesem Tag zählen.",
    "Eine Kündigung während der Sperrfrist ist nichtig. Eine vorher ausgesprochene Kündigung läuft nach der Sperrfrist weiter.",
  ],
  ejemplo: [
    "Wer im fünften Dienstjahr ab dem 1. Oktober 2026 krank ist, ist bis zum 29. Dezember 2026 vor einer Kündigung geschützt.",
  ],
  faq: [
    { pregunta: "Gilt die Sperrfrist auch, wenn ich kündige?", respuesta: "Nein. Sie schützt nur vor einer Kündigung durch den Arbeitgeber." },
    { pregunta: "Gibt es weitere Sperrfristen?", respuesta: "Ja, während der Schwangerschaft und der Mutterschaftszeit sowie in bestimmten Fällen der Vaterschaftszeit." },
    { pregunta: "Was passiert mit einer laufenden Kündigungsfrist?", respuesta: "Sie wird unterbrochen und läuft nach der Sperrfrist weiter. Fällt das Ende nicht auf ein Monatsende, verlängert sie sich bis dahin." },
  ],
  glosario: [
    { termino: "Sperrfrist", definicion: "Zeit, in der eine Kündigung durch den Arbeitgeber nichtig ist." },
  ],
});
