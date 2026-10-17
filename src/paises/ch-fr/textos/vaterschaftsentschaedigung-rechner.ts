import { definirTextos } from "@/motor/edicion";
import vaterschaftsentschaedigungRechner from "../../ch/calculadoras/vaterschaftsentschaedigung-rechner";
import { COMUN, ERWERBSART } from "../lib/comun";

export default definirTextos(vaterschaftsentschaedigungRechner, {
  calculadora: "ch-fr.vaterschaftsentschaedigung-rechner",
  slug: "conge-paternite",
  campos: {
    art: { etiqueta: "Statut professionnel", opciones: ERWERBSART },
    einkommen: { etiqueta: "Revenu avant la naissance (salaire mensuel ou revenu annuel)" },
  },
  filas: {
    taggeld: { etiqueta: "Indemnité journalière" },
    total: { etiqueta: "Allocation totale" },
    tage: { etiqueta: "Nombre d'indemnités journalières" },
    tagesverdienst: { etiqueta: "Revenu moyen par jour" },
    ungekuerzt: { etiqueta: "Indemnité avant réduction" },
  },
  ...COMUN,
});
