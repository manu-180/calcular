import { definirTextos } from "@/motor/edicion";
import teuerungsrechner from "../../ch/calculadoras/teuerungsrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(teuerungsrechner, {
  calculadora: "ch-it.teuerungsrechner",
  slug: "calcolo-rincaro",
  campos: {
    betrag: { etiqueta: "Importo in franchi" },
    von: { etiqueta: "Mese dell'importo originale", ayuda: "Conta l'indice di quel mese, il giorno non ha importanza." },
    bis: { etiqueta: "Mese a cui vuoi convertire" },
  },
  filas: {
    angepasst: { etiqueta: "Importo con lo stesso potere d'acquisto" },
    differenz: { etiqueta: "Differenza dovuta al rincaro" },
    gesamt: { etiqueta: "Rincaro nel periodo" },
    vorjahr: { etiqueta: "Rincaro annuo nel mese finale" },
    monatAnfang: { etiqueta: "Mese iniziale" },
    indexAnfang: { etiqueta: "IPC nel mese iniziale (dicembre 2025 = 100)" },
    monatEnde: { etiqueta: "Mese finale" },
    indexEnde: { etiqueta: "IPC nel mese finale" },
  },
  ...COMUN,
});
