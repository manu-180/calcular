import { definirTextos } from "@/motor/edicion";
import mwstRechner from "../../ch/calculadoras/mwst-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(mwstRechner, {
  calculadora: "ch-it.mwst-rechner",
  slug: "calcolo-iva",
  campos: {
    betrag: { etiqueta: "Importo in franchi" },
    richtung: { etiqueta: "Che cosa vuoi calcolare?", opciones: { "zuschlagen": "Aggiungere l'IVA (importo senza IVA)", "herausrechnen": "Scorporare l'IVA (importo IVA inclusa)" } },
    satz: { etiqueta: "Aliquota", opciones: { "normal": "Aliquota normale", "reduziert": "Aliquota ridotta (per esempio alimenti, medicamenti, libri)", "beherbergung": "Aliquota speciale per l'alloggio (pernottamento con colazione)" } },
  },
  filas: {
    mwst: { etiqueta: "IVA" },
    netto: { etiqueta: "Importo senza IVA" },
    brutto: { etiqueta: "Importo IVA inclusa" },
    satz: { etiqueta: "Aliquota" },
  },
  ...COMUN,
});
