import { definirTextos } from "@/motor/edicion";
import saeule3aRechner from "../../ch/calculadoras/saeule-3a-rechner";
import { COMUN, ZIVILSTAND } from "../lib/comun";

export default definirTextos(saeule3aRechner, {
  calculadora: "ch-fr.saeule-3a-rechner",
  slug: "pilier-3a",
  campos: {
    mitPk: { etiqueta: "Je suis assuré dans une caisse de pension" },
    erwerbseinkommen: { etiqueta: "Revenu annuel de l'activité lucrative (seulement sans caisse de pension)" },
    beitrag: { etiqueta: "Versement prévu dans le pilier 3a", ayuda: "Laissez vide : le calculateur retient le maximum." },
    steuerbar: { etiqueta: "Revenu imposable avant le versement (impôt fédéral direct)" },
    zivilstand: { etiqueta: "État civil", opciones: ZIVILSTAND },
    kinder: { etiqueta: "Enfants dans le même ménage" },
  },
  filas: {
    maximum: { etiqueta: "Versement maximal cette année" },
    abziehbar: { etiqueta: "Versement déductible" },
    ersparnis: { etiqueta: "Économie d'impôt fédéral direct" },
    vorher: { etiqueta: "Impôt fédéral sans versement" },
    nachher: { etiqueta: "Impôt fédéral avec versement" },
  },
  ...COMUN,
});
