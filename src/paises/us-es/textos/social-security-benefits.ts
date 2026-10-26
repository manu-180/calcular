import { definirTextos } from "@/motor/edicion";
import socialSecurityBenefits from "../../us/calculadoras/social-security-benefits";
import { COMUN } from "../lib/comun";

export default definirTextos(socialSecurityBenefits, {
  calculadora: "us-es.social-security-benefits",
  slug: "calculadora-seguro-social",
  campos: {
    aime: { etiqueta: "Ganancias mensuales indexadas promedio (AIME)", ayuda: "Tus 35 años de mayores ganancias, indexados por el crecimiento salarial, divididos entre 420 meses. Tu cuenta my Social Security muestra tu historial de ganancias." },
    anios: { etiqueta: "Edad a la que empiezas a cobrar (años)" },
    meses: { etiqueta: "Más meses" },
  },
  filas: {
    pia: { etiqueta: "Beneficio a la plena edad de jubilación (PIA)" },
    ajuste: { etiqueta: "Ajuste por la edad en que empieza" },
    mensual: { etiqueta: "Beneficio mensual estimado" },
    anual: { etiqueta: "Por año" },
  },
  ...COMUN,
});
