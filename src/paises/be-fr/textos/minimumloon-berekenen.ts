import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/minimumloon-berekenen";

export default definirTextos(base, {
  calculadora: "be-fr.minimumloon-berekenen",
  slug: "salaire-minimum-belgique",
  campos: {
    voltijds: { etiqueta: "Heures par semaine d'un temps plein dans votre secteur" },
    uren: { etiqueta: "Vos heures par semaine" },
    loon: { etiqueta: "Votre salaire mensuel brut (pour comparer)" },
  },
  filas: {
    perMaand: { etiqueta: "Salaire mensuel brut minimum pour vos heures" },
    voltijdsMaand: { etiqueta: "Minimum pour un temps plein" },
    perUur: { etiqueta: "Converti par heure" },
    perJaar: { etiqueta: "Par an (12 mois, sans pécule de vacances ni prime de fin d'année)" },
    verschil: { etiqueta: "Différence avec votre salaire" },
  },
  mensajes: {
    "Je uren kunnen niet hoger zijn dan een voltijdse week.": "Vos heures ne peuvent pas dépasser une semaine à temps plein.",
    "Je loon ligt onder het minimum. Kijk ook naar het minimumloon van je paritair comité, want je sector kan een hoger minimum hebben.":
      "Votre salaire est inférieur au minimum. Vérifiez aussi le salaire minimum de votre commission paritaire, car votre secteur peut avoir un minimum plus élevé.",
  },
});
