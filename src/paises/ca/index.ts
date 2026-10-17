import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import canadaChildBenefit from "./calculadoras/canada-child-benefit";
import contenidoCanadaChildBenefit from "./contenido/canada-child-benefit";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import cppCalculator from "./calculadoras/cpp-calculator";
import contenidoCppCalculator from "./contenido/cpp-calculator";
import eiBenefitsCalculator from "./calculadoras/ei-benefits-calculator";
import contenidoEiBenefitsCalculator from "./contenido/ei-benefits-calculator";
import eiPremiumCalculator from "./calculadoras/ei-premium-calculator";
import contenidoEiPremiumCalculator from "./contenido/ei-premium-calculator";
import employerPayrollCost from "./calculadoras/employer-payroll-cost";
import contenidoEmployerPayrollCost from "./contenido/employer-payroll-cost";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import landTransferTax from "./calculadoras/land-transfer-tax";
import contenidoLandTransferTax from "./contenido/land-transfer-tax";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import oasClawback from "./calculadoras/oas-clawback";
import contenidoOasClawback from "./contenido/oas-clawback";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import quebecNoticeOfTermination from "./calculadoras/quebec-notice-of-termination";
import contenidoQuebecNoticeOfTermination from "./contenido/quebec-notice-of-termination";
import quebecOvertime from "./calculadoras/quebec-overtime";
import contenidoQuebecOvertime from "./contenido/quebec-overtime";
import quebecVacationPay from "./calculadoras/quebec-vacation-pay";
import contenidoQuebecVacationPay from "./contenido/quebec-vacation-pay";
import rrspContributionLimit from "./calculadoras/rrsp-contribution-limit";
import contenidoRrspContributionLimit from "./contenido/rrsp-contribution-limit";
import salesTaxCalculator from "./calculadoras/sales-tax-calculator";
import contenidoSalesTaxCalculator from "./contenido/sales-tax-calculator";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import terminationPay from "./calculadoras/termination-pay";
import contenidoTerminationPay from "./contenido/termination-pay";
import tfsaContributionRoom from "./calculadoras/tfsa-contribution-room";
import contenidoTfsaContributionRoom from "./contenido/tfsa-contribution-room";
import usdToCad from "./calculadoras/usd-to-cad";
import contenidoUsdToCad from "./contenido/usd-to-cad";
import vacationPay from "./calculadoras/vacation-pay";
import contenidoVacationPay from "./contenido/vacation-pay";
import variableRateMortgage from "./calculadoras/variable-rate-mortgage";
import contenidoVariableRateMortgage from "./contenido/variable-rate-mortgage";
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
    { definicion: canadaChildBenefit, contenido: contenidoCanadaChildBenefit, cliente: () => import("./calculadoras/canada-child-benefit.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: cppCalculator, contenido: contenidoCppCalculator, cliente: () => import("./calculadoras/cpp-calculator.cliente") },
    { definicion: eiBenefitsCalculator, contenido: contenidoEiBenefitsCalculator, cliente: () => import("./calculadoras/ei-benefits-calculator.cliente") },
    { definicion: eiPremiumCalculator, contenido: contenidoEiPremiumCalculator, cliente: () => import("./calculadoras/ei-premium-calculator.cliente") },
    { definicion: employerPayrollCost, contenido: contenidoEmployerPayrollCost, cliente: () => import("./calculadoras/employer-payroll-cost.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: landTransferTax, contenido: contenidoLandTransferTax, cliente: () => import("./calculadoras/land-transfer-tax.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: oasClawback, contenido: contenidoOasClawback, cliente: () => import("./calculadoras/oas-clawback.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: quebecNoticeOfTermination, contenido: contenidoQuebecNoticeOfTermination, cliente: () => import("./calculadoras/quebec-notice-of-termination.cliente") },
    { definicion: quebecOvertime, contenido: contenidoQuebecOvertime, cliente: () => import("./calculadoras/quebec-overtime.cliente") },
    { definicion: quebecVacationPay, contenido: contenidoQuebecVacationPay, cliente: () => import("./calculadoras/quebec-vacation-pay.cliente") },
    { definicion: rrspContributionLimit, contenido: contenidoRrspContributionLimit, cliente: () => import("./calculadoras/rrsp-contribution-limit.cliente") },
    { definicion: salesTaxCalculator, contenido: contenidoSalesTaxCalculator, cliente: () => import("./calculadoras/sales-tax-calculator.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: terminationPay, contenido: contenidoTerminationPay, cliente: () => import("./calculadoras/termination-pay.cliente") },
    { definicion: tfsaContributionRoom, contenido: contenidoTfsaContributionRoom, cliente: () => import("./calculadoras/tfsa-contribution-room.cliente") },
    { definicion: usdToCad, contenido: contenidoUsdToCad, cliente: () => import("./calculadoras/usd-to-cad.cliente") },
    { definicion: vacationPay, contenido: contenidoVacationPay, cliente: () => import("./calculadoras/vacation-pay.cliente") },
    { definicion: variableRateMortgage, contenido: contenidoVariableRateMortgage, cliente: () => import("./calculadoras/variable-rate-mortgage.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
