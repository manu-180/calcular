import { definirTextos } from "@/motor/edicion";
import inflationCalculator from "../../us/calculadoras/inflation-calculator";
import { COMUN } from "../lib/comun";

export default definirTextos(inflationCalculator, {
  calculadora: "us-es.inflation-calculator",
  slug: "calculadora-de-inflacion",
  campos: {
    monto: { etiqueta: "Monto en dólares" },
    desde: { etiqueta: "Mes del monto original", ayuda: "Se usa el CPI de ese mes. El día no importa." },
    hasta: { etiqueta: "Mes con el que quiere comparar" },
  },
  filas: {
    ajustado: { etiqueta: "Monto en dólares del mes final" },
    diferencia: { etiqueta: "Aumento por inflación" },
    acumulada: { etiqueta: "Inflación acumulada" },
    anual: { etiqueta: "Inflación anual promedio" },
    mesInicial: { etiqueta: "Primer mes" },
    indiceInicial: { etiqueta: "CPI-U del primer mes" },
    mesFinal: { etiqueta: "Último mes" },
    indiceFinal: { etiqueta: "CPI-U del último mes" },
  },
  ...COMUN,
});
