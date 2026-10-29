import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.brutto-netto-rechner",
  h1: "Brutto-Netto-Rechner {{anio}}",
  title: "Brutto-Netto-Rechner {{anio}}: Ihr Nettogehalt",
  description:
    "Vom Bruttogehalt zum Netto: Lohnsteuer nach dem Programmablaufplan {{anio}}, Soli, Kirchensteuer und alle Sozialabgaben mit den Beitragssätzen {{anio}}.",
  intro: [
    "Geben Sie Ihr monatliches Bruttogehalt und Ihre Steuerklasse ein. Der Rechner zieht Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und die vier Sozialversicherungsbeiträge ab und zeigt, was auf Ihrem Konto ankommt.",
    "Die Lohnsteuer folgt Schritt für Schritt dem amtlichen Programmablaufplan des Bundesfinanzministeriums. Sie entspricht damit dem Betrag, den Ihr Arbeitgeber einbehält.",
  ],
  comoSeCalcula: [
    "Krankenversicherung: {{de.kv-allgemein}} plus Zusatzbeitrag, je zur Hälfte von Ihnen und vom Arbeitgeber, höchstens bis {{de.bbg-kv}} im Monat.",
    "Pflegeversicherung: {{de.pv-beitragssatz}}, davon die Hälfte für Sie. Ohne Kinder kommt ein Zuschlag von {{de.pv-zuschlaege[kinderlos]}} dazu; ab dem zweiten Kind unter 25 sinkt Ihr Anteil um {{de.pv-zuschlaege[abschlag-je-kind]}} je Kind. In Sachsen tragen Sie einen größeren Teil.",
    "Rentenversicherung {{de.rv-beitragssatz}} und Arbeitslosenversicherung {{de.av-beitragssatz}}, je zur Hälfte, höchstens bis {{de.bbg-rv}} im Monat.",
    "Lohnsteuer: Das Monatsgehalt wird aufs Jahr hochgerechnet. Davon gehen der Arbeitnehmer-Pauschbetrag ({{de.arbeitnehmer-pauschbetrag}}), der Sonderausgaben-Pauschbetrag und die Vorsorgepauschale ab. Auf den Rest wird der Tarif nach § 32a EStG angewendet und durch zwölf geteilt.",
    "Solidaritätszuschlag: {{de.soli-satz}} der Lohnsteuer, aber erst ab einer Jahreslohnsteuer von {{de.soli-freigrenze}} (in Steuerklasse III das Doppelte).",
    "Kirchensteuer: {{de.kirchensteuer@by}} in Bayern und Baden-Württemberg, {{de.kirchensteuer@nw}} in den übrigen Ländern. Kinderfreibeträge senken Soli und Kirchensteuer, nicht die Lohnsteuer.",
  ],
  ejemplo: [
    "Bei 4.000 Euro brutto in Steuerklasse I, ohne Kinder und ohne Kirche, behält der Arbeitgeber 524,50 Euro Lohnsteuer und 870 Euro Sozialabgaben ein. Netto bleiben 2.605,50 Euro.",
  ],
  faq: [
    {
      pregunta: "Wie viel Netto bleibt von 3.000 Euro brutto?",
      respuesta: "Das hängt vor allem von der Steuerklasse und den Kindern ab. Geben Sie 3.000 Euro ein und wählen Sie Ihre Steuerklasse: Der Rechner zeigt jeden Abzug einzeln.",
    },
    {
      pregunta: "Warum ist mein Netto in Steuerklasse V so niedrig?",
      respuesta: "In Klasse V fehlen der Grundfreibetrag und die Pauschbeträge, weil sie beim Ehepartner in Klasse III liegen. Über das Jahr gleicht die Steuererklärung das aus.",
    },
    {
      pregunta: "Welchen Zusatzbeitrag soll ich eintragen?",
      respuesta: "Den Ihrer Krankenkasse. Er steht auf der Website der Kasse oder auf Ihrer Gehaltsabrechnung. Ohne Eingabe rechnet der Rechner mit dem Durchschnitt von {{de.kv-zusatzbeitrag}}.",
    },
    {
      pregunta: "Gilt der Rechner für privat Versicherte?",
      respuesta: "Nein. Er rechnet mit gesetzlicher Kranken- und Pflegeversicherung. Bei privater Versicherung zahlen Sie den Beitrag Ihrer Versicherung, und der Arbeitgeber gibt einen Zuschuss.",
    },
    {
      pregunta: "Was passiert bei Weihnachts- oder Urlaubsgeld?",
      respuesta: "Einmalzahlungen werden als sonstige Bezüge anders besteuert. Dieser Rechner zeigt das laufende Monatsgehalt.",
    },
  ],
  glosario: [
    { termino: "Vorsorgepauschale", definicion: "Pauschaler Abzug für Ihre Beiträge zur Renten-, Kranken-, Pflege- und Arbeitslosenversicherung beim Lohnsteuerabzug." },
    { termino: "Beitragsbemessungsgrenze", definicion: "Höchstes Gehalt, auf das Sozialbeiträge erhoben werden. Darüber steigen die Beiträge nicht mehr." },
    { termino: "Übergangsbereich", definicion: "Monatslöhne über der Minijob-Grenze bis {{de.uebergangsbereich-obergrenze}}, in denen Ihre Sozialabgaben gemindert sind (Midijob)." },
  ],
});
