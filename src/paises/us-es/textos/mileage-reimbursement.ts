import { definirTextos } from "@/motor/edicion";
import mileageReimbursement from "../../us/calculadoras/mileage-reimbursement";
import { COMUN } from "../lib/comun";

export default definirTextos(mileageReimbursement, {
  calculadora: "us-es.mileage-reimbursement",
  slug: "calculadora-millaje-irs",
  campos: {
    millas: { etiqueta: "Millas recorridas" },
    uso: { etiqueta: "Motivo de los viajes", opciones: { "negocio": "Negocio", "medico": "Médico o mudanza militar", "caridad": "Caridad" } },
    fecha: { etiqueta: "Fecha de los viajes" },
  },
  filas: {
    tarifa: { etiqueta: "Tarifa del IRS por milla" },
    total: { etiqueta: "Monto por millaje" },
  },
  ...COMUN,
});
