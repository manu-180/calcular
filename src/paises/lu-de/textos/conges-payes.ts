import { definirTextos } from "@/motor/edicion";
import congesPayes from "../../lu/calculadoras/conges-payes";
import { COMUN } from "../lib/comun";

export default definirTextos(congesPayes, {
  calculadora: "lu-de.conges-payes",
  slug: "urlaubsrechner",
  campos: {
    mois: { etiqueta: "Volle Arbeitsmonate im Jahr" },
    contrat: { etiqueta: "Urlaubstage laut Vertrag (wenn er mehr vorsieht)" },
    brut: { etiqueta: "Monatlicher Bruttolohn" },
    heuresJour: { etiqueta: "Arbeitsstunden pro Tag" },
  },
  filas: {
    jours: { etiqueta: "Erworbene Urlaubstage" },
    annuel: { etiqueta: "Urlaubstage für ein volles Jahr" },
    indemniteJour: { etiqueta: "Urlaubsentgelt pro Tag" },
    indemnite: { etiqueta: "Urlaubsentgelt für die erworbenen Tage" },
  },
  ...COMUN,
});
