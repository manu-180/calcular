import { definirTextos } from "@/motor/edicion";
import ficaTax from "../../us/calculadoras/fica-tax";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(ficaTax, {
  calculadora: "us-es.fica-tax",
  slug: "calculadora-impuesto-fica",
  campos: {
    salarios: { etiqueta: "Salarios del año", ayuda: "Pago bruto menos los beneficios de salud antes de impuestos. Los aportes al 401(k) sí cuentan." },
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
  },
  filas: {
    socialSecurity: { etiqueta: "Impuesto del Seguro Social que usted paga" },
    medicare: { etiqueta: "Impuesto de Medicare que usted paga" },
    adicional: { etiqueta: "Impuesto adicional de Medicare" },
    empleado: { etiqueta: "Su FICA total" },
    efectiva: { etiqueta: "Porcentaje de sus salarios" },
    ssEmpleador: { etiqueta: "Seguro Social que paga su empleador" },
    medicareEmpleador: { etiqueta: "Medicare que paga su empleador" },
    empleador: { etiqueta: "FICA total del empleador" },
    total: { etiqueta: "FICA total sobre sus salarios" },
  },
  ...COMUN,
});
