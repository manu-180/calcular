import { definirTextos } from "@/motor/edicion";
import tfsa from "../../ca/calculadoras/tfsa-contribution-room";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(tfsa, {
  calculadora: "ca-fr.tfsa-contribution-room",
  slug: "droits-cotisation-celi",
  campos: {
    desde: { etiqueta: "Année de vos 18 ans (ou de votre arrivée comme résident, si c'est plus tard)" },
    aportes: { etiqueta: "Total des cotisations versées depuis" },
    retiros: { etiqueta: "Total des retraits faits avant cette année" },
  },
  filas: {
    espacio: { etiqueta: "Droits de cotisation au CELI disponibles aujourd'hui" },
    acumulado: { etiqueta: "Total des plafonds annuels depuis votre admissibilité" },
    anual: { etiqueta: "Plafond de cette année" },
    anios: { etiqueta: "Années comptées" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "That year is still to come.": "Cette année n'est pas encore arrivée.",
    "Your contributions are above your room. Check your TFSA room statement in CRA My Account before you add more.":
      "Vos cotisations dépassent vos droits. Vérifiez votre relevé des droits de cotisation au CELI dans Mon dossier de l'ARC avant de cotiser de nouveau.",
  },
});
