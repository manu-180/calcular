import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.kuendigungsfrist-rechner",
  h1: "Kündigungsfrist in Liechtenstein berechnen",
  title: "Kündigungsfrist Liechtenstein: Rechner nach Dienstjahr",
  description: "Kündigungsfrist in Liechtenstein: 7 Tage in der Probezeit, danach 1, 2 oder 3 Monate auf ein Monatsende je nach Dienstjahr. Mit dem letzten Arbeitstag.",
  intro: [
    "Nach der Probezeit beträgt die Kündigungsfrist im ersten Dienstjahr einen Monat, vom zweiten bis zum neunten Dienstjahr zwei Monate und danach drei Monate, jeweils auf das Ende eines Monats.",
    "In der Probezeit kann mit sieben Tagen auf das Ende einer Arbeitswoche gekündigt werden.",
  ],
  comoSeCalcula: [
    "Probezeit: der erste Monat, sofern nichts anderes vereinbart ist, höchstens drei Monate.",
    "Frist ab dem Tag, an dem die Kündigung eintrifft, Ende am folgenden Monatsende.",
    "Für Arbeitgeber und Arbeitnehmer gelten dieselben Fristen. Bei unterschiedlicher Abrede gilt für beide die längere.",
  ],
  ejemplo: [
    "Trifft eine Kündigung im fünften Dienstjahr am 15. Oktober 2026 ein, endet das Arbeitsverhältnis am 31. Dezember 2026.",
  ],
  faq: [
    { pregunta: "Können die Fristen verkürzt werden?", respuesta: "Durch schriftliche Abrede, Normal- oder Gesamtarbeitsvertrag. Unter einen Monat aber nur per Gesamtarbeitsvertrag im ersten Dienstjahr." },
    { pregunta: "Was gilt bei Krankheit?", respuesta: "Nach der Probezeit darf der Arbeitgeber während einer Sperrfrist nicht kündigen. Eine laufende Frist wird unterbrochen. Dafür gibt es den Sperrfrist-Rechner." },
    { pregunta: "Wann ist eine Kündigung missbräuchlich?", respuesta: "Etwa wenn sie wegen einer persönlichen Eigenschaft oder wegen der Ausübung eines Rechts ausgesprochen wird. Dann kann eine Entschädigung von bis zu sechs Monatslöhnen geschuldet sein." },
  ],
  glosario: [
    { termino: "Probezeit", definicion: "Erster Monat des Arbeitsverhältnisses, mit kürzerer Kündigungsfrist." },
  ],
});
