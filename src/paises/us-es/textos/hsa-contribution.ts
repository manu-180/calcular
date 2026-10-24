import { definirTextos } from "@/motor/edicion";
import hsaContribution from "../../us/calculadoras/hsa-contribution";
import { COMUN } from "../lib/comun";

export default definirTextos(hsaContribution, {
  calculadora: "us-es.hsa-contribution",
  slug: "calculadora-hsa",
  campos: {
    cobertura: { etiqueta: "Cobertura del plan de salud con deducible alto", opciones: { "individual": "Individual (solo tú)", "familiar": "Familiar" } },
    mayor55: { etiqueta: "Tienes 55 años o más al final del año" },
    meses: { etiqueta: "Meses en que fuiste elegible este año", ayuda: "Cuenta los meses en que tenías cobertura HDHP el primer día del mes." },
    empleador: { etiqueta: "Aportes del empleador este año" },
  },
  filas: {
    limite: { etiqueta: "Tu límite de HSA para el año" },
    empleador: { etiqueta: "Ya aportado por tu empleador" },
    tuyo: { etiqueta: "Lo que todavía puedes aportar" },
    porMes: { etiqueta: "Por mes" },
  },
  ...COMUN,
});
