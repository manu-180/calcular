import { definirTextos } from "@/motor/edicion";
import quarterlyEstimatedTaxes from "../../us/calculadoras/quarterly-estimated-taxes";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(quarterlyEstimatedTaxes, {
  calculadora: "us-es.quarterly-estimated-taxes",
  slug: "calculadora-impuestos-estimados-trimestrales",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    esperado: { etiqueta: "Impuesto total que espera para este año", ayuda: "Impuesto federal sobre el ingreso más el impuesto sobre el trabajo por cuenta propia, después de créditos." },
    retencion: { etiqueta: "Impuesto retenido de sus cheques este año" },
    anterior: { etiqueta: "Impuesto total en la declaración del año pasado", ayuda: "Déjelo en blanco si no declaró el año pasado o si cubrió menos de 12 meses." },
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
