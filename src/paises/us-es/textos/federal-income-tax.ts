import { definirTextos } from "@/motor/edicion";
import federalIncomeTax from "../../us/calculadoras/federal-income-tax";
import { COMUN, ESTADO_CIVIL } from "../lib/comun";

export default definirTextos(federalIncomeTax, {
  calculadora: "us-es.federal-income-tax",
  slug: "calculadora-impuestos-federales",
  campos: {
    estado: { etiqueta: "Estado civil para la declaración", opciones: ESTADO_CIVIL },
    ingreso: { etiqueta: "Ingreso bruto ajustado (AGI)", ayuda: "Todos los ingresos tributables del año menos los aportes al 401(k) antes de impuestos y otros ajustes." },
    itemizadas: { etiqueta: "Deducciones detalladas", ayuda: "Déjalo en blanco para usar la deducción estándar. Si escribes un monto, se usa la mayor de las dos." },
    mayores: { etiqueta: "Personas en la declaración de 65 años o más" },
    ciegos: { etiqueta: "Personas en la declaración que son ciegas" },
    retenido: { etiqueta: "Impuesto federal retenido este año", ayuda: "Casilla 2 de tus formularios W-2 más los pagos estimados que hayas hecho." },
  },
  filas: {
    deduccion: { etiqueta: "Deducción aplicada" },
    tipoDeduccion: { etiqueta: "Tipo de deducción" },
    senior: { etiqueta: "Deducción para mayores de 65" },
    gravable: { etiqueta: "Ingreso tributable" },
    impuesto: { etiqueta: "Impuesto federal sobre el ingreso" },
    marginal: { etiqueta: "Tasa marginal (tu tramo más alto)" },
    efectiva: { etiqueta: "Tasa efectiva sobre tu AGI" },
    reembolso: { etiqueta: "Reembolso estimado" },
    aPagar: { etiqueta: "Monto estimado a pagar" },
  },
  ...COMUN,
});
