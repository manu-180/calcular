import { definirTextos } from "@/motor/edicion";
import nettoBruttoRechner from "../../ch/calculadoras/netto-brutto-rechner";
import { ANZAHL, COMUN } from "../lib/comun";

export default definirTextos(nettoBruttoRechner, {
  calculadora: "ch-fr.netto-brutto-rechner",
  slug: "salaire-net-en-brut",
  campos: {
    netto: { etiqueta: "Salaire net mensuel souhaité" },
    anzahl: { etiqueta: "Nombre de salaires mensuels par an", opciones: ANZAHL },
    alter: { etiqueta: "Âge (année civile moins année de naissance)" },
    nbu: { etiqueta: "Prime d'assurance accidents non professionnels (ANP)" },
    ktg: { etiqueta: "Cotisation perte de gain maladie (si déduite)" },
  },
  filas: {
    brutto: { etiqueta: "Salaire brut mensuel nécessaire" },
    netto: { etiqueta: "Salaire net avec ce brut" },
    abzuege: { etiqueta: "Déductions par mois" },
    jahreslohn: { etiqueta: "Salaire brut annuel" },
  },
  ...COMUN,
});
