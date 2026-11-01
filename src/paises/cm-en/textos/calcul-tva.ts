import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/calcul-tva";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.calcul-tva",
  slug: "vat-calculator",
  campos: {
    operation: {
      etiqueta: "What do you want to do?",
      opciones: { "ht-ttc": "Add VAT to a price before tax", "ttc-ht": "Remove VAT from a price including tax" },
    },
    montant: { etiqueta: "Amount" },
    taux: { etiqueta: "VAT rate", ayuda: "The reduced rate mainly covers social housing (sale, rent and loan interest) with a tax clearance." },
  },
  filas: {
    tauxGlobal: { etiqueta: "Overall rate applied (VAT and CAC)" },
    ht: { etiqueta: "Amount before tax" },
    tva: { etiqueta: "VAT (principal)" },
    cac: { etiqueta: "Council additional tax" },
    taxes: { etiqueta: "Total taxes" },
    ttc: { etiqueta: "Amount including all taxes" },
  },
  mensajes: MENSAJES,
});
