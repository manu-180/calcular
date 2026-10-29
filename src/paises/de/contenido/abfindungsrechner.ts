import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.abfindungsrechner",
  h1: "Abfindungsrechner mit Fünftelregelung",
  title: "Abfindungsrechner {{anio}}: Höhe und Steuer mit Fünftelregelung",
  description:
    "Berechnen Sie Ihre Abfindung nach der Faustformel von einem halben Monatsgehalt pro Jahr und die Einkommensteuer darauf mit und ohne Fünftelregelung.",
  intro: [
    "Ein allgemeines Recht auf Abfindung gibt es in Deutschland nicht. Bei betriebsbedingter Kündigung kann der Arbeitgeber aber nach § 1a KSchG eine Abfindung anbieten, wenn Sie auf eine Klage verzichten. Dann beträgt sie {{de.abfindung-faktor}} Monatsverdienste pro Jahr.",
    "Diese Formel ist auch bei Vergleichen und Aufhebungsverträgen der übliche Ausgangspunkt. Der Rechner zeigt außerdem, wie viel Einkommensteuer die Fünftelregelung spart.",
  ],
  comoSeCalcula: [
    "Abfindung = Monatsverdienst × {{de.abfindung-faktor}} × Jahre im Betrieb. Mehr als sechs Monate zählen als volles Jahr.",
    "Fünftelregelung (§ 34 EStG): Ein Fünftel der Abfindung wird zum übrigen Einkommen addiert, die Mehrsteuer darauf wird mit fünf multipliziert.",
    "Ohne Fünftelregelung würde die ganze Abfindung auf einmal zum Einkommen addiert. Die Differenz ist Ihre Ersparnis.",
    "Am meisten spart, wer im Auszahlungsjahr sonst wenig verdient.",
  ],
  ejemplo: ["Nach zehn Jahren mit 4.000 Euro Monatsgehalt beträgt die Abfindung 20.000 Euro. Bei 50.000 Euro übrigem Einkommen kostet sie mit Fünftelregelung 7.160 Euro Einkommensteuer statt 7.716 Euro."],
  faq: [
    {
      pregunta: "Habe ich Anspruch auf eine Abfindung?",
      respuesta: "Nur in bestimmten Fällen: beim Angebot nach § 1a KSchG, aus einem Sozialplan, einem Tarifvertrag oder wenn das Arbeitsgericht das Arbeitsverhältnis gegen Abfindung auflöst. Meist wird sie ausgehandelt.",
    },
    {
      pregunta: "Muss ich auf die Abfindung Sozialabgaben zahlen?",
      respuesta: "In der Regel nicht, wenn sie den Verlust des Arbeitsplatzes entschädigt und nicht verdienten Lohn nachzahlt. Einkommensteuer fällt dagegen an.",
    },
    {
      pregunta: "Wie bekomme ich die Fünftelregelung?",
      respuesta: "Das Finanzamt wendet sie mit Ihrer Steuererklärung an. Geben Sie die Abfindung dort als außerordentliche Einkünfte an.",
    },
  ],
  glosario: [
    { termino: "Monatsverdienst", definicion: "Was Ihnen im letzten Monat an Geld und Sachbezügen bei regelmäßiger Arbeitszeit zusteht (§ 10 Absatz 3 KSchG)." },
    { termino: "Fünftelregelung", definicion: "Steuerermäßigung für außerordentliche Einkünfte wie Abfindungen nach § 34 EStG." },
  ],
});
