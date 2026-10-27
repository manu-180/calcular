import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.brutto-netto-rechner",
  h1: "Brutto-Netto-Rechner Schweiz",
  title: "Brutto-Netto-Rechner Schweiz {{anio}}: Lohnabzüge berechnen",
  description:
    "Vom Bruttolohn zum Nettolohn: AHV/IV/EO, ALV, Pensionskasse und NBU mit den Sätzen {{anio}}. Pro Monat und pro Jahr, für 12 oder 13 Monatslöhne.",
  intro: [
    "Vom Bruttolohn gehen in der Schweiz die Beiträge an AHV, IV und EO ab, dazu die Arbeitslosenversicherung, die Pensionskasse und die Prämie für Nichtberufsunfälle. AHV/IV/EO ({{ch.ahv-iv-eo-beitragssatz}}) und ALV ({{ch.alv-beitragssatz}}) teilen sich Arbeitgeber und Arbeitnehmer je zur Hälfte.",
    "Der Rechner zeigt Ihren Nettolohn vor Steuern. Eine allfällige Quellensteuer ist nicht abgezogen.",
  ],
  comoSeCalcula: [
    "AHV/IV/EO: die Hälfte von {{ch.ahv-iv-eo-beitragssatz}} auf dem ganzen Bruttolohn.",
    "ALV: die Hälfte von {{ch.alv-beitragssatz}}, aber nur bis zum höchsten versicherten Verdienst von {{ch.hoechster-versicherter-verdienst}} im Jahr.",
    "Pensionskasse: Liegt der Jahreslohn über {{ch.bvg-eintrittsschwelle}}, ist der koordinierte Lohn versichert, also der Jahreslohn bis {{ch.bvg-obere-grenze}} minus {{ch.bvg-koordinationsabzug}}. Die gesetzliche Altersgutschrift beträgt je nach Alter 7 bis 18 % davon. Ohne Ihre Angabe rechnet der Rechner mit der Hälfte davon als Ihrem Anteil.",
    "NBU und Krankentaggeld: der Prozentsatz, den Sie eingeben.",
  ],
  ejemplo: [
    "Bei 6500 Franken brutto, 13 Monatslöhnen und Alter 35 gehen pro Monat rund 345 Franken für AHV/IV/EO, 72 Franken für die ALV, 242 Franken für die Pensionskasse und 65 Franken NBU ab. Netto bleiben rund 5777 Franken.",
  ],
  faq: [
    {
      pregunta: "Welche Abzüge sind fest und welche nicht?",
      respuesta: "Fest sind AHV/IV/EO mit der Hälfte von {{ch.ahv-iv-eo-beitragssatz}} und die ALV mit der Hälfte von {{ch.alv-beitragssatz}}. Der Beitrag an die Pensionskasse hängt von Alter und Reglement ab, die NBU-Prämie vom Unfallversicherer.",
    },
    {
      pregunta: "Warum zahle ich unter 25 Jahren weniger Pensionskasse?",
      respuesta: "Die gesetzlichen Altersgutschriften beginnen mit dem 25. Altersjahr. Vorher sind Sie in der Pensionskasse nur für Tod und Invalidität versichert.",
    },
    {
      pregunta: "Ist der 13. Monatslohn auch abzugspflichtig?",
      respuesta: "Ja. Gratifikationen und ähnliche Vergütungen gehören zum AHV-pflichtigen Lohn. Beim BVG zählt der 13. Monatslohn zum Jahreslohn.",
    },
    {
      pregunta: "Warum ist die ALV bei hohen Löhnen tiefer als erwartet?",
      respuesta: "Die ALV wird nur bis zum höchsten versicherten Verdienst von {{ch.hoechster-versicherter-verdienst}} im Jahr erhoben. Auf dem Teil darüber gibt es keinen ALV-Beitrag.",
    },
  ],
  glosario: [
    { termino: "Koordinierter Lohn", definicion: "Der Teil des Jahreslohns, der in der Pensionskasse obligatorisch versichert ist." },
    {
      termino: "NBU",
      definicion: "Nichtberufsunfallversicherung. Wer mindestens acht Stunden pro Woche beim gleichen Arbeitgeber arbeitet, ist auch gegen Nichtberufsunfälle versichert. Die Prämie geht zulasten der Arbeitnehmenden, sofern nichts Günstigeres vereinbart ist.",
    },
    { termino: "Lohnausweis", definicion: "Jährliche Bescheinigung des Arbeitgebers mit Bruttolohn, Abzügen und Nettolohn für die Steuererklärung." },
  ],
});
