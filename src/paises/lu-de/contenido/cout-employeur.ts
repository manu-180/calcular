import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.cout-employeur",
  h1: "Arbeitgeberkosten in Luxemburg berechnen",
  title: "Arbeitgeberkosten Luxemburg {{anio}}: Lohnnebenkosten",
  description: "Was ein Lohn den Arbeitgeber in Luxemburg kostet: Kranken-, Renten- und Unfallversicherung, Arbeitsmedizin und Mutualität der Arbeitgeber nach den Sätzen {{anio}}.",
  intro: [
    "Zum Bruttolohn kommen die Arbeitgeberbeiträge: die Hälfte der Kranken- und Rentenversicherung, die Unfallversicherung, die Arbeitsmedizin und die Mutualität der Arbeitgeber.",
    "Der Satz der Mutualität hängt von der Klasse des Unternehmens ab. Wählen Sie Ihre Klasse.",
  ],
  comoSeCalcula: [
    "Krankenversicherung: die Hälfte von {{lu.cotisation-maladie-soins}} und {{lu.cotisation-maladie-especes}}. Rentenversicherung: die Hälfte von {{lu.cotisation-pension}}.",
    "Unfallversicherung {{lu.cotisation-accident}}, Arbeitsmedizin {{lu.cotisation-sante-travail}} und Mutualität nach Klasse, ganz zulasten des Arbeitgebers.",
    "Alle diese Beiträge enden bei der Beitragsbemessungsgrenze von {{lu.plafond-cotisable}} pro Monat.",
  ],
  ejemplo: [
    "Ein Lohn von 5.000 Euro kostet einen Arbeitgeber in Klasse 2 der Mutualität 5.664,50 Euro im Monat.",
  ],
  faq: [
    { pregunta: "Hat die Unfallversicherung einen Einheitssatz?", respuesta: "Ja, er wird aber mit einem Bonus-Malus-Faktor des Unternehmens multipliziert. Der Rechner verwendet den Einheitssatz." },
    { pregunta: "Zahlt der Arbeitgeber die Pflegeversicherung?", respuesta: "Nein. Die Pflegeversicherung trägt ganz der Arbeitnehmer." },
    { pregunta: "Was fehlt in dieser Berechnung?", respuesta: "Sachbezüge, Prämien und Kosten aus einem Kollektivvertrag. Prüfen Sie diese in Ihren Verträgen." },
  ],
  glosario: [
    { termino: "Mutualität der Arbeitgeber", definicion: "System, das Arbeitgebern einen Teil der Löhne bei Krankheit erstattet, finanziert durch Beiträge nach Klassen." },
  ],
});
