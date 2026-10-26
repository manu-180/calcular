import { definirTextos } from "@/motor/edicion";
import noTaxOnTips from "../../us/calculadoras/no-tax-on-tips";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(noTaxOnTips, {
  calculadora: "us-es.no-tax-on-tips",
  slug: "propinas-sin-impuestos",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    propinas: { etiqueta: "Propinas que califican recibidas este año", ayuda: "Propinas en efectivo y con tarjeta declaradas a tu empleador o en el Formulario 4137." },
    magi: { etiqueta: "Ingreso bruto ajustado modificado (MAGI)", ayuda: "Para la mayoría de las personas es igual al AGI." },
    gravable: { etiqueta: "Ingreso tributable antes de esta deducción", ayuda: "Opcional. Sirve para estimar cuánto impuesto se ahorra." },
  },
  filas: {
    tope: { etiqueta: "Tope anual" },
    recorte: { etiqueta: "Reducción por ingresos sobre el umbral" },
    deduccion: { etiqueta: "Deducción por propinas" },
    ahorro: { etiqueta: "Impuesto federal sobre el ingreso que se ahorra (estimado)" },
  },
  ...COMUN,
});
