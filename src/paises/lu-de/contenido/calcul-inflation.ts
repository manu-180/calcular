import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.calcul-inflation",
  h1: "Inflation in Luxemburg mit dem IPCN berechnen",
  title: "Inflationsrechner Luxemburg: mit dem IPCN umrechnen",
  description: "Was ist ein früherer Betrag heute wert? Berechnen Sie die Inflation seit 2000 mit dem nationalen Verbraucherpreisindex (IPCN) von STATEC.",
  intro: [
    "Der nationale Verbraucherpreisindex (IPCN) misst die Entwicklung der Preise in Luxemburg. STATEC veröffentlicht ihn jeden Monat.",
    "Mit dem Rechner rechnen Sie einen Betrag in einen anderen Monat um, etwa um eine Miete oder einen Preis über die Zeit zu vergleichen.",
  ],
  comoSeCalcula: [
    "Umgerechneter Betrag = Betrag x IPCN des Endmonats / IPCN des Ausgangsmonats.",
    "Die Berechnung verwendet den IPCN mit Basis 100 am 1. Januar 1948, wie STATEC ihn veröffentlicht.",
    "Ist der Endmonat noch nicht veröffentlicht, nimmt der Rechner den letzten verfügbaren Monat.",
  ],
  ejemplo: [
    "1.000 Euro vom Januar 2020 entsprechen im September 2026 rund 1.227,50 Euro.",
  ],
  faq: [
    { pregunta: "Was ist der Unterschied zwischen IPCN und IPCH?", respuesta: "Der IPCN ist der nationale Index für die gleitende Lohnskala. Der IPCH ist der harmonisierte europäische Index." },
    { pregunta: "Woher kommen die Zahlen?", respuesta: "Aus der Datenbank LUSTAT von STATEC, nach jeder Veröffentlichung aktualisiert." },
    { pregunta: "Dient der IPCN zur Lohnindexierung?", respuesta: "Ja, über seinen Halbjahresdurchschnitt. Der Indextranche-Rechner zeigt, wo die nächste Tranche steht." },
  ],
  glosario: [
    { termino: "IPCN", definicion: "Nationaler Verbraucherpreisindex von STATEC." },
  ],
});
