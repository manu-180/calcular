import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.lohnnebenkosten-rechner",
  h1: "Lohnnebenkostenrechner: was kostet ein Mitarbeiter?",
  title: "Lohnnebenkosten {{anio}}: Dienstgeberkosten berechnen",
  description: "Berechnen Sie die Kosten eines Mitarbeiters in Österreich: Dienstgeberanteil zur Sozialversicherung, DB, DZ, Kommunalsteuer und Betriebliche Vorsorge.",
  intro: [
    "Zum Bruttogehalt kommen für den Arbeitgeber in Österreich rund 30 % Lohnnebenkosten dazu. Der größte Teil ist der Dienstgeberanteil zur Sozialversicherung, dazu kommen der Dienstgeberbeitrag, die Kommunalsteuer für die Gemeinde und der Beitrag an die Vorsorgekasse.",
    "Der Rechner zeigt die Kosten im Monat, auf eine Sonderzahlung und für das ganze Jahr mit 14 Gehältern.",
  ],
  comoSeCalcula: [
    "Sozialversicherung des Dienstgebers: Krankenversicherung {{at.sv-dienstgeber[kv]}}, Unfallversicherung {{at.sv-dienstgeber[uv]}}, Pensionsversicherung {{at.sv-dienstgeber[pv]}}, Arbeitslosenversicherung {{at.sv-dienstgeber[av]}}, IESG-Zuschlag {{at.sv-dienstgeber[iesg]}} und Wohnbauförderung {{at.sv-dienstgeber[wbf]}} (in Wien {{at.sv-dienstgeber[wbf-wien]}}), bis zur Höchstbeitragsgrundlage von {{at.beitragsgrundlage[hoechst-monat]}}.",
    "Dazu vom gesamten Brutto: Dienstgeberbeitrag {{at.lohnnebenkosten[db]}}, Kommunalsteuer {{at.lohnnebenkosten[kommunalsteuer]}}, Betriebliche Vorsorge {{at.sv-dienstgeber[bv]}} und, wenn Sie ihn angeben, der Zuschlag zum Dienstgeberbeitrag.",
    "Auf Sonderzahlungen entfällt der Wohnbauförderungsbeitrag. DB, DZ, Kommunalsteuer und Betriebliche Vorsorge fallen auch auf Urlaubsgeld und Weihnachtsgeld an.",
  ],
  ejemplo: [
    "Eine Angestellte in Wien mit 3.500 Euro brutto kostet den Arbeitgeber 4.531,10 Euro im Monat: 743,05 Euro Sozialversicherung, 129,50 Euro DB, 105 Euro Kommunalsteuer und 53,55 Euro Betriebliche Vorsorge. Im Jahr sind es 63.382,90 Euro.",
  ],
  faq: [
    {
      pregunta: "Wie hoch ist der Zuschlag zum Dienstgeberbeitrag?",
      respuesta: "Er hängt vom Bundesland ab und liegt höchstens bei {{at.lohnnebenkosten[dz-hoechst]}} der Bruttolohnsumme. Den Satz für Ihren Betrieb finden Sie in der Lohnverrechnung.",
    },
    {
      pregunta: "Was ist die Kommunalsteuer?",
      respuesta: "Eine Abgabe an die Gemeinde. Sie beträgt {{at.lohnnebenkosten[kommunalsteuer]}} der Bruttolohnsumme und ist am 15. des Folgemonats fällig.",
    },
    {
      pregunta: "Wofür ist der Beitrag zur Betrieblichen Vorsorge?",
      respuesta: "Für die Abfertigung neu. Der Arbeitgeber zahlt jeden Monat {{at.sv-dienstgeber[bv]}} des Entgelts, auch der Sonderzahlungen, an eine Vorsorgekasse.",
    },
  ],
  glosario: [
    { termino: "DB", definicion: "Dienstgeberbeitrag zum Familienlastenausgleichsfonds (FLAF), fällig am 15. des Folgemonats." },
    { termino: "DZ", definicion: "Zuschlag zum Dienstgeberbeitrag, je nach Bundesland unterschiedlich hoch." },
    { termino: "BV-Kasse", definicion: "Betriebliche Vorsorgekasse, sie verwaltet die Beiträge für die Abfertigung neu." },
  ],
});
