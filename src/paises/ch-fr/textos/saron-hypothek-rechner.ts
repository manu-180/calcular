import { definirTextos } from "@/motor/edicion";
import saronHypothekRechner from "../../ch/calculadoras/saron-hypothek-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(saronHypothekRechner, {
  calculadora: "ch-fr.saron-hypothek-rechner",
  slug: "hypotheque-saron",
  campos: {
    betrag: { etiqueta: "Montant de l'hypothèque" },
    marge: { etiqueta: "Marge de la banque", ayuda: "Elle figure dans votre offre ou dans le contrat hypothécaire." },
    negativ: { etiqueta: "SARON négatif", opciones: { "null": "Compter 0 % (plancher prévu au contrat)", "voll": "Compter la valeur publiée" } },
  },
  filas: {
    monat: { etiqueta: "Intérêt hypothécaire par mois" },
    jahr: { etiqueta: "Intérêt hypothécaire par an" },
    quartal: { etiqueta: "Par trimestre" },
    satz: { etiqueta: "Taux (SARON plus marge)" },
    saron: { etiqueta: "SARON" },
    saronDatum: { etiqueta: "SARON du" },
    leitzins: { etiqueta: "Taux directeur de la BNS" },
  },
  ...COMUN,
});
