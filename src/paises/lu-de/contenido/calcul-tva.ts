import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.calcul-tva",
  h1: "Mehrwertsteuer in Luxemburg berechnen: 17, 14, 8 und 3 %",
  title: "Mehrwertsteuerrechner Luxemburg: hinzu- und herausrechnen",
  description: "Luxemburgische Mehrwertsteuer zum Normalsatz von {{lu.tva-normal}}, Zwischensatz von {{lu.tva-intermediaire}}, ermäßigten Satz von {{lu.tva-reduit}} oder {{lu.tva-super-reduit}}.",
  intro: [
    "In Luxemburg beträgt die Mehrwertsteuer {{lu.tva-normal}} zum Normalsatz. Es gibt außerdem einen Zwischensatz von {{lu.tva-intermediaire}}, einen ermäßigten Satz von {{lu.tva-reduit}} und einen stark ermäßigten Satz von {{lu.tva-super-reduit}}.",
    "Mit dem Rechner rechnen Sie die Mehrwertsteuer zu einem Betrag hinzu oder aus einem Bruttopreis heraus.",
  ],
  comoSeCalcula: [
    "Hinzurechnen: Betrag mal Steuersatz ergibt die Mehrwertsteuer.",
    "Herausrechnen: Bruttopreis geteilt durch 1,17 (oder 1,14, 1,08 und 1,03) ergibt den Nettobetrag.",
  ],
  ejemplo: [
    "Eine Rechnung über 1.000 Euro netto kostet zum Normalsatz 1.170 Euro.",
  ],
  faq: [
    { pregunta: "Welche Waren fallen unter die ermäßigten Sätze?", respuesta: "Die in den Anhängen A (ermäßigter Satz), B (stark ermäßigter Satz) und C (Zwischensatz) des Mehrwertsteuergesetzes aufgeführten. Alle anderen Umsätze fallen unter den Normalsatz." },
    { pregunta: "Gilt die Senkung von 2023 noch?", respuesta: "Nein. Sie galt vom 1. Januar bis 31. Dezember 2023. Seitdem gelten wieder 17, 14 und 8 %." },
    { pregunta: "Wer erhebt die Mehrwertsteuer?", respuesta: "Die Registrierungs-, Domänen- und Mehrwertsteuerverwaltung (AED)." },
  ],
  glosario: [
    { termino: "AED", definicion: "Administration de l'enregistrement, des domaines et de la TVA, die Mehrwertsteuerverwaltung." },
  ],
});
