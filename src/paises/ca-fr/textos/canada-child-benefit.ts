import { definirTextos } from "@/motor/edicion";
import ccb from "../../ca/calculadoras/canada-child-benefit";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(ccb, {
  calculadora: "ca-fr.canada-child-benefit",
  slug: "calcul-allocation-canadienne-pour-enfants",
  campos: {
    menores6: { etiqueta: "Enfants de moins de 6 ans" },
    de6a17: { etiqueta: "Enfants de 6 à 17 ans" },
    ingreso: { etiqueta: "Revenu familial net rajusté de 2025", ayuda: "La ligne 23600 de votre déclaration, plus celle de votre époux ou conjoint de fait, s'il y a lieu." },
    compartida: { etiqueta: "Vous avez la garde partagée" },
  },
  filas: {
    anual: { etiqueta: "ACE de juillet 2026 à juin 2027" },
    mensual: { etiqueta: "Environ par mois" },
    maximo: { etiqueta: "Maximum avant la réduction selon le revenu" },
    reduccion: { etiqueta: "Réduction selon votre revenu" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Enter at least one child.": "Inscrivez au moins un enfant.",
    "With shared custody each parent gets half of what they would get with full custody, based on their own family income.":
      "En garde partagée, chaque parent reçoit la moitié de ce qu'il recevrait avec la garde complète, selon son propre revenu familial.",
  },
});
