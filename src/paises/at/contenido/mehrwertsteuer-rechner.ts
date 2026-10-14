import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "at.mehrwertsteuer-rechner",
  h1: "Mehrwertsteuerrechner für Österreich",
  title: "MwSt-Rechner Österreich: 20, 13, 10 und 4,9 %",
  description: "Umsatzsteuer aufschlagen oder herausrechnen mit allen österreichischen Sätzen: {{at.ust[normal]}}, {{at.ust[dreizehn]}}, {{at.ust[zehn]}} und {{at.ust[grundnahrung]}} für Grundnahrungsmittel.",
  intro: [
    "Die Mehrwertsteuer heißt im Gesetz Umsatzsteuer. Der Normalsteuersatz beträgt in Österreich {{at.ust[normal]}}, für bestimmte Umsätze gelten ermäßigte Sätze.",
    "Seit 1. Juli 2026 gibt es einen neuen Satz von {{at.ust[grundnahrung]}} für ausgewählte Grundnahrungsmittel wie Brot, Butter, Eier und Milch.",
  ],
  comoSeCalcula: [
    "Aufschlagen: Nettobetrag mal Steuersatz ergibt die Umsatzsteuer, Netto plus Steuer den Bruttobetrag.",
    "Herausrechnen: Bruttobetrag geteilt durch 1,2 (bei 20 %), 1,13, 1,1 oder 1,049 ergibt den Nettobetrag. Die Differenz ist die Steuer.",
    "Ziehen Sie nicht 20 % vom Bruttobetrag ab, das ergibt zu wenig Netto.",
  ],
  ejemplo: [
    "Eine Rechnung über 500 Euro netto kostet mit {{at.ust[normal]}} Umsatzsteuer 600 Euro brutto. Aus 600 Euro brutto ergeben sich umgekehrt 100 Euro Steuer.",
  ],
  faq: [
    {
      pregunta: "Wofür gilt der Steuersatz von 10 %?",
      respuesta: "Zum Beispiel für die Vermietung zu Wohnzwecken, Beherbergung, Bücher, Zeitungen und Lebensmittel, die nicht unter den Satz von 4,9 % fallen.",
    },
    {
      pregunta: "Welche Lebensmittel haben 4,9 %?",
      respuesta: "Ausgewählte Grundnahrungsmittel wie Brot, Butter, Eier und Milch. Begünstigt ist nur, was in der Anlage 3 zum Umsatzsteuergesetz steht. Wird ein begünstigtes mit einem nicht begünstigten Lebensmittel zusammen geliefert, etwa als Wurstsemmel, gilt weiter der höhere Satz.",
    },
    {
      pregunta: "Wofür gilt der Satz von 13 %?",
      respuesta: "Zum Beispiel für lebende Tiere und Pflanzen, Brennholz, künstlerische Tätigkeiten und Filmvorführungen.",
    },
  ],
  glosario: [
    { termino: "Umsatzsteuer", definicion: "Der gesetzliche Name der Mehrwertsteuer." },
    { termino: "Vorsteuer", definicion: "Die Umsatzsteuer, die ein Unternehmen beim Einkauf zahlt und vom Finanzamt zurückholen kann." },
  ],
});
