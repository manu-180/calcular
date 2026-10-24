import { definirTextos } from "@/motor/edicion";
import c401kContribution from "../../us/calculadoras/401k-contribution";
import { COMUN } from "../lib/comun";

export default definirTextos(c401kContribution, {
  calculadora: "us-es.401k-contribution",
  slug: "calculadora-401k",
  campos: {
    sueldo: { etiqueta: "Salario anual" },
    aporte: { etiqueta: "Tu aporte (% del salario)" },
    edad: { etiqueta: "Tu edad al final del año" },
    coincidencia: { etiqueta: "Aporte equivalente del empleador (% de tu aporte)" },
    topeCoincidencia: { etiqueta: "Hasta qué porcentaje del salario" },
  },
  filas: {
    limite: { etiqueta: "Tu límite de aporte para 2026" },
    catchUp: { etiqueta: "Aporte adicional (catch-up) incluido" },
    aporte: { etiqueta: "Tu aporte anual" },
    porMes: { etiqueta: "Tu aporte por mes" },
    coincidencia: { etiqueta: "Aporte del empleador" },
    total: { etiqueta: "Total que entra a tu 401(k)" },
    paraElMaximo: { etiqueta: "Porcentaje para llegar al máximo" },
  },
  ...COMUN,
});
