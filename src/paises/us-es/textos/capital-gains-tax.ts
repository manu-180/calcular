import { definirTextos } from "@/motor/edicion";
import capitalGainsTax from "../../us/calculadoras/capital-gains-tax";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(capitalGainsTax, {
  calculadora: "us-es.capital-gains-tax",
  slug: "calculadora-impuesto-ganancias-de-capital",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    ganancia: { etiqueta: "Ganancia de capital", ayuda: "Precio de venta menos lo que pagaste, incluidas las comisiones." },
    plazo: { etiqueta: "Cuánto tiempo lo tuviste", opciones: { "largo": "Más de un año (largo plazo)", "corto": "Un año o menos (corto plazo)" } },
    ordinario: { etiqueta: "Otros ingresos tributables", ayuda: "Tu ingreso tributable del año sin esta ganancia, después de deducciones." },
    magi: { etiqueta: "AGI modificado incluida la ganancia", ayuda: "Opcional. Se usa para el impuesto de 3.8% sobre ingresos netos de inversión." },
  },
  filas: {
    al0: { etiqueta: "Ganancia gravada al 0%" },
    al15: { etiqueta: "Ganancia gravada al 15%" },
    al20: { etiqueta: "Ganancia gravada al 20%" },
    impuesto: { etiqueta: "Impuesto federal sobre la ganancia" },
    niit: { etiqueta: "Impuesto sobre ingresos netos de inversión" },
    pagar: { etiqueta: "Impuesto federal total sobre la ganancia" },
    efectiva: { etiqueta: "Tasa efectiva sobre la ganancia" },
    neto: { etiqueta: "Ganancia después del impuesto federal" },
  },
  ...COMUN,
});
