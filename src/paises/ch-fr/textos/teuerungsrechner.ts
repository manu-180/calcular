import { definirTextos } from "@/motor/edicion";
import teuerungsrechner from "../../ch/calculadoras/teuerungsrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(teuerungsrechner, {
  calculadora: "ch-fr.teuerungsrechner",
  slug: "calcul-rencherissement",
  campos: {
    betrag: { etiqueta: "Montant en francs" },
    von: { etiqueta: "Mois du montant d'origine", ayuda: "C'est l'indice de ce mois qui compte, le jour ne joue aucun rôle." },
    bis: { etiqueta: "Mois vers lequel convertir" },
  },
  filas: {
    angepasst: { etiqueta: "Montant au même pouvoir d'achat" },
    differenz: { etiqueta: "Différence due au renchérissement" },
    gesamt: { etiqueta: "Renchérissement sur la période" },
    vorjahr: { etiqueta: "Renchérissement annuel du mois de fin" },
    monatAnfang: { etiqueta: "Mois de départ" },
    indexAnfang: { etiqueta: "IPC du mois de départ (décembre 2025 = 100)" },
    monatEnde: { etiqueta: "Mois de fin" },
    indexEnde: { etiqueta: "IPC du mois de fin" },
  },
  ...COMUN,
});
