import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.verzugszinsrechner",
  h1: "Verzugszinsrechner Schweiz: {{ch.verzugszins}} nach OR",
  title: "Verzugszins Rechner Schweiz: {{ch.verzugszins}} nach Art. 104 OR",
  description:
    "Verzugszins für eine offene Rechnung berechnen: gesetzlich {{ch.verzugszins}} pro Jahr nach Art. 104 OR oder ein höherer vertraglicher Zins, auf den Tag genau.",
  intro: [
    "Wer eine Geldschuld nicht rechtzeitig bezahlt, schuldet ab Verzug Zinsen. Das Obligationenrecht legt den Verzugszins auf {{ch.verzugszins}} pro Jahr fest, auch wenn vertraglich ein tieferer Zins gilt.",
    "Ist ein höherer Zins vereinbart, kann er auch während des Verzugs verlangt werden.",
  ],
  comoSeCalcula: [
    "Verzugszins = Betrag × Zinssatz × Verzugstage / Zinstage pro Jahr.",
    "Gezählt werden die Kalendertage vom Beginn des Verzugs bis zum gewählten Datum.",
    "Sie wählen, ob das Jahr mit 365 oder 360 Zinstagen gerechnet wird. Mit 360 Tagen fällt der Zins etwas höher aus.",
  ],
  ejemplo: ["Für 5000 Franken, die 213 Tage im Verzug sind, beträgt der Verzugszins rund 146 Franken."],
  faq: [
    {
      pregunta: "Wie hoch ist der Verzugszins in der Schweiz?",
      respuesta: "{{ch.verzugszins}} pro Jahr, wenn nichts Höheres vereinbart ist. Unter Kaufleuten kann ein höherer Satz gelten, wenn der übliche Bankdiskonto am Zahlungsort über diesem Wert liegt.",
    },
    {
      pregunta: "Ab wann läuft der Verzugszins?",
      respuesta: "Ab Eintritt des Verzugs. Ist eine Schuld fällig, gerät der Schuldner mit der Mahnung in Verzug. Wurde ein Verfalltag vereinbart, schon mit Ablauf dieses Tages.",
    },
    {
      pregunta: "Darf auf Verzugszinsen wieder Zins verlangt werden?",
      respuesta: "Nein. Von Verzugszinsen dürfen keine Verzugszinsen berechnet werden. Der Rechner verzinst nur den ursprünglichen Betrag.",
    },
  ],
});
