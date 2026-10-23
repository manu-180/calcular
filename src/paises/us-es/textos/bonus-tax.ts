import { definirTextos } from "@/motor/edicion";
import bonusTax from "../../us/calculadoras/bonus-tax";
import { COMUN } from "../lib/comun";

export default definirTextos(bonusTax, {
  calculadora: "us-es.bonus-tax",
  slug: "calculadora-impuestos-sobre-bono",
  campos: {
    bono: { etiqueta: "Monto del bono" },
    salariosPrevios: { etiqueta: "Salarios que ya le pagaron este año", ayuda: "Se usan para el tope del Seguro Social y el impuesto adicional de Medicare." },
    suplementariosPrevios: { etiqueta: "Bonos y comisiones ya pagados este año", ayuda: "Solo importa si su pago suplementario del año pasa de 1 millón de dólares." },
  },
  filas: {
    federal: { etiqueta: "Impuesto federal retenido" },
    socialSecurity: { etiqueta: "Impuesto del Seguro Social" },
    medicare: { etiqueta: "Impuesto de Medicare" },
    neto: { etiqueta: "Bono después de la retención federal" },
    porcentajeNeto: { etiqueta: "Parte del bono que le queda" },
  },
  ...COMUN,
});
