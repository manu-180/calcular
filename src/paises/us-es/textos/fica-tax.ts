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
    socialSecurity: { etiqueta: "Impuesto del Seguro Social que pagas" },
    medicare: { etiqueta: "Impuesto de Medicare que pagas" },
    adicional: { etiqueta: "Impuesto adicional de Medicare" },
    empleado: { etiqueta: "Tu FICA total" },
    efectiva: { etiqueta: "Porcentaje de tus salarios" },
    ssEmpleador: { etiqueta: "Seguro Social que paga tu empleador" },
    medicareEmpleador: { etiqueta: "Medicare que paga tu empleador" },
    empleador: { etiqueta: "FICA total del empleador" },
    total: { etiqueta: "FICA total sobre tus salarios" },
  },
  ...COMUN,
});
