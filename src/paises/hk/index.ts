import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import hiborMortgageCalculator from "./calculadoras/hibor-mortgage-calculator";
import contenidoHiborMortgageCalculator from "./contenido/hibor-mortgage-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import mpfCalculator from "./calculadoras/mpf-calculator";
import contenidoMpfCalculator from "./contenido/mpf-calculator";
import profitsTaxCalculator from "./calculadoras/profits-tax-calculator";
import contenidoProfitsTaxCalculator from "./contenido/profits-tax-calculator";
import propertyTaxCalculator from "./calculadoras/property-tax-calculator";
import contenidoPropertyTaxCalculator from "./contenido/property-tax-calculator";
import provisionalSalariesTax from "./calculadoras/provisional-salaries-tax";
import contenidoProvisionalSalariesTax from "./contenido/provisional-salaries-tax";
import salariesTaxCalculator from "./calculadoras/salaries-tax-calculator";
import contenidoSalariesTaxCalculator from "./contenido/salaries-tax-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
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
    { definicion: hiborMortgageCalculator, contenido: contenidoHiborMortgageCalculator, cliente: () => import("./calculadoras/hibor-mortgage-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: mpfCalculator, contenido: contenidoMpfCalculator, cliente: () => import("./calculadoras/mpf-calculator.cliente") },
    { definicion: profitsTaxCalculator, contenido: contenidoProfitsTaxCalculator, cliente: () => import("./calculadoras/profits-tax-calculator.cliente") },
    { definicion: propertyTaxCalculator, contenido: contenidoPropertyTaxCalculator, cliente: () => import("./calculadoras/property-tax-calculator.cliente") },
    { definicion: provisionalSalariesTax, contenido: contenidoProvisionalSalariesTax, cliente: () => import("./calculadoras/provisional-salaries-tax.cliente") },
    { definicion: salariesTaxCalculator, contenido: contenidoSalariesTaxCalculator, cliente: () => import("./calculadoras/salaries-tax-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
