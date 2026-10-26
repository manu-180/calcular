import { definirTextos } from "@/motor/edicion";
import minimumWage from "../../us/calculadoras/minimum-wage";
import { COMUN } from "../lib/comun";

export default definirTextos(minimumWage, {
  calculadora: "us-es.minimum-wage",
  slug: "salario-minimo-por-estado",
  campos: {
    estado: { etiqueta: "Estado" },
    horas: { etiqueta: "Horas que trabajas por semana" },
  },
  filas: {
    federal: { etiqueta: "Salario mínimo federal por hora" },
    estatal: { etiqueta: "Salario mínimo estatal por hora" },
    aplicable: { etiqueta: "Mínimo que te deben pagar por hora" },
    semanal: { etiqueta: "Pago mínimo por semana" },
    mensual: { etiqueta: "Pago mínimo por mes" },
    anual: { etiqueta: "Pago mínimo por año (52 semanas)" },
  },
  ...COMUN,
});
