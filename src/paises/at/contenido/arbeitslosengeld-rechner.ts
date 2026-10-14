import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.arbeitslosengeld-rechner",
  h1: "Arbeitslosengeld-Rechner: Schätzung für 2026",
  title: "Arbeitslosengeld 2026 berechnen: AMS-Schätzung",
  description: "Schätzen Sie Ihr Arbeitslosengeld: {{at.arbeitslosengeld[grundbetrag]}} % des Nettoeinkommens, Familienzuschlag von {{at.alg-werte[familienzuschlag]}} je Tag und Ergänzungsbetrag.",
  intro: [
    "Das Arbeitslosengeld besteht aus dem Grundbetrag, gegebenenfalls Familienzuschlägen und einem Ergänzungsbetrag bei niedrigem Einkommen. Ausgezahlt wird es vom AMS monatlich im Nachhinein.",
    "Der Rechner schätzt den Betrag aus Ihrem Bruttogehalt. Den genauen Wert legt das AMS mit Ihren gespeicherten Beitragsgrundlagen fest.",
  ],
  comoSeCalcula: [
    "Grundlage ist das Bruttogehalt bis zur Höchstbemessungsgrundlage von {{at.alg-werte[hoechstbemessung]}} im Monat, Sonderzahlungen werden mit einem Sechstel dazugerechnet.",
    "Daraus ermittelt der Rechner das Netto nach Sozialversicherung und Lohnsteuer wie im Brutto-Netto-Rechner und teilt es auf Tage (ein Dreißigstel des Monats).",
    "Grundbetrag: {{at.arbeitslosengeld[grundbetrag]}} % des täglichen Nettoeinkommens. Je Familienzuschlag kommen {{at.alg-werte[familienzuschlag]}} pro Tag dazu.",
    "Liegt der Grundbetrag unter dem Ausgleichszulagen-Richtsatz von {{at.alg-werte[ausgleichszulage]}} im Monat, gibt es einen Ergänzungsbetrag, höchstens bis {{at.arbeitslosengeld[obergrenze-ohne]}} % des Nettoeinkommens, mit Familienzuschlägen bis {{at.arbeitslosengeld[obergrenze-mit]}} %.",
  ],
  ejemplo: [
    "Bei 3.000 Euro brutto ergibt die Schätzung einen Tagsatz von 47,06 Euro, das sind rund 1.412 Euro in 30 Tagen. Für 20 Wochen sind es zusammen 6.588,40 Euro.",
  ],
  faq: [
    {
      pregunta: "Wie lange bekomme ich Arbeitslosengeld?",
      respuesta: "Grundsätzlich 20 Wochen. Nach drei Jahren arbeitslosenversicherungspflichtiger Beschäftigung 30 Wochen, ab 40 Jahren mit 6 Jahren in den letzten 10 Jahren 39 Wochen und ab 50 Jahren mit 9 Jahren in den letzten 15 Jahren 52 Wochen.",
    },
    {
      pregunta: "Welche Monate zählen für die Berechnung?",
      respuesta: "Das AMS nimmt im Regelfall die letzten zwölf monatlichen Beitragsgrundlagen vor der einjährigen Berichtigungsfrist. Ihr aktuelles Gehalt fließt also oft noch nicht ein.",
    },
    {
      pregunta: "Wann habe ich überhaupt Anspruch?",
      respuesta: "In der Regel müssen Sie in den letzten 24 Monaten 52 Wochen arbeitslosenversicherungspflichtig gearbeitet haben. Unter 25 Jahren und bei wiederholtem Bezug gelten kürzere Zeiten.",
    },
  ],
  glosario: [
    { termino: "Tagsatz", definicion: "Der Betrag Arbeitslosengeld pro Tag." },
    { termino: "Familienzuschlag", definicion: "Ein fixer Betrag pro Tag für Angehörige, zu deren Unterhalt Sie wesentlich beitragen." },
    { termino: "Ausgleichszulagen-Richtsatz", definicion: "Der Betrag, bis zu dem niedrige Arbeitslosengelder mit dem Ergänzungsbetrag aufgestockt werden." },
  ],
});
