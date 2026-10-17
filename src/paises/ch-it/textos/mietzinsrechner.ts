import { definirTextos } from "@/motor/edicion";
import mietzinsrechner from "../../ch/calculadoras/mietzinsrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(mietzinsrechner, {
  calculadora: "ch-it.mietzinsrechner",
  slug: "calcolo-pigione-tasso-di-riferimento",
  campos: {
    miete: { etiqueta: "Pigione netta attuale al mese" },
    refAlt: { etiqueta: "Tasso di riferimento all'ultimo adeguamento della pigione", ayuda: "Lo trovi nel contratto di locazione o nell'ultimo adeguamento della pigione." },
    monatAlt: { etiqueta: "Indice dei prezzi al consumo all'ultimo adeguamento (mese)" },
    kosten: { etiqueta: "Aumento generale dei costi (se fatto valere)" },
  },
  filas: {
    neu: { etiqueta: "Pigione netta adeguata al mese" },
    differenz: { etiqueta: "Variazione al mese" },
    total: { etiqueta: "Variazione totale" },
    hypothek: { etiqueta: "Quota del tasso di riferimento" },
    teuerung: { etiqueta: "Quota del rincaro" },
    kosten: { etiqueta: "Quota dell'aumento dei costi" },
    refNeu: { etiqueta: "Tasso di riferimento attuale" },
    likMonat: { etiqueta: "Indice fino a" },
  },
  ...COMUN,
});
