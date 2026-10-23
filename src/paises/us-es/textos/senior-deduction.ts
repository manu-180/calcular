import { definirTextos } from "@/motor/edicion";
import seniorDeduction from "../../us/calculadoras/senior-deduction";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(seniorDeduction, {
  calculadora: "us-es.senior-deduction",
  slug: "deduccion-para-mayores-de-65",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    personas: { etiqueta: "Personas en la declaración de 65 años o más", ayuda: "Para 2026, nacidas antes del 2 de enero de 1962." },
    magi: { etiqueta: "Ingreso bruto ajustado modificado (MAGI)" },
    gravable: { etiqueta: "Ingreso tributable antes de esta deducción", ayuda: "Opcional. Sirve para estimar cuánto impuesto se ahorra." },
  },
  filas: {
    porPersona: { etiqueta: "Deducción por persona elegible" },
    total: { etiqueta: "Deducción para mayores en su declaración" },
    ahorro: { etiqueta: "Impuesto federal sobre el ingreso que se ahorra (estimado)" },
  },
  ...COMUN,
});
