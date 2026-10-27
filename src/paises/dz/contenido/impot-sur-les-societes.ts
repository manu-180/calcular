import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.impot-sur-les-societes",
  h1: "Calcul de l'IBS en Algérie",
  title: "Calcul IBS Algérie 2026 : taux de {{dz.ibs[production]}}, {{dz.ibs[btph-tourisme]}}, {{dz.ibs[autres]}}",
  description:
    "Calculez l'impôt sur les bénéfices des sociétés en Algérie selon l'activité : {{dz.ibs[production]}}, {{dz.ibs[btph-tourisme]}} ou {{dz.ibs[autres]}}, et {{dz.ibs-reinvesti}} sur les bénéfices réinvestis.",
  intro: [
    "L'impôt sur les bénéfices des sociétés (IBS) frappe les bénéfices des sociétés de capitaux et des personnes morales qui y sont soumises. Son taux dépend de l'activité, selon l'article 150 du code des impôts directs et taxes assimilées.",
    "Indiquez le bénéfice imposable de l'exercice, l'activité et, le cas échéant, la part réinvestie.",
  ],
  comoSeCalcula: [
    "{{dz.ibs[production]}} pour les activités de production de biens.",
    "{{dz.ibs[btph-tourisme]}} pour le bâtiment, les travaux publics et l'hydraulique, ainsi que les activités touristiques et thermales, agences de voyages exclues.",
    "{{dz.ibs[autres]}} pour les autres activités.",
    "Les bénéfices réinvestis dans les conditions de l'article 142 bis sont soumis au taux réduit de {{dz.ibs-reinvesti}}.",
  ],
  faq: [
    {
      pregunta: "Qu'entend-on par activités de production de biens ?",
      respuesta:
        "L'extraction, la fabrication, le façonnage ou la transformation de produits. Le conditionnement ou la présentation commerciale en vue de la revente n'en font pas partie, ni les activités minières et d'hydrocarbures.",
    },
    {
      pregunta: "Que se passe-t-il si l'entreprise exerce plusieurs activités ?",
      respuesta:
        "Le bénéfice imposable à chaque taux est déterminé selon la part du chiffre d'affaires de chaque activité. Faites un calcul par activité avec la part de bénéfice correspondante.",
    },
    {
      pregunta: "Les entrepreneurs individuels paient-ils l'IBS ?",
      respuesta: "Non. Les personnes physiques relèvent de l'IRG ou, sous le plafond de chiffre d'affaires, de l'impôt forfaitaire unique.",
    },
  ],
  glosario: [
    { termino: "IBS", definicion: "Impôt sur les bénéfices des sociétés." },
    { termino: "BTPH", definicion: "Bâtiment, travaux publics et hydraulique." },
  ],
});
