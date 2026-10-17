import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/maaltijdcheques-berekenen";

export default definirTextos(base, {
  calculadora: "be-fr.maaltijdcheques-berekenen",
  slug: "calcul-cheques-repas",
  campos: {
    dagen: { etiqueta: "Jours travaillés ce mois-ci" },
    werkgever: { etiqueta: "Intervention de votre employeur par chèque" },
    werknemer: { etiqueta: "Votre intervention par chèque" },
  },
  filas: {
    voordeel: { etiqueta: "Votre avantage ce mois-ci (part de l'employeur)" },
    waarde: { etiqueta: "Valeur d'un chèque-repas" },
    totaal: { etiqueta: "Total sur votre carte chèques-repas" },
    inhouding: { etiqueta: "Votre propre intervention" },
  },
  mensajes: {
    "De bijdrage van de werkgever ligt boven het wettelijke maximum.": "L'intervention de l'employeur dépasse le maximum légal.",
    "Jouw bijdrage ligt onder het wettelijke minimum.": "Votre intervention est inférieure au minimum légal.",
    "Je krijgt één maaltijdcheque per dag dat je effectief gewerkt hebt. Het deel van je werkgever is vrij van sociale bijdragen en belastingen als aan alle voorwaarden voldaan is.":
      "Vous recevez un chèque-repas par jour effectivement presté. La part de votre employeur est exonérée de cotisations sociales et d'impôts si toutes les conditions sont remplies.",
  },
});
