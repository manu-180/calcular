import { definirTextos } from "@/motor/edicion";
import selfEmploymentTax from "../../us/calculadoras/self-employment-tax";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(selfEmploymentTax, {
  calculadora: "us-es.self-employment-tax",
  slug: "calculadora-impuesto-trabajo-por-cuenta-propia",
  campos: {
    ganancia: { etiqueta: "Ganancia neta del trabajo por cuenta propia", ayuda: "Ingresos menos gastos del negocio, como en el Anexo C (Schedule C)." },
    salarios: { etiqueta: "Salarios W-2 de un empleo, si los tienes", ayuda: "Los salarios que ya pagaron Seguro Social usan parte de la base salarial." },
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
  },
  filas: {
    neto: { etiqueta: "Ingreso neto sujeto al impuesto" },
    socialSecurity: { etiqueta: "Parte del Seguro Social" },
    medicare: { etiqueta: "Parte de Medicare" },
    impuesto: { etiqueta: "Impuesto sobre el trabajo por cuenta propia" },
    adicional: { etiqueta: "Impuesto adicional de Medicare" },
    deduccion: { etiqueta: "Deducción de la mitad del impuesto" },
    trimestral: { etiqueta: "Para apartar cada trimestre" },
  },
  ...COMUN,
});
