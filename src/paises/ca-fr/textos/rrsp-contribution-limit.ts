import { definirTextos } from "@/motor/edicion";
import rrsp from "../../ca/calculadoras/rrsp-contribution-limit";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(rrsp, {
  calculadora: "ca-fr.rrsp-contribution-limit",
  slug: "plafond-cotisation-reer",
  campos: {
    ingreso: { etiqueta: "Revenu gagné l'an dernier", ayuda: "Si vous aviez seulement un emploi, c'est habituellement votre salaire." },
    pa: { etiqueta: "Facteur d'équivalence de l'an dernier" },
    noUsado: { etiqueta: "Droits de cotisation inutilisés reportés", ayuda: "Ils figurent sur votre dernier avis de cotisation." },
    aportado: { etiqueta: "Cotisations déjà versées pour cette année" },
  },
  filas: {
    total: { etiqueta: "Votre maximum déductible au titre des REER cette année" },
    restante: { etiqueta: "Droits qui restent après vos cotisations" },
    nuevo: { etiqueta: "Nouveaux droits gagnés avec le revenu de l'an dernier" },
    porIngreso: { etiqueta: "Droits selon le revenu gagné de l'an dernier, avant le plafond" },
    limite: { etiqueta: "Plafond en dollars de cette année" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Your income is high enough that the yearly dollar limit caps your new room.":
      "Votre revenu est assez élevé pour que le plafond annuel en dollars limite vos nouveaux droits.",
    "You are over your limit. Excess contributions above a $2,000 cushion are taxed at 1% a month until you withdraw them.":
      "Vous dépassez votre plafond. L'excédent de plus de 2 000 $ est imposé à 1 % par mois jusqu'à ce que vous le retiriez.",
  },
});
