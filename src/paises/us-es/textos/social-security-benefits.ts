import { definirTextos } from "@/motor/edicion";
import socialSecurityBenefits from "../../us/calculadoras/social-security-benefits";
import { COMUN } from "../lib/comun";

export default definirTextos(socialSecurityBenefits, {
  calculadora: "us-es.social-security-benefits",
  slug: "calculadora-beneficios-seguro-social",
  campos: {
    aime: { etiqueta: "Ganancias mensuales indexadas promedio (AIME)", ayuda: "Sus 35 años de mayores ganancias, indexados por el crecimiento salarial, divididos entre 420 meses. Su cuenta my Social Security muestra su historial de ganancias." },
    anios: { etiqueta: "Edad a la que empieza a cobrar (años)" },
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
