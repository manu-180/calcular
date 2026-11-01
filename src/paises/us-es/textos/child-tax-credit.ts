import { definirTextos } from "@/motor/edicion";
import childTaxCredit from "../../us/calculadoras/child-tax-credit";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(childTaxCredit, {
  calculadora: "us-es.child-tax-credit",
  slug: "calculadora-credito-tributario-por-hijos",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    ninos: { etiqueta: "Hijos que califican menores de 17 años" },
    otros: { etiqueta: "Otros dependientes", ayuda: "Hijos de 17 años o más y otros familiares que mantienes." },
    magi: { etiqueta: "Ingreso bruto ajustado modificado (MAGI)" },
    impuesto: { etiqueta: "Impuesto federal antes de créditos", ayuda: "Nuestra calculadora de impuestos federales te da este número." },
    ganado: { etiqueta: "Ingreso del trabajo (salarios y trabajo por cuenta propia)" },
  },
  filas: {
    maximo: { etiqueta: "Crédito antes del límite de ingresos" },
    reduccion: { etiqueta: "Reducción por ingresos sobre el umbral" },
    credito: { etiqueta: "Crédito después del límite de ingresos" },
    noReembolsable: { etiqueta: "Usado para reducir tu impuesto" },
    reembolsable: { etiqueta: "Crédito tributario adicional por hijos (reembolsable)" },
    total: { etiqueta: "Beneficio total del crédito" },
  },
  ...COMUN,
});
