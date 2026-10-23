import { definirTextos } from "@/motor/edicion";
import employerPayrollTax from "../../us/calculadoras/employer-payroll-tax";
import { COMUN } from "../lib/comun";

export default definirTextos(employerPayrollTax, {
  calculadora: "us-es.employer-payroll-tax",
  slug: "calculadora-impuestos-de-nomina-empleador",
  campos: {
    salario: { etiqueta: "Salario anual por empleado" },
    empleados: { etiqueta: "Cantidad de empleados con ese salario" },
    sutaTasa: { etiqueta: "Tasa de desempleo estatal (SUTA)", ayuda: "Figura en el aviso de tasa de la agencia laboral de su estado." },
    sutaBase: { etiqueta: "Base salarial del SUTA en su estado", ayuda: "Déjelo en blanco para aplicar la tasa a todo el salario." },
  },
  filas: {
    socialSecurity: { etiqueta: "Seguro Social del empleador" },
    medicare: { etiqueta: "Medicare del empleador" },
    futa: { etiqueta: "Impuesto federal de desempleo (FUTA)" },
    suta: { etiqueta: "Impuesto estatal de desempleo (SUTA)" },
    impuestos: { etiqueta: "Impuestos de nómina por empleado" },
    porcentajeExtra: { etiqueta: "Impuestos sobre el salario" },
    costo: { etiqueta: "Costo total por empleado" },
    costoTotal: { etiqueta: "Costo total de todos los empleados" },
  },
  ...COMUN,
});
