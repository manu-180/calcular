import { definirTextos } from "@/motor/edicion";
import noTaxOnOvertime from "../../us/calculadoras/no-tax-on-overtime";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(noTaxOnOvertime, {
  calculadora: "us-es.no-tax-on-overtime",
  slug: "horas-extras-sin-impuestos",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    pagoExtra: { etiqueta: "Pago total de horas extras del año", ayuda: "Todo lo que le pagaron por horas sobre 40 a la semana a tiempo y medio. Si su W-2 muestra solo la prima, multiplíquela por 3." },
    magi: { etiqueta: "Ingreso bruto ajustado modificado (MAGI)", ayuda: "Para la mayoría de las personas es igual al AGI." },
    gravable: { etiqueta: "Ingreso tributable antes de esta deducción", ayuda: "Opcional. Sirve para estimar cuánto impuesto se ahorra." },
  },
  filas: {
    prima: { etiqueta: "Prima de horas extras que califica" },
    tope: { etiqueta: "Tope anual" },
    recorte: { etiqueta: "Reducción por ingresos sobre el umbral" },
    deduccion: { etiqueta: "Deducción por horas extras" },
    ahorro: { etiqueta: "Impuesto federal sobre el ingreso que se ahorra (estimado)" },
  },
  ...COMUN,
});
