import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/convertisseur-euro-fcfa";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.convertisseur-euro-fcfa",
  slug: "euro-to-cfa-franc",
  campos: {
    sens: { etiqueta: "Conversion", opciones: { "eur-xaf": "Euros to CFA francs", "xaf-eur": "CFA francs to euros" } },
    montant: { etiqueta: "Amount to convert" },
  },
  filas: {
    francs: { etiqueta: "Amount in CFA francs" },
    euros: { etiqueta: "Amount in euros" },
    parite: { etiqueta: "Fixed parity (CFA francs per euro)" },
  },
  mensajes: MENSAJES,
});
