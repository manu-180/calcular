import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu-de.cotisations-sociales",
  h1: "Sozialversicherungsbeiträge des Arbeitnehmers in Luxemburg",
  title: "Sozialversicherungsbeiträge Luxemburg {{anio}}",
  description: "Sozialversicherungsbeiträge {{anio}} des Arbeitnehmers in Luxemburg: Kranken-, Renten- und Pflegeversicherung mit der Beitragsbemessungsgrenze von {{lu.plafond-cotisable}}.",
  intro: [
    "Der Arbeitnehmer zahlt die Hälfte der Kranken- und Rentenversicherung und die ganze Pflegeversicherung. 2026 steigt der Rentenbeitrag auf insgesamt {{lu.cotisation-pension}}.",
    "Der Rechner zeigt die Beiträge pro Monat und für zwölf Monate.",
  ],
  comoSeCalcula: [
    "Krankenversicherung: (Sachleistungen {{lu.cotisation-maladie-soins}} + Geldleistungen {{lu.cotisation-maladie-especes}}) / 2.",
    "Rentenversicherung: {{lu.cotisation-pension}} / 2. Kranken- und Rentenversicherung gehen nicht über die Beitragsbemessungsgrenze von {{lu.plafond-cotisable}} pro Monat.",
    "Pflegeversicherung: {{lu.cotisation-dependance}} des Lohns, ohne Obergrenze, nach einem Freibetrag von {{lu.abattement-dependance}}.",
  ],
  ejemplo: [
    "Bei 5.000 Euro brutto zahlt der Arbeitnehmer 152,50 Euro Krankenversicherung, 425 Euro Rentenversicherung und 60,30 Euro Pflegeversicherung, zusammen 637,80 Euro im Monat.",
  ],
  faq: [
    { pregunta: "Was ist die Beitragsbemessungsgrenze?", respuesta: "Die Obergrenze der Bemessungsgrundlage, das Fünffache des sozialen Mindestlohns. Darüber fallen keine Kranken- und Rentenbeiträge an." },
    { pregunta: "Ist die Pflegeversicherung gedeckelt?", respuesta: "Nein. Sie gilt für den ganzen Lohn, abzüglich eines Freibetrags von einem Viertel des sozialen Mindestlohns." },
    { pregunta: "Wer zahlt die Unfallversicherung?", respuesta: "Der Arbeitgeber. Er zahlt auch die Arbeitsmedizin und die Mutualität der Arbeitgeber." },
  ],
  glosario: [
    { termino: "Bemessungsgrundlage", definicion: "Betrag des Lohns, auf den die Beiträge berechnet werden." },
    { termino: "CCSS", definicion: "Centre commun de la sécurité sociale, das die Beiträge erhebt." },
  ],
});
