import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/sociale-bijdragen-zelfstandige";

export default definirTextos(base, {
  calculadora: "be-fr.sociale-bijdragen-zelfstandige",
  slug: "cotisations-sociales-independant",
  campos: {
    inkomen: {
      etiqueta: "Revenu professionnel net imposable par an",
      ayuda: "Votre bénéfice ou vos profits après déduction des frais professionnels, avant impôts. Les cotisations sociales elles-mêmes ne comptent pas.",
    },
    statuut: {
      etiqueta: "Statut",
      opciones: { hoofdberoep: "Indépendant à titre principal", bijberoep: "Indépendant à titre complémentaire" },
    },
    primostarter: { etiqueta: "Vous êtes primo-starter (vos premiers trimestres comme indépendant à titre principal)" },
  },
  filas: {
    perKwartaal: { etiqueta: "Cotisation sociale par trimestre" },
    perJaar: { etiqueta: "Par an" },
    basis: { etiqueta: "Revenu sur lequel la cotisation est calculée" },
  },
  mensajes: {
    "Bedragen zonder de beheerskosten van je sociaal verzekeringsfonds, die er nog bovenop komen.":
      "Montants hors frais de gestion de votre caisse d'assurances sociales, qui s'y ajoutent.",
    "Je inkomen ligt onder het minimum. Je betaalt de minimumbijdrage.": "Votre revenu est inférieur au minimum. Vous payez la cotisation minimale.",
    "Je inkomen ligt onder de drempel voor een bijberoep. Je betaalt geen sociale bijdragen.":
      "Votre revenu est inférieur au seuil pour une activité complémentaire. Vous ne payez pas de cotisations sociales.",
    "Boven het tweede grensbedrag betaal je geen extra bijdragen meer.": "Au-delà du second plafond, vous ne payez plus de cotisations supplémentaires.",
  },
});
