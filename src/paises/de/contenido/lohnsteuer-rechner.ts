import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.lohnsteuer-rechner",
  h1: "Lohnsteuerrechner 2026",
  title: "Lohnsteuerrechner 2026 für alle Steuerklassen",
  description:
    "Lohnsteuer, Solidaritätszuschlag und Kirchensteuer für Ihren Monatslohn, nach dem amtlichen Programmablaufplan 2026 und im Vergleich aller sechs Steuerklassen.",
  intro: [
    "Der Rechner ermittelt die Lohnsteuer, die Ihr Arbeitgeber jeden Monat einbehält. Er folgt dem Programmablaufplan, den das Bundesfinanzministerium für Lohnabrechnungen vorgibt.",
    "Zusätzlich sehen Sie, wie hoch die Lohnsteuer für denselben Lohn in jeder der sechs Steuerklassen wäre.",
  ],
  comoSeCalcula: [
    "Der Monatslohn wird mit zwölf auf einen Jahreslohn hochgerechnet.",
    "Abgezogen werden der Arbeitnehmer-Pauschbetrag von {{de.arbeitnehmer-pauschbetrag}}, der Sonderausgaben-Pauschbetrag von {{de.sonderausgaben-pauschbetrag}}, in Klasse II der Entlastungsbetrag von {{de.entlastungsbetrag-alleinerziehende}} und die Vorsorgepauschale für Ihre Sozialversicherung.",
    "Auf den Rest wird der Einkommensteuertarif angewendet: in Klasse III mit Splitting, in Klasse V und VI mit dem besonderen Verfahren nach § 39b EStG.",
    "Die Jahressteuer wird auf volle Euro abgerundet und durch zwölf geteilt.",
    "Der Solidaritätszuschlag fällt erst an, wenn die Jahreslohnsteuer {{de.soli-freigrenze}} übersteigt (Klasse III: das Doppelte). Kinderfreibeträge senken nur Soli und Kirchensteuer.",
  ],
  ejemplo: ["Bei 5.500 Euro Monatslohn ohne Kinder beträgt die Lohnsteuer in Klasse I 921,25 Euro, in Klasse III 506,83 Euro und in Klasse V 1.448 Euro."],
  faq: [
    {
      pregunta: "Ist die Lohnsteuer schon meine endgültige Steuer?",
      respuesta: "Nein. Sie ist eine Vorauszahlung auf die Einkommensteuer. Mit der Steuererklärung wird abgerechnet, und zu viel gezahlte Lohnsteuer kommt zurück.",
    },
    {
      pregunta: "Warum unterscheiden sich die Steuerklassen so stark?",
      respuesta: "Die Klassen verteilen Freibeträge zwischen Ehepartnern. In Klasse III liegen beide Grundfreibeträge, in Klasse V keiner. Über das Jahr zahlt das Paar mit der Steuererklärung trotzdem denselben Betrag.",
    },
    {
      pregunta: "Was ist Steuerklasse VI?",
      respuesta: "Die Klasse für einen zweiten oder weiteren Job mit Lohnsteuerkarte. Dort gibt es keine Freibeträge, deshalb ist der Abzug hoch.",
    },
    {
      pregunta: "Weicht der Wert von meiner Gehaltsabrechnung ab?",
      respuesta: "Ein Freibetrag auf Ihren Lohnsteuerabzugsmerkmalen, eine private Krankenversicherung oder Einmalzahlungen ändern die Lohnsteuer. Ohne diese Besonderheiten stimmt der Wert auf den Cent.",
    },
  ],
  glosario: [
    { termino: "Programmablaufplan (PAP)", definicion: "Die amtliche Rechenvorschrift des Bundesfinanzministeriums für den Lohnsteuerabzug." },
    { termino: "Kinderfreibetrag", definicion: "Ein halber oder ganzer Zähler je Kind. Er mindert beim Lohnsteuerabzug nur Soli und Kirchensteuer." },
  ],
});
