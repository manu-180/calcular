import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.inflationsrechner",
  h1: "Inflationsrechner mit dem VPI von Statistik Austria",
  title: "Inflationsrechner Österreich: Wertsicherung mit dem VPI",
  description: "Rechnen Sie Beträge mit dem Verbraucherpreisindex von Statistik Austria auf heute um: Kaufkraft, Inflation und Wertsicherung von Mieten und Verträgen.",
  intro: [
    "Was 1.000 Euro im Jahr 2020 wert waren, kostet heute deutlich mehr. Der Rechner nutzt den Verbraucherpreisindex (VPI) von Statistik Austria und zeigt, welcher Betrag heute dieselbe Kaufkraft hat.",
    "Das hilft bei der Wertsicherung von Mieten, Unterhalt oder Verträgen, die an den VPI gebunden sind.",
  ],
  comoSeCalcula: [
    "Der Rechner teilt den Indexwert des Endmonats durch den des Anfangsmonats und multipliziert Ihren Betrag damit.",
    "Verwendet wird der VPI 2000 (Durchschnitt 2000 = 100), der monatlich von Statistik Austria veröffentlicht wird. Die Reihe beginnt im Jänner 2001.",
    "Ist für den Endmonat noch kein Wert veröffentlicht, rechnet der Rechner bis zum letzten verfügbaren Monat.",
  ],
  ejemplo: [
    "1.000 Euro aus dem Jänner 2020 entsprechen im August 2026 einer Kaufkraft von 1.336,34 Euro. Die Preise sind in diesem Zeitraum um 33,6 % gestiegen.",
  ],
  faq: [
    {
      pregunta: "Welchen Index soll ich für eine Wertsicherungsklausel verwenden?",
      respuesta: "Den Index, der im Vertrag steht. Statistik Austria veröffentlicht neben dem aktuellen Index auch ältere Reihen wie den VPI 2000 weiter. Der Rechner nutzt den VPI 2000.",
    },
    {
      pregunta: "Wann wird der VPI veröffentlicht?",
      respuesta: "Monatlich, jeweils einige Wochen nach Monatsende. Neue Werte übernimmt der Rechner automatisch, sobald Statistik Austria sie veröffentlicht.",
    },
    {
      pregunta: "Wie hoch war die Inflation im letzten Jahr?",
      respuesta: "Der Rechner zeigt die Veränderung gegenüber dem Vorjahresmonat für den Endmonat. Wählen Sie dafür den aktuellen Monat als Ende.",
    },
  ],
  glosario: [
    { termino: "VPI", definicion: "Verbraucherpreisindex, misst die Preisentwicklung eines typischen Warenkorbs in Österreich." },
    { termino: "Wertsicherung", definicion: "Die Anpassung eines Betrags an die Inflation, etwa bei Mieten." },
  ],
});
