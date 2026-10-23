import { definirTextos } from "@/motor/edicion";
import hsaContribution from "../../us/calculadoras/hsa-contribution";
import { COMUN } from "../lib/comun";

export default definirTextos(hsaContribution, {
  calculadora: "us-es.hsa-contribution",
  slug: "calculadora-hsa",
  campos: {
    cobertura: { etiqueta: "Cobertura del plan de salud con deducible alto", opciones: { "individual": "Solo usted", "familiar": "Familiar" } },
    mayor55: { etiqueta: "Tiene 55 años o más al final del año" },
    meses: { etiqueta: "Meses en que fue elegible este año", ayuda: "Cuente los meses en que tenía cobertura HDHP el primer día del mes." },
    empleador: { etiqueta: "Aportes del empleador este año" },
  },
  filas: {
    limite: { etiqueta: "Su límite de HSA para el año" },
    empleador: { etiqueta: "Ya aportado por su empleador" },
    tuyo: { etiqueta: "Lo que todavía puede aportar" },
    porMes: { etiqueta: "Por mes" },
  },
  ...COMUN,
});
