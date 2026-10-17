import { definirTextos } from "@/motor/edicion";
import saeule3aRechner from "../../ch/calculadoras/saeule-3a-rechner";
import { COMUN, ZIVILSTAND } from "../lib/comun";

export default definirTextos(saeule3aRechner, {
  calculadora: "ch-it.saeule-3a-rechner",
  slug: "pilastro-3a",
  campos: {
    mitPk: { etiqueta: "Sono assicurato in una cassa pensioni" },
    erwerbseinkommen: { etiqueta: "Reddito annuo da attività lucrativa (solo senza cassa pensioni)" },
    beitrag: { etiqueta: "Versamento previsto nel pilastro 3a", ayuda: "Lascia vuoto: il calcolatore usa il massimo." },
    steuerbar: { etiqueta: "Reddito imponibile prima del versamento (imposta federale diretta)" },
    zivilstand: { etiqueta: "Stato civile", opciones: ZIVILSTAND },
    kinder: { etiqueta: "Figli nella stessa economia domestica" },
  },
  filas: {
    maximum: { etiqueta: "Versamento massimo quest'anno" },
    abziehbar: { etiqueta: "Versamento deducibile" },
    ersparnis: { etiqueta: "Risparmio sull'imposta federale diretta" },
    vorher: { etiqueta: "Imposta federale senza versamento" },
    nachher: { etiqueta: "Imposta federale con versamento" },
  },
  ...COMUN,
});
