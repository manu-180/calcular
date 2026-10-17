import { definirTextos } from "@/motor/edicion";
import vaterschaftsentschaedigungRechner from "../../ch/calculadoras/vaterschaftsentschaedigung-rechner";
import { COMUN, ERWERBSART } from "../lib/comun";

export default definirTextos(vaterschaftsentschaedigungRechner, {
  calculadora: "ch-it.vaterschaftsentschaedigung-rechner",
  slug: "congedo-di-paternita",
  campos: {
    art: { etiqueta: "Attività lucrativa", opciones: ERWERBSART },
    einkommen: { etiqueta: "Reddito prima della nascita (salario mensile o reddito annuo)" },
  },
  filas: {
    taggeld: { etiqueta: "Indennità giornaliera" },
    total: { etiqueta: "Indennità totale" },
    tage: { etiqueta: "Numero di indennità giornaliere" },
    tagesverdienst: { etiqueta: "Reddito medio al giorno" },
    ungekuerzt: { etiqueta: "Indennità prima di una riduzione" },
  },
  ...COMUN,
});
