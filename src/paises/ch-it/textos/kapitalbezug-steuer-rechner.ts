import { definirTextos } from "@/motor/edicion";
import kapitalbezugSteuerRechner from "../../ch/calculadoras/kapitalbezug-steuer-rechner";
import { COMUN, ZIVILSTAND } from "../lib/comun";

export default definirTextos(kapitalbezugSteuerRechner, {
  calculadora: "ch-it.kapitalbezug-steuer-rechner",
  slug: "imposta-prelievo-capitale",
  campos: {
    kapital: { etiqueta: "Prelievo di capitale dalla cassa pensioni o dal pilastro 3a" },
    zivilstand: { etiqueta: "Stato civile", opciones: ZIVILSTAND },
    mitKindern: { etiqueta: "Con figli nella stessa economia domestica" },
  },
  filas: {
    steuer: { etiqueta: "Imposta federale diretta sul prelievo" },
    satz: { etiqueta: "Quota del capitale" },
    vollerTarif: { etiqueta: "Imposta secondo la tariffa intera (prima della divisione per cinque)" },
    netto: { etiqueta: "Capitale dopo l'imposta federale" },
  },
  ...COMUN,
});
