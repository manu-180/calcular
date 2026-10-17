import { definirTextos } from "@/motor/edicion";
import bvgRechner from "../../ch/calculadoras/bvg-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(bvgRechner, {
  calculadora: "ch-it.bvg-rechner",
  slug: "calcolo-lpp",
  campos: {
    jahreslohn: { etiqueta: "Salario annuo AVS" },
    alter: { etiqueta: "Età quest'anno (anno civile meno anno di nascita)" },
    guthaben: { etiqueta: "Avere di vecchiaia LPP attuale", ayuda: "Lo trovi sul certificato di previdenza (parte obbligatoria)." },
    zins: { etiqueta: "Interesse annuo", ayuda: "Lascia vuoto: vale il tasso d'interesse minimo LPP." },
  },
  filas: {
    kapital: { etiqueta: "Avere di vecchiaia a 65 anni" },
    renteMonat: { etiqueta: "Rendita di vecchiaia LPP al mese" },
    renteJahr: { etiqueta: "Rendita di vecchiaia LPP all'anno" },
    koordinierterLohn: { etiqueta: "Salario coordinato" },
    gutschriftHeute: { etiqueta: "Accredito di vecchiaia quest'anno" },
    summeGutschriften: { etiqueta: "Totale degli accrediti futuri" },
    zins: { etiqueta: "Interesse usato" },
  },
  tablas: { plan: "Avere di vecchiaia anno per anno" },
  ...COMUN,
});
