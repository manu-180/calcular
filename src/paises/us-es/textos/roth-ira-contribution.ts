import { definirTextos } from "@/motor/edicion";
import rothIraContribution from "../../us/calculadoras/roth-ira-contribution";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(rothIraContribution, {
  calculadora: "us-es.roth-ira-contribution",
  slug: "calculadora-roth-ira",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    magi: { etiqueta: "AGI modificado para la Roth IRA" },
    edad: { etiqueta: "Su edad al final del año" },
    compensacion: { etiqueta: "Compensación tributable (salarios e ingresos por cuenta propia)" },
  },
  filas: {
    limite: { etiqueta: "Límite de IRA para su edad" },
    inicio: { etiqueta: "La reducción empieza en" },
    fin: { etiqueta: "La reducción termina en" },
    maximo: { etiqueta: "Máximo que puede aportar a una Roth IRA" },
    porMes: { etiqueta: "Por mes para llegar" },
  },
  ...COMUN,
});
