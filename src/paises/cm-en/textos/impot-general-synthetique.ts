import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/impot-general-synthetique";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.impot-general-synthetique",
  slug: "global-synthetic-tax",
  campos: {
    chiffreAffaires: { etiqueta: "Annual turnover before tax" },
    activite: { etiqueta: "Activity" },
    cga: { etiqueta: "Member of an approved management centre", ayuda: "The reduction applies to taxpayers who must keep accounts." },
  },
  filas: {
    igs: { etiqueta: "Global synthetic tax for the year" },
    tarif: { etiqueta: "Amount for your band" },
    reduction: { etiqueta: "Approved management centre reduction" },
    trimestre: { etiqueta: "Quarterly payment" },
  },
  mensajes: MENSAJES,
});
