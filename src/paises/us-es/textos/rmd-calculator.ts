import { definirTextos } from "@/motor/edicion";
import rmdCalculator from "../../us/calculadoras/rmd-calculator";
import { COMUN } from "../lib/comun";

export default definirTextos(rmdCalculator, {
  calculadora: "us-es.rmd-calculator",
  slug: "calculadora-distribucion-minima-requerida",
  campos: {
    edad: { etiqueta: "Edad que cumple este año" },
    saldo: { etiqueta: "Saldo de la cuenta al 31 de diciembre del año pasado" },
  },
  filas: {
    factor: { etiqueta: "Período de distribución" },
    rmd: { etiqueta: "Distribución mínima requerida (RMD)" },
    porMes: { etiqueta: "Por mes si la reparte en el año" },
    porcentajeSaldo: { etiqueta: "Porcentaje del saldo" },
  },
  ...COMUN,
});
