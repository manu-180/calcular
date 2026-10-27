import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "de.steuerklassen-rechner",
  h1: "Steuerklassenrechner für Ehepaare",
  title: "Steuerklassenrechner {{anio}}: III/V oder IV/IV?",
  description:
    "Vergleichen Sie das gemeinsame Monatsnetto mit den Steuerklassen III/V, V/III und IV/IV. Mit Lohnsteuer {{anio}}, Soli, Kirchensteuer und Sozialabgaben.",
  intro: [
    "Verheiratete und eingetragene Lebenspartner können ihre Steuerklassen wählen. Die Wahl entscheidet, wie viel jeden Monat netto ankommt.",
    "Tragen Sie beide Bruttogehälter ein. Der Rechner zeigt das gemeinsame Netto für jede Kombination und welche am meisten bringt.",
  ],
  comoSeCalcula: [
    "Für jedes Gehalt werden Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und Sozialabgaben in der jeweiligen Klasse berechnet.",
    "In Klasse III liegt der doppelte Grundfreibetrag, in Klasse V gar keiner. Deshalb lohnt sich III/V meist, wenn ein Partner deutlich mehr verdient.",
    "Die Netto-Beträge beider Partner werden addiert und verglichen.",
  ],
  ejemplo: ["Verdient nur ein Partner 4.000 Euro brutto, bleiben mit Klasse III 2.928,17 Euro netto, mit Klasse IV nur 2.605,50 Euro. Das sind 322,67 Euro mehr im Monat."],
  faq: [
    {
      pregunta: "Zahlen wir mit III/V am Ende weniger Steuern?",
      respuesta: "Nein. Die Jahressteuer hängt vom gemeinsamen Einkommen ab, nicht von der Klasse. III/V verschiebt nur, wie viel unterjährig einbehalten wird. Die Steuererklärung gleicht es aus.",
    },
    {
      pregunta: "Was ist das Faktorverfahren?",
      respuesta: "Eine Variante von IV/IV, bei der das Finanzamt einen Faktor einträgt. Die Lohnsteuer verteilt sich dann genauer nach den Gehältern, und Nachzahlungen werden seltener.",
    },
    {
      pregunta: "Wie wechsle ich die Steuerklasse?",
      respuesta: "Mit einem Antrag beim Finanzamt, auch online über ELSTER. Der Wechsel gilt ab dem Folgemonat.",
    },
  ],
  glosario: [
    { termino: "Splittingtarif", definicion: "Das gemeinsame Einkommen wird halbiert, besteuert und die Steuer verdoppelt. Klasse III bildet das beim Lohnsteuerabzug nach." },
    { termino: "Pflichtveranlagung", definicion: "Wer III/V wählt, muss eine Steuererklärung abgeben." },
  ],
});
