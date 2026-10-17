import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.salaire-social-minimum",
  h1: "Sozialer Mindestlohn in Luxemburg",
  title: "Mindestlohn Luxemburg 2026: Beträge",
  description: "Sozialer Mindestlohn in Luxemburg seit dem 1. Juni 2026: {{lu.ssm-non-qualifie}} unqualifiziert, {{lu.ssm-qualifie}} qualifiziert, Stundenlöhne und Jugendliche.",
  intro: [
    "Der soziale Mindestlohn ist der niedrigste Lohn, den ein Arbeitgeber zahlen darf. Er beträgt {{lu.ssm-non-qualifie}} im Monat für einen unqualifizierten Arbeitnehmer ab 18 Jahren.",
    "Ein qualifizierter Arbeitnehmer hat Anspruch auf 20 % mehr, also {{lu.ssm-qualifie}}. Für Jugendliche ist der Mindestlohn niedriger.",
  ],
  comoSeCalcula: [
    "Monatsbetrag: der Betrag der Kategorie, für eine Vollzeitstelle von {{lu.heures-par-mois}} Stunden im Monat.",
    "Stundenbetrag: der Monatsbetrag geteilt durch {{lu.heures-par-mois}}, auf vier Nachkommastellen.",
    "Teilzeit: der Stundenbetrag mal die geleisteten Stunden.",
  ],
  ejemplo: [
    "Ein qualifizierter Arbeitnehmer in Vollzeit erhält mindestens 3.325,59 Euro brutto im Monat, also 19,2231 Euro pro Stunde.",
  ],
  faq: [
    { pregunta: "Wer gilt als qualifiziert?", respuesta: "Wer einen Beruf ausübt, der eine Qualifikation mit amtlichem Zeugnis mindestens auf Niveau DAP oder CATP verlangt. Andere Zeugnisse mit 2 oder 5 Jahren Praxis, oder 10 Jahre Praxis ohne Zeugnis, können ebenfalls Anspruch auf den qualifizierten Mindestlohn geben." },
    { pregunta: "Wie viel erhält ein Jugendlicher?", respuesta: "{{lu.ssm-jeunes[17-18]}} des unqualifizierten Mindestlohns von 17 bis 18 Jahren, {{lu.ssm-jeunes[15-17]}} von 15 bis 17 Jahren." },
    { pregunta: "Wann steigt der Mindestlohn?", respuesta: "Mit jeder Indextranche und wenn das Gesetz ihn anhebt. Die Regierung legt alle zwei Jahre einen Bericht über seine Entwicklung vor." },
  ],
  glosario: [
    { termino: "Sozialer Mindestlohn", definicion: "Gesetzlicher Mindestlohn in Luxemburg, auf Französisch salaire social minimum (SSM)." },
    { termino: "Indextranche", definicion: "Anpassung der Löhne um 2,5 % an die Entwicklung der Lebenshaltungskosten." },
  ],
});
