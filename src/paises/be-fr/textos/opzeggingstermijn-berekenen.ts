import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/opzeggingstermijn-berekenen";
import { datumFr, duurFr } from "../lib/fr";

export default definirTextos(base, {
  calculadora: "be-fr.opzeggingstermijn-berekenen",
  slug: "calcul-preavis",
  campos: {
    wie: {
      etiqueta: "Qui donne le congé ?",
      opciones: {
        werkgever: "L'employeur me licencie",
        werknemer: "Je démissionne",
        tegenopzegging: "J'ai été licencié et j'ai trouvé un autre emploi (contre-préavis)",
      },
    },
    indienst: { etiqueta: "Date d'entrée en service" },
    kennisgeving: { etiqueta: "Date à laquelle le préavis est notifié" },
    maandloon: { etiqueta: "Salaire mensuel brut (pour l'indemnité)" },
  },
  filas: {
    weken: { etiqueta: "Délai de préavis en semaines" },
    ancienniteit: { etiqueta: "Ancienneté au début du préavis" },
    start: { etiqueta: "Le préavis prend cours le" },
    einde: { etiqueta: "Dernier jour" },
    vergoeding: { etiqueta: "Salaire brut pour la durée du préavis (estimation, sans avantages)" },
  },
  mensajes: {
    "De opzegging kan niet vóór de indiensttreding liggen.": "Le préavis ne peut pas être antérieur à l'entrée en service.",
    "De opzeggingstermijn start op de maandag na de week waarin de opzegging ter kennis werd gegeven. Hoe en wanneer de kennisgeving geldt, hangt af van de manier waarop ze gebeurt.":
      "Le délai de préavis prend cours le lundi suivant la semaine pendant laquelle le préavis a été notifié. Le moment où la notification produit ses effets dépend de la manière dont elle est faite.",
  },
  traducir: (texto) => datumFr(texto) ?? duurFr(texto),
});
