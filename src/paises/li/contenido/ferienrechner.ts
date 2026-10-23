import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.ferienrechner",
  h1: "Ferienanspruch in Liechtenstein berechnen",
  title: "Ferienrechner Liechtenstein: Ferienanspruch",
  description: "Wie viele Ferientage stehen Ihnen in Liechtenstein zu? Mindestens {{li.ferien-wochen}} Wochen, bis zum vollendeten 20. Altersjahr {{li.ferien-wochen-jugendliche}} Wochen, anteilig bei Ein- und Austritt.",
  intro: [
    "Der Arbeitgeber muss jedes Dienstjahr mindestens {{li.ferien-wochen}} Wochen Ferien gewähren. Bis zum vollendeten 20. Altersjahr sind es {{li.ferien-wochen-jugendliche}} Wochen.",
    "Für ein unvollständiges Dienstjahr gibt es Ferien im Verhältnis zur Dauer des Arbeitsverhältnisses.",
  ],
  comoSeCalcula: [
    "Ferientage pro Jahr = Ferienwochen x Arbeitstage pro Woche.",
    "Anteil = Ferientage x Monate / 12.",
    "Bei Stundenlohn entspricht der Ferienzuschlag Ferienwochen / (52 - Ferienwochen).",
  ],
  ejemplo: [
    "Wer mit 30 Jahren fünf Tage pro Woche arbeitet, hat Anspruch auf 20 Ferientage im Jahr.",
  ],
  faq: [
    { pregunta: "Darf der Arbeitgeber die Ferien kürzen?", respuesta: "Erst wenn Sie insgesamt mehr als einen Monat an der Arbeit verhindert sind, und dann um einen Zwölftel pro vollen Monat. Bei Schwangerschaft gelten längere Grenzen." },
    { pregunta: "Dürfen Ferien ausbezahlt werden?", respuesta: "Nicht während des Arbeitsverhältnisses. Ferien dürfen nicht durch Geld abgegolten werden." },
    { pregunta: "Wer bestimmt den Zeitpunkt der Ferien?", respuesta: "Der Arbeitgeber, mit Rücksicht auf Ihre Wünsche, soweit es mit dem Betrieb vereinbar ist." },
  ],
  glosario: [
    { termino: "Dienstjahr", definicion: "Jahr des Arbeitsverhältnisses, gezählt ab dem Eintritt." },
  ],
});
