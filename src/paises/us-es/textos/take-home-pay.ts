import { definirTextos } from "@/motor/edicion";
import takeHomePay from "../../us/calculadoras/take-home-pay";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(takeHomePay, {
  calculadora: "us-es.take-home-pay",
  slug: "calculadora-cheque-de-pago",
  campos: {
    sueldo: { etiqueta: "Salario anual antes de impuestos" },
    frecuencia: { etiqueta: "Cada cuánto te pagan", opciones: { "weekly": "Semanal (52 cheques)", "biweekly": "Cada dos semanas (26 cheques)", "semimonthly": "Dos veces al mes (24 cheques)", "monthly": "Mensual (12 cheques)" } },
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    aporte: { etiqueta: "Aporte al 401(k) tradicional (% del salario)" },
    salud: { etiqueta: "Seguro médico y FSA antes de impuestos, por año", ayuda: "Primas y cuentas de gastos flexibles pagadas por un plan cafetería. Reducen el impuesto sobre el ingreso y el FICA." },
  },
  filas: {
    bruto: { etiqueta: "Pago bruto por cheque" },
    k401: { etiqueta: "Aporte al 401(k)" },
    salud: { etiqueta: "Beneficios de salud antes de impuestos" },
    federal: { etiqueta: "Impuesto federal sobre el ingreso" },
    socialSecurity: { etiqueta: "Impuesto del Seguro Social" },
    medicare: { etiqueta: "Impuesto de Medicare" },
    neto: { etiqueta: "Pago neto por cheque" },
    netoAnual: { etiqueta: "Pago neto por año" },
    impuestosAnuales: { etiqueta: "Impuestos federales por año" },
  },
  ...COMUN,
});
