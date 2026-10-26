import { definirTextos } from "@/motor/edicion";
import quarterlyEstimatedTaxes from "../../us/calculadoras/quarterly-estimated-taxes";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(quarterlyEstimatedTaxes, {
  calculadora: "us-es.quarterly-estimated-taxes",
  slug: "calculadora-impuestos-estimados-trimestrales",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    esperado: { etiqueta: "Impuesto total que esperas para este año", ayuda: "Impuesto federal sobre el ingreso más el impuesto sobre el trabajo por cuenta propia, después de créditos." },
    retencion: { etiqueta: "Impuesto retenido de tus cheques este año" },
    anterior: { etiqueta: "Impuesto total en la declaración del año pasado", ayuda: "Déjalo en blanco si no declaraste el año pasado o si esa declaración cubrió menos de 12 meses." },
    agiAnterior: { etiqueta: "AGI en la declaración del año pasado" },
  },
  filas: {
    deuda: { etiqueta: "Impuesto que no cubre la retención" },
    metaActual: { etiqueta: "Monto seguro según este año" },
    metaAnterior: { etiqueta: "Monto seguro según el año pasado" },
    anual: { etiqueta: "Pagos estimados del año" },
    trimestral: { etiqueta: "Cada pago trimestral" },
  },
  ...COMUN,
});
