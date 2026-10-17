import { definirTextos } from "@/motor/edicion";
import saronHypothekRechner from "../../ch/calculadoras/saron-hypothek-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(saronHypothekRechner, {
  calculadora: "ch-it.saron-hypothek-rechner",
  slug: "ipoteca-saron",
  campos: {
    betrag: { etiqueta: "Importo dell'ipoteca" },
    marge: { etiqueta: "Margine della banca", ayuda: "Lo trovi nell'offerta o nel contratto ipotecario." },
    negativ: { etiqueta: "SARON negativo", opciones: { "null": "Calcolare con 0 % (limite inferiore nel contratto)", "voll": "Calcolare con il valore pubblicato" } },
  },
  filas: {
    monat: { etiqueta: "Interesse ipotecario al mese" },
    jahr: { etiqueta: "Interesse ipotecario all'anno" },
    quartal: { etiqueta: "Al trimestre" },
    satz: { etiqueta: "Tasso (SARON più margine)" },
    saron: { etiqueta: "SARON" },
    saronDatum: { etiqueta: "SARON del" },
    leitzins: { etiqueta: "Tasso guida della BNS" },
  },
  ...COMUN,
});
