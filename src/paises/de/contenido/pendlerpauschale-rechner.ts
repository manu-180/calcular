import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.pendlerpauschale-rechner",
  h1: "Pendlerpauschale-Rechner 2026",
  title: "Pendlerpauschale 2026: {{de.entfernungspauschale}} pro Kilometer",
  description:
    "Berechnen Sie Ihre Entfernungspauschale 2026: {{de.entfernungspauschale}} je Kilometer ab dem ersten, mit Höchstbetrag ohne Auto und geschätzter Steuerersparnis.",
  intro: [
    "Für den Weg zur Arbeit können Sie in der Steuererklärung die Entfernungspauschale ansetzen, umgangssprachlich Pendlerpauschale. Seit 2026 gilt ein einheitlicher Satz ab dem ersten Kilometer.",
    "Der Rechner zeigt die Pauschale für Ihr Jahr und wie viel davon über den Arbeitnehmer-Pauschbetrag hinausgeht, den jeder ohnehin bekommt.",
  ],
  comoSeCalcula: [
    "Pauschale = volle Kilometer der einfachen Strecke × Arbeitstage × {{de.entfernungspauschale}}.",
    "Gezählt wird die kürzeste Straßenverbindung, nur die einfache Strecke und nur Tage, an denen Sie zur ersten Tätigkeitsstätte fahren.",
    "Ohne eigenes Auto (Bahn, Rad, zu Fuß) gilt höchstens {{de.entfernungspauschale-hoechstbetrag}} im Jahr.",
    "Steuerlich wirkt nur der Teil Ihrer Werbungskosten, der über dem Arbeitnehmer-Pauschbetrag von {{de.arbeitnehmer-pauschbetrag}} liegt.",
  ],
  ejemplo: ["Bei 30 Kilometern und 220 Arbeitstagen ergibt die Pauschale 2.508 Euro. 1.278 Euro davon liegen über dem Pauschbetrag; bei 30 % Grenzsteuersatz sparen Sie rund 383 Euro."],
  faq: [
    {
      pregunta: "Zählt die Hin- und Rückfahrt?",
      respuesta: "Nein, nur die einfache Entfernung zwischen Wohnung und erster Tätigkeitsstätte.",
    },
    {
      pregunta: "Gilt die Pauschale auch für Bahnfahrer?",
      respuesta: "Ja, unabhängig vom Verkehrsmittel, ohne Auto aber höchstens bis {{de.entfernungspauschale-hoechstbetrag}} im Jahr. Flugstrecken zählen nicht.",
    },
    {
      pregunta: "Wie viele Arbeitstage soll ich ansetzen?",
      respuesta: "Die Tage, an denen Sie tatsächlich zur Arbeit gefahren sind. Bei einer Fünftagewoche sind 220 bis 230 Tage üblich, Homeoffice-Tage zählen nicht.",
    },
  ],
  glosario: [
    { termino: "Erste Tätigkeitsstätte", definicion: "Der Ort, dem Sie dauerhaft zugeordnet sind, meist das Büro oder der Betrieb." },
    { termino: "Werbungskosten", definicion: "Ausgaben für den Beruf, die das zu versteuernde Einkommen mindern." },
  ],
});
