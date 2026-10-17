import { definirTextos } from "@/motor/edicion";
import verzugszinsrechner from "../../ch/calculadoras/verzugszinsrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(verzugszinsrechner, {
  calculadora: "ch-it.verzugszinsrechner",
  slug: "interessi-di-mora",
  campos: {
    betrag: { etiqueta: "Importo dovuto" },
    von: { etiqueta: "In mora dal (per esempio il giorno dopo la scadenza)" },
    bis: { etiqueta: "Fino al" },
    satz: { etiqueta: "Tasso contrattuale (se più alto)", ayuda: "Lascia vuoto: vale l'interesse di mora legale." },
    basis: { etiqueta: "Giorni d'interesse all'anno", opciones: { "365": "365 giorni", "360": "360 giorni" } },
  },
  filas: {
    zins: { etiqueta: "Interesse di mora" },
    total: { etiqueta: "Importo con interesse di mora" },
    tage: { etiqueta: "Giorni di mora" },
    satz: { etiqueta: "Tasso d'interesse annuo" },
  },
  ...COMUN,
});
