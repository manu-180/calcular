import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.mindestlohn-rechner",
  h1: "Mindestlohnrechner: {{de.mindestlohn}} pro Stunde",
  title: "Mindestlohnrechner: {{de.mindestlohn}} pro Stunde und Monat",
  description:
    "Der Mindestlohn beträgt {{de.mindestlohn}} pro Stunde. Rechnen Sie aus, was das im Monat ergibt, und prüfen Sie Ihren eigenen Stundenlohn.",
  intro: [
    "Seit dem {{de.mindestlohn#desde}} gilt ein gesetzlicher Mindestlohn von {{de.mindestlohn}} brutto je Zeitstunde. Er gilt für fast alle Beschäftigten ab 18 Jahren, auch im Minijob.",
    "Geben Sie Ihre Wochenstunden ein, dann sehen Sie den Mindestbetrag pro Monat. Mit Ihrem Monatslohn prüft der Rechner, ob Sie genug bekommen.",
  ],
  comoSeCalcula: [
    "Ein Monat hat im Durchschnitt 13/3 Wochen (52 Wochen geteilt durch 12 Monate).",
    "Monatslohn = Mindestlohn × Wochenstunden × 13 / 3.",
    "Ihr Stundenlohn = Monatslohn × 3 / (13 × Wochenstunden).",
    "Die Minijob-Grenze folgt dem Mindestlohn: Mindestlohn × 130 / 3, auf volle Euro aufgerundet.",
  ],
  ejemplo: ["Im Jahr 2026 ergibt der Mindestlohn von 13,90 Euro bei 40 Wochenstunden rund 2.409 Euro brutto im Monat."],
  faq: [
    {
      pregunta: "Wie hoch ist der Mindestlohn 2027?",
      respuesta: "Ab dem 1. Januar 2027 steigt er auf 14,60 Euro pro Stunde. Das hat die Bundesregierung in der Fünften Mindestlohnanpassungsverordnung festgelegt.",
    },
    {
      pregunta: "Wer bekommt keinen Mindestlohn?",
      respuesta: "Unter anderem Jugendliche unter 18 ohne abgeschlossene Berufsausbildung, Auszubildende, Pflichtpraktikanten und Orientierungspraktikanten bis zu drei Monaten (§ 22 Mindestlohngesetz).",
    },
    {
      pregunta: "Kann ich auf den Mindestlohn verzichten?",
      respuesta: "Nein. Vereinbarungen, die den Mindestlohn unterschreiten, sind insoweit unwirksam. Auf einen entstandenen Anspruch können Sie nur durch einen gerichtlichen Vergleich verzichten.",
    },
  ],
  glosario: [
    { termino: "Zeitstunde", definicion: "Eine tatsächlich geleistete Arbeitsstunde. Der Mindestlohn gilt für jede einzelne." },
    { termino: "Geringfügigkeitsgrenze", definicion: "Die Verdienstgrenze für Minijobs, die automatisch mit dem Mindestlohn steigt." },
  ],
});
