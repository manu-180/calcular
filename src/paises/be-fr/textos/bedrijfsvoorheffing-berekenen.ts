import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/bedrijfsvoorheffing-berekenen";
import { GEZIN } from "../lib/fr";

export default definirTextos(base, {
  calculadora: "be-fr.bedrijfsvoorheffing-berekenen",
  slug: "calcul-precompte-professionnel",
  campos: {
    belastbaar: {
      etiqueta: "Salaire mensuel imposable (brut moins ONSS)",
      ayuda: "Votre salaire brut moins vos cotisations personnelles ONSS. Vous le trouvez sur votre fiche de paie.",
    },
    gezin: { etiqueta: "Situation familiale", opciones: GEZIN },
    kinderen: { etiqueta: "Enfants à charge", ayuda: "Un enfant handicapé compte pour deux." },
    alleenstaandeOuder: { etiqueta: "Vous élevez seul vos enfants" },
  },
  filas: {
    perMaand: { etiqueta: "Précompte professionnel par mois" },
    brutoJaar: { etiqueta: "Salaire imposable sur base annuelle" },
    beroepskosten: { etiqueta: "Moins : frais professionnels forfaitaires" },
    belastbaarJaar: { etiqueta: "Revenu annuel net imposable" },
    basisbelasting: { etiqueta: "Impôt de base après quotité exemptée" },
    kinderen: { etiqueta: "Moins : réduction pour enfants à charge" },
    andereLasten: { etiqueta: "Moins : réduction parent isolé" },
    jaarbelasting: { etiqueta: "Impôt annuel" },
    gemiddeld: { etiqueta: "Précompte en pourcentage de votre salaire imposable" },
  },
  mensajes: {
    "Vul een belastbaar loon boven nul in.": "Indiquez un salaire imposable supérieur à zéro.",
    "Heb je recht op de werkbonus, dan gaat er nog een fiscale werkbonus af. Die zit in de bruto-nettoberekening.":
      "Si vous avez droit au bonus à l'emploi, un bonus à l'emploi fiscal est encore déduit. Il est repris dans le calcul du salaire brut en net.",
    "De bedrijfsvoorheffing is een voorschot. Je definitieve personenbelasting volgt uit je belastingaangifte.":
      "Le précompte professionnel est une avance. Votre impôt des personnes physiques définitif découle de votre déclaration.",
  },
});
