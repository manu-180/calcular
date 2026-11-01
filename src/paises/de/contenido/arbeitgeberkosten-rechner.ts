import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.arbeitgeberkosten-rechner",
  h1: "Arbeitgeberkosten-Rechner {{anio}}",
  title: "Arbeitgeberkosten {{anio}}: Was kostet ein Mitarbeiter?",
  description:
    "Was kostet ein Bruttogehalt den Arbeitgeber wirklich? Arbeitgeberanteile zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung mit den Sätzen {{anio}}.",
  intro: [
    "Zum Bruttogehalt kommt beim Arbeitgeber sein Anteil an der Sozialversicherung dazu. Bei einem normalen Gehalt sind das gut 20 Prozent.",
    "Der Rechner zeigt jeden Beitrag und die Gesamtkosten pro Monat und Jahr.",
  ],
  comoSeCalcula: [
    "Krankenversicherung: die Hälfte von {{de.kv-allgemein}} plus die Hälfte des Zusatzbeitrags, bis {{de.bbg-kv}} im Monat.",
    "Pflegeversicherung: die Hälfte von {{de.pv-beitragssatz}}, in Sachsen 1 Prozentpunkt weniger. Den Zuschlag für Kinderlose trägt allein der Beschäftigte.",
    "Rentenversicherung: die Hälfte von {{de.rv-beitragssatz}}; Arbeitslosenversicherung: die Hälfte von {{de.av-beitragssatz}}, bis {{de.bbg-rv}} im Monat.",
    "Im Übergangsbereich zahlt der Arbeitgeber mehr als die Hälfte, weil der Anteil der Beschäftigten gemindert ist.",
  ],
  ejemplo: ["Ein Gehalt von 4.000 Euro brutto kostet den Arbeitgeber 4.846 Euro im Monat, ohne Umlagen und Berufsgenossenschaft."],
  faq: [
    {
      pregunta: "Welche Kosten fehlen in der Rechnung?",
      respuesta: "Die Umlagen U1 und U2, die Insolvenzgeldumlage und der Beitrag zur Unfallversicherung. Dazu kommen freiwillige Leistungen wie Jobticket oder betriebliche Altersvorsorge.",
    },
    {
      pregunta: "Wie teuer ist ein Minijob für den Arbeitgeber?",
      respuesta: "Dort gelten Pauschalabgaben statt der normalen Beiträge. Rechnen Sie das mit dem Minijob-Rechner.",
    },
    {
      pregunta: "Steigen die Kosten bei hohen Gehältern immer weiter?",
      respuesta: "Die Sozialabgaben nicht. Über den Beitragsbemessungsgrenzen bleibt der Arbeitgeberanteil gleich, der prozentuale Aufschlag sinkt.",
    },
  ],
  glosario: [
    { termino: "Arbeitgeberanteil", definicion: "Der Teil der Sozialversicherungsbeiträge, den der Arbeitgeber zusätzlich zum Bruttolohn zahlt." },
    { termino: "Umlage U1", definicion: "Versicherung der Arbeitgeber gegen die Lohnfortzahlung im Krankheitsfall, vor allem für kleine Betriebe." },
  ],
});
