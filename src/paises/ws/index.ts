import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import businessIncomeTaxCalculator from "./calculadoras/business-income-tax-calculator";
import contenidoBusinessIncomeTaxCalculator from "./contenido/business-income-tax-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import finalPayCalculator from "./calculadoras/final-pay-calculator";
import contenidoFinalPayCalculator from "./contenido/final-pay-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import netPayCalculator from "./calculadoras/net-pay-calculator";
import contenidoNetPayCalculator from "./contenido/net-pay-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import npfCalculator from "./calculadoras/npf-calculator";
import contenidoNpfCalculator from "./contenido/npf-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import provisionalTaxCalculator from "./calculadoras/provisional-tax-calculator";
import contenidoProvisionalTaxCalculator from "./contenido/provisional-tax-calculator";
import usdToWst from "./calculadoras/usd-to-wst";
import contenidoUsdToWst from "./contenido/usd-to-wst";
import vagstCalculator from "./calculadoras/vagst-calculator";
import contenidoVagstCalculator from "./contenido/vagst-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
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
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: businessIncomeTaxCalculator, contenido: contenidoBusinessIncomeTaxCalculator, cliente: () => import("./calculadoras/business-income-tax-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: finalPayCalculator, contenido: contenidoFinalPayCalculator, cliente: () => import("./calculadoras/final-pay-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: netPayCalculator, contenido: contenidoNetPayCalculator, cliente: () => import("./calculadoras/net-pay-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: npfCalculator, contenido: contenidoNpfCalculator, cliente: () => import("./calculadoras/npf-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: provisionalTaxCalculator, contenido: contenidoProvisionalTaxCalculator, cliente: () => import("./calculadoras/provisional-tax-calculator.cliente") },
    { definicion: usdToWst, contenido: contenidoUsdToWst, cliente: () => import("./calculadoras/usd-to-wst.cliente") },
    { definicion: vagstCalculator, contenido: contenidoVagstCalculator, cliente: () => import("./calculadoras/vagst-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
