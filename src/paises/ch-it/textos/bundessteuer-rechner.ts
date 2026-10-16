import { definirTextos } from "@/motor/edicion";
import bundessteuerRechner from "../../ch/calculadoras/bundessteuer-rechner";
import { COMUN, ZIVILSTAND } from "../lib/comun";

export default definirTextos(bundessteuerRechner, {
  calculadora: "ch-it.bundessteuer-rechner",
  slug: "imposta-federale-diretta",
  campos: {
    einkommen: { etiqueta: "Reddito imponibile (imposta federale diretta)", ayuda: "Reddito dopo tutte le deduzioni, come risulta dalla tassazione dell'imposta federale diretta." },
    zivilstand: { etiqueta: "Stato civile", opciones: ZIVILSTAND },
    kinder: { etiqueta: "Figli nella stessa economia domestica al cui mantenimento provvedi in modo preponderante" },
  },
  filas: {
    steuer: { etiqueta: "Imposta federale diretta all'anno" },
    tarifsteuer: { etiqueta: "Imposta secondo la tariffa" },
    ermaessigung: { etiqueta: "Riduzione per figli" },
    durchschnitt: { etiqueta: "Aliquota media" },
    grenzsatz: { etiqueta: "Aliquota marginale (sui prossimi 100 franchi)" },
    tarif: { etiqueta: "Tariffa applicata" },
  },
  ...COMUN,
});
