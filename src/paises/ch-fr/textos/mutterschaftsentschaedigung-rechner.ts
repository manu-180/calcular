import { definirTextos } from "@/motor/edicion";
import mutterschaftsentschaedigungRechner from "../../ch/calculadoras/mutterschaftsentschaedigung-rechner";
import { COMUN, ERWERBSART } from "../lib/comun";

export default definirTextos(mutterschaftsentschaedigungRechner, {
  calculadora: "ch-fr.mutterschaftsentschaedigung-rechner",
  slug: "allocation-maternite",
  campos: {
    art: { etiqueta: "Statut professionnel", opciones: ERWERBSART },
    einkommen: { etiqueta: "Revenu avant la naissance (salaire mensuel ou revenu annuel)" },
  },
  filas: {
    taggeld: { etiqueta: "Indemnité journalière" },
    total: { etiqueta: "Allocation de maternité totale" },
    tage: { etiqueta: "Nombre d'indemnités journalières" },
    tagesverdienst: { etiqueta: "Revenu moyen par jour" },
    ungekuerzt: { etiqueta: "Indemnité avant réduction" },
  },
  ...COMUN,
});
