import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.teuerungsrechner",
  h1: "Teuerungsrechner Schweiz mit dem Landesindex der Konsumentenpreise",
  title: "Teuerungsrechner Schweiz: Beträge mit dem LIK umrechnen",
  description:
    "Wie viel ist ein Betrag von damals heute wert? Teuerung seit 2000 mit dem Landesindex der Konsumentenpreise des BFS berechnen, Monat für Monat.",
  intro: [
    "Der Landesindex der Konsumentenpreise (LIK) misst, wie sich die Preise der Waren und Dienstleistungen entwickeln, die Haushalte in der Schweiz kaufen. Das Bundesamt für Statistik veröffentlicht ihn jeden Monat.",
    "Mit dem Rechner rechnen Sie einen Betrag auf einen anderen Monat um, etwa um einen Lohn, eine Miete oder einen Unterhaltsbeitrag an die Teuerung anzupassen.",
  ],
  comoSeCalcula: [
    "Angepasster Betrag = Betrag × LIK im Endmonat / LIK im Anfangsmonat.",
    "Gerechnet wird mit dem LIK auf der Basis Dezember 2025 = 100, auf eine Dezimale gerundet. Ältere Monate sind auf diese Basis umgerechnet.",
    "Ist der Endmonat noch nicht veröffentlicht, nimmt der Rechner den letzten verfügbaren Monat.",
  ],
  ejemplo: ["1000 Franken vom Januar 2020 entsprechen im September 2026 rund 1079 Franken. Die Teuerung in diesem Zeitraum beträgt rund 7.9 %."],
  faq: [
    {
      pregunta: "Wie hoch ist die Teuerung in der Schweiz?",
      respuesta: "Das zeigt die Jahresteuerung: die Veränderung des LIK gegenüber dem gleichen Monat des Vorjahres. Der Rechner weist sie für den Endmonat aus, den Sie wählen.",
    },
    {
      pregunta: "Woher stammen die Zahlen?",
      respuesta: "Vom Bundesamt für Statistik. Die Reihe kommt aus dem Datenportal der Schweizerischen Nationalbank, die den LIK des BFS übernimmt, und wird nach jeder Veröffentlichung nachgeführt.",
    },
    {
      pregunta: "Warum unterscheidet sich das Ergebnis leicht von anderen Rechnern?",
      respuesta: "Andere Rechner können eine andere Indexbasis oder mehr Dezimalen verwenden. Daraus entstehen kleine Rundungsunterschiede.",
    },
  ],
  glosario: [
    { termino: "LIK", definicion: "Landesindex der Konsumentenpreise des Bundesamts für Statistik." },
    { termino: "Teuerung", definicion: "Anstieg der Konsumentenpreise über einen Zeitraum." },
  ],
});
