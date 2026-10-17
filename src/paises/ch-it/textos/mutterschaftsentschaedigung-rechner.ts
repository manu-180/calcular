import { definirTextos } from "@/motor/edicion";
import mutterschaftsentschaedigungRechner from "../../ch/calculadoras/mutterschaftsentschaedigung-rechner";
import { COMUN, ERWERBSART } from "../lib/comun";

export default definirTextos(mutterschaftsentschaedigungRechner, {
  calculadora: "ch-it.mutterschaftsentschaedigung-rechner",
  slug: "indennita-di-maternita",
  campos: {
    art: { etiqueta: "Attività lucrativa", opciones: ERWERBSART },
    einkommen: { etiqueta: "Reddito prima del parto (salario mensile o reddito annuo)" },
  },
  filas: {
    taggeld: { etiqueta: "Indennità giornaliera" },
    total: { etiqueta: "Indennità di maternità totale" },
    tage: { etiqueta: "Numero di indennità giornaliere" },
    tagesverdienst: { etiqueta: "Reddito medio al giorno" },
    ungekuerzt: { etiqueta: "Indennità prima di una riduzione" },
  },
  ...COMUN,
});
