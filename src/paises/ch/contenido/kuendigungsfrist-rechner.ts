import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.kuendigungsfrist-rechner",
  h1: "Kündigungsfrist-Rechner Schweiz",
  title: "Kündigungsfrist Rechner Schweiz: letzter Arbeitstag nach OR",
  description:
    "Kündigungsfrist nach Obligationenrecht: 7 Tage in der Probezeit, danach 1, 2 oder 3 Monate je nach Dienstjahr, jeweils auf ein Monatsende. Letzten Arbeitstag berechnen.",
  intro: [
    "Ohne andere Abrede gelten in der Schweiz die Kündigungsfristen des Obligationenrechts. Sie hängen vom Dienstjahr ab und laufen auf das Ende eines Monats.",
    "Der Rechner zählt ab dem Tag, an dem die Kündigung beim Empfänger eintrifft. Das Datum des Versands spielt dafür keine Rolle.",
  ],
  comoSeCalcula: [
    "Probezeit: Kündigung jederzeit mit 7 Tagen Frist. Ohne Abrede ist der erste Monat Probezeit, verlängert werden kann sie auf höchstens drei Monate.",
    "Nach der Probezeit: im 1. Dienstjahr 1 Monat, vom 2. bis zum 9. Dienstjahr 2 Monate, danach 3 Monate.",
    "Die Frist beginnt am Tag nach dem Eintreffen. Das Arbeitsverhältnis endet am letzten Tag des Monats, in dem die Frist abläuft.",
  ],
  ejemplo: ["Wer seit März 2020 angestellt ist und die Kündigung am 14. Oktober 2026 erhält, ist im 7. Dienstjahr. Mit 2 Monaten Frist endet das Arbeitsverhältnis am 31. Dezember 2026."],
  faq: [
    {
      pregunta: "Bis wann muss die Kündigung eintreffen?",
      respuesta: "Nach der Rechnung dieses Rechners muss die Frist vollständig bis zum gewünschten Monatsende ablaufen. Bei 1 Monat Frist heisst das: Die Kündigung trifft spätestens am letzten Tag des Vormonats ein.",
    },
    {
      pregunta: "Dürfen andere Fristen vereinbart werden?",
      respuesta: "Ja, schriftlich, im Normal- oder im Gesamtarbeitsvertrag. Unter einen Monat sinken darf die Frist nur durch Gesamtarbeitsvertrag und nur im ersten Dienstjahr.",
    },
    {
      pregunta: "Was ist eine Sperrfrist?",
      respuesta: "Nach der Probezeit darf der Arbeitgeber zum Beispiel während Krankheit oder Unfall ohne eigenes Verschulden, während der Schwangerschaft und 16 Wochen nach der Geburt nicht kündigen. Bei Krankheit oder Unfall gilt das im ersten Dienstjahr 30 Tage, vom zweiten bis fünften 90 Tage, danach 180 Tage.",
    },
  ],
});
