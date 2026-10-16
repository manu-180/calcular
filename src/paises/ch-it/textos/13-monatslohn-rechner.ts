import { definirTextos } from "@/motor/edicion";
import c13MonatslohnRechner from "../../ch/calculadoras/13-monatslohn-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(c13MonatslohnRechner, {
  calculadora: "ch-it.13-monatslohn-rechner",
  slug: "tredicesima",
  campos: {
    monatslohn: { etiqueta: "Salario lordo mensile" },
    monate: { etiqueta: "Mesi lavorati nell'anno civile", ayuda: "Inserisci mezzo mese come 0.5." },
  },
  filas: {
    anteil: { etiqueta: "Tredicesima (pro rata)" },
    proMonat: { etiqueta: "Quota per mese lavorato" },
    jahreslohn: { etiqueta: "Salario lordo di questi mesi, tredicesima inclusa" },
  },
  ...COMUN,
});
