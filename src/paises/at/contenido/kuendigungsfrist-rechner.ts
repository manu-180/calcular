import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.kuendigungsfrist-rechner",
  h1: "Kündigungsfrist-Rechner für Österreich",
  title: "Kündigungsfrist berechnen: Fristen und Termine",
  description: "Wann endet Ihr Arbeitsverhältnis? Kündigungsfrist nach Dienstjahren, Quartalsende oder Monatsletzter, für Kündigungen durch Arbeitgeber und Arbeitnehmer.",
  intro: [
    "Seit Oktober 2021 gelten für Angestellte und Arbeiter dieselben Kündigungsfristen. Kündigt der Arbeitgeber, hängt die Frist von den Dienstjahren ab, kündigen Sie selbst, gilt ein Monat.",
    "Zur Frist kommt der Kündigungstermin: Das Arbeitsverhältnis endet nur an bestimmten Tagen. Der Rechner zeigt das frühestmögliche Ende.",
  ],
  comoSeCalcula: [
    "Frist des Arbeitgebers: im ersten und zweiten Dienstjahr {{at.kuendigungsfristen[wochen-bis-2]}} Wochen, nach dem zweiten Dienstjahr {{at.kuendigungsfristen[monate-ab-2]}} Monate, nach dem fünften {{at.kuendigungsfristen[monate-ab-5]}}, nach dem 15. {{at.kuendigungsfristen[monate-ab-15]}} und nach dem 25. {{at.kuendigungsfristen[monate-ab-25]}} Monate.",
    "Termin des Arbeitgebers: das Quartalsende. Im Vertrag kann der 15. oder der Monatsletzte vereinbart werden.",
    "Kündigen Sie selbst, beträgt die Frist {{at.kuendigungsfristen[monate-arbeitnehmer]}} Monat zum Monatsletzten.",
    "Die Frist beginnt mit dem Tag, an dem die Kündigung zugeht. Das Ende ist der erste Kündigungstermin nach Ablauf der Frist.",
  ],
  ejemplo: [
    "Eine Angestellte, die seit März 2020 im Unternehmen ist, erhält am 14. Oktober 2026 die Kündigung. Nach sechs Dienstjahren gelten drei Monate, die Frist läuft bis Mitte Jänner. Das Arbeitsverhältnis endet am 31. März 2027.",
  ],
  faq: [
    {
      pregunta: "Was passiert, wenn die Frist nicht eingehalten wird?",
      respuesta: "Dann steht eine Kündigungsentschädigung zu. Sie muss innerhalb von sechs Monaten gerichtlich geltend gemacht werden.",
    },
    {
      pregunta: "Kann die Kündigungsfrist für Arbeitnehmer verlängert werden?",
      respuesta: "Ja, durch Vereinbarung bis zu einem halben Jahr. Die Frist, die der Arbeitgeber einhalten muss, darf aber nicht kürzer sein.",
    },
    {
      pregunta: "Muss der Betriebsrat informiert werden?",
      respuesta: "Ja, der Arbeitgeber muss den Betriebsrat vor jeder Kündigung verständigen. Dieser kann innerhalb einer Woche Stellung nehmen, sonst ist die Kündigung rechtsunwirksam.",
    },
  ],
  glosario: [
    { termino: "Kündigungsfrist", definicion: "Die Zeit zwischen dem Zugang der Kündigung und dem Ende des Arbeitsverhältnisses." },
    { termino: "Kündigungstermin", definicion: "Der Tag, an dem das Arbeitsverhältnis endet." },
  ],
});
