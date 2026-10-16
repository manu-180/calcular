import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import mpfCalculator from "./calculadoras/mpf-calculator";
import contenidoMpfCalculator from "./contenido/mpf-calculator";
import provisionalSalariesTax from "./calculadoras/provisional-salaries-tax";
import contenidoProvisionalSalariesTax from "./contenido/provisional-salaries-tax";
import salariesTaxCalculator from "./calculadoras/salaries-tax-calculator";
import contenidoSalariesTaxCalculator from "./contenido/salaries-tax-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: mpfCalculator, contenido: contenidoMpfCalculator, cliente: () => import("./calculadoras/mpf-calculator.cliente") },
    { definicion: provisionalSalariesTax, contenido: contenidoProvisionalSalariesTax, cliente: () => import("./calculadoras/provisional-salaries-tax.cliente") },
    { definicion: salariesTaxCalculator, contenido: contenidoSalariesTaxCalculator, cliente: () => import("./calculadoras/salaries-tax-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
