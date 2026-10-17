import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.inflationsrechner",
  h1: "Inflationsrechner mit dem Verbraucherpreisindex",
  title: "Inflationsrechner: Kaufkraft seit 2000 berechnen",
  description:
    "Was ist ein Betrag von früher heute wert? Der Rechner nutzt den Verbraucherpreisindex des Statistischen Bundesamts, Monat für Monat seit 2000.",
  intro: [
    "Mit dem Inflationsrechner sehen Sie, wie viel Geld Sie heute bräuchten, um sich dasselbe zu kaufen wie früher. Grundlage ist der amtliche Verbraucherpreisindex für Deutschland.",
    "Wählen Sie einen Anfangs- und einen Endmonat. Der Rechner zeigt die Inflation im Zeitraum und die aktuelle Inflationsrate.",
  ],
  comoSeCalcula: [
    "Faktor = Verbraucherpreisindex im Endmonat geteilt durch den Index im Anfangsmonat.",
    "Angepasster Betrag = ursprünglicher Betrag × Faktor.",
    "Inflationsrate = Veränderung des Index gegenüber dem gleichen Monat des Vorjahres.",
    "Die Indexwerte stammen vom Statistischen Bundesamt und werden über die Zeitreihen der Deutschen Bundesbank aktualisiert.",
  ],
  ejemplo: ["1.000 Euro aus dem Januar 2020 entsprechen im September 2026 rund 1.269 Euro. Die Preise sind in dieser Zeit um knapp 27 % gestiegen."],
  faq: [
    {
      pregunta: "Wie hoch ist die Inflation aktuell?",
      respuesta: "Wählen Sie als Endmonat den aktuellen Monat. Der Rechner zeigt die Rate gegenüber dem Vorjahresmonat aus dem letzten veröffentlichten Index.",
    },
    {
      pregunta: "Was misst der Verbraucherpreisindex?",
      respuesta: "Die Preisentwicklung eines Warenkorbs aus Waren und Dienstleistungen, die private Haushalte in Deutschland kaufen, von Lebensmitteln über Mieten bis zu Energie.",
    },
    {
      pregunta: "Kann ich damit eine Indexmiete prüfen?",
      respuesta: "Ja. Indexmieten folgen dem Verbraucherpreisindex. Tragen Sie die Miete und die Monate der letzten und der neuen Anpassung ein.",
    },
  ],
  glosario: [
    { termino: "Verbraucherpreisindex (VPI)", definicion: "Amtliches Maß für die Teuerung in Deutschland mit dem Basisjahr 2020 = 100." },
    { termino: "Kaufkraft", definicion: "Wie viele Waren und Dienstleistungen man für einen Geldbetrag bekommt." },
  ],
});
