import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.netto-brutto-rechner",
  h1: "Netto-Brutto-Rechner Schweiz",
  title: "Netto-Brutto-Rechner Schweiz: Bruttolohn für Ihr Netto",
  description:
    "Welcher Bruttolohn ergibt den gewünschten Nettolohn? Mit AHV/IV/EO, ALV, Pensionskasse und NBU nach den Sätzen 2026, für 12 oder 13 Monatslöhne.",
  intro: [
    "Wer für die Lohnverhandlung einen bestimmten Betrag netto im Kopf hat, braucht den passenden Bruttolohn. Der Rechner zeigt, wie hoch er sein muss, damit Ihnen der gewünschte Betrag bleibt.",
    "Gerechnet wird mit den Sozialabzügen ohne Steuern: AHV/IV/EO, ALV, die gesetzliche Pensionskasse und die NBU-Prämie, die Sie eingeben.",
  ],
  comoSeCalcula: [
    "Der Rechner sucht den Bruttolohn, bei dem die Abzüge des Brutto-Netto-Rechners genau zu Ihrem Nettolohn führen.",
    "AHV/IV/EO und ALV kosten Sie je die Hälfte von {{ch.ahv-iv-eo-beitragssatz}} und {{ch.alv-beitragssatz}}. Die Pensionskasse rechnet er mit der Hälfte der gesetzlichen Altersgutschrift.",
    "Liegt der Jahreslohn über {{ch.bvg-eintrittsschwelle}}, kommt der BVG-Abzug dazu. Deshalb steigt der nötige Bruttolohn an dieser Schwelle sprunghaft.",
  ],
  ejemplo: ["Für 5777 Franken netto bei 13 Monatslöhnen und Alter 35 braucht es rund 6500 Franken brutto im Monat."],
  faq: [
    {
      pregunta: "Warum ist die Pensionskasse nur geschätzt?",
      respuesta: "Jede Pensionskasse hat ihr eigenes Reglement. Viele versichern mehr als das gesetzliche Minimum. Der Rechner nimmt das Minimum, Ihr Abzug kann höher sein.",
    },
    {
      pregunta: "Sind die Steuern berücksichtigt?",
      respuesta: "Nein. Die Einkommenssteuer hängt von Kanton und Gemeinde ab. Für die direkte Bundessteuer gibt es den Bundessteuer-Rechner.",
    },
    {
      pregunta: "Was ändert der 13. Monatslohn?",
      respuesta: "Er erhöht den Jahreslohn. Damit steigt der koordinierte Lohn für die Pensionskasse und mit ihm der monatliche BVG-Abzug.",
    },
  ],
});
