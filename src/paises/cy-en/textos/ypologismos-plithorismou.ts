import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/ypologismos-plithorismou";
import { MENSAJES, traducirMines } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.ypologismos-plithorismou",
  slug: "inflation-calculator",
  campos: {
    poso: { etiqueta: "Amount" },
    apo: { etiqueta: "Month the amount is from", ayuda: "Only the month's index counts, the day doesn't matter." },
    eos: { etiqueta: "Month you want to bring it to" },
  },
  filas: {
    simera: { etiqueta: "Amount with the same buying power" },
    diafora: { etiqueta: "Increase due to inflation" },
    axia: { etiqueta: "What the amount is worth in prices of the starting month" },
    synoliki: { etiqueta: "Inflation over the whole period" },
    minasApo: { etiqueta: "From" },
    minasEos: { etiqueta: "To" },
  },
  mensajes: MENSAJES,
  traducir: traducirMines,
});
