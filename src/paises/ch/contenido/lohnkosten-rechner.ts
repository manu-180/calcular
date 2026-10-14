import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.lohnkosten-rechner",
  h1: "Lohnkosten-Rechner Schweiz: was eine Stelle den Arbeitgeber kostet",
  title: "Lohnkosten-Rechner Schweiz: Arbeitgeberbeiträge 2026",
  description:
    "Was kostet ein Bruttolohn den Arbeitgeber? AHV/IV/EO, ALV, Pensionskasse, Familienausgleichskasse und Berufsunfall pro Monat und pro Jahr berechnen.",
  intro: [
    "Zum Bruttolohn kommen für den Arbeitgeber eigene Sozialversicherungsbeiträge dazu. AHV/IV/EO und ALV zahlt er zur Hälfte, die Pensionskasse mindestens zur Hälfte, die Berufsunfallprämie ganz.",
    "Der Beitrag an die Familienausgleichskasse ist je nach Kanton verschieden. Geben Sie den Satz Ihrer Kasse ein, ebenso die Prämie Ihres Unfallversicherers.",
  ],
  comoSeCalcula: [
    "AHV/IV/EO: die Hälfte von {{ch.ahv-iv-eo-beitragssatz}} auf dem Bruttolohn.",
    "ALV: die Hälfte von {{ch.alv-beitragssatz}} bis zum höchsten versicherten Verdienst von {{ch.hoechster-versicherter-verdienst}} im Jahr.",
    "Pensionskasse: Der Arbeitgeber zahlt mindestens gleich viel wie alle Arbeitnehmenden zusammen. Ohne Ihre Angabe rechnet der Rechner mit der Hälfte der gesetzlichen Altersgutschrift auf dem koordinierten Lohn.",
    "FAK und Berufsunfall: der eingegebene Prozentsatz. Die BU-Prämie gilt wie die ALV nur bis zum höchsten versicherten Verdienst.",
  ],
  ejemplo: [
    "Ein Lohn von 6500 Franken (13 Monatslöhne, Alter 35) kostet mit 1,5 % FAK und 0,5 % BU rund 7288 Franken im Monat. Aufs Jahr sind es rund 94 500 Franken.",
  ],
  faq: [
    {
      pregunta: "Wer bezahlt die Berufsunfallversicherung?",
      respuesta: "Die Prämien für Berufsunfälle und Berufskrankheiten trägt der Arbeitgeber. Die Prämie für Nichtberufsunfälle geht zulasten der Arbeitnehmenden, sofern nichts Günstigeres vereinbart ist.",
    },
    {
      pregunta: "Muss der Arbeitgeber die Hälfte der Pensionskasse bezahlen?",
      respuesta: "Er muss mindestens gleich viel bezahlen wie alle seine Arbeitnehmenden zusammen. Mehr ist möglich, wenn er einverstanden ist.",
    },
    {
      pregunta: "Was fehlt in dieser Rechnung?",
      respuesta: "Die Verwaltungskosten der AHV-Ausgleichskasse, Beiträge, die ein Gesamtarbeitsvertrag vorschreibt, und freiwillige Leistungen. Prüfen Sie diese in Ihren Verträgen.",
    },
  ],
});
