import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import earlyRetirementCalculator from "./calculadoras/early-retirement-calculator";
import contenidoEarlyRetirementCalculator from "./contenido/early-retirement-calculator";
import employeeCostCalculator from "./calculadoras/employee-cost-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import endOfServiceCalculator from "./calculadoras/end-of-service-calculator";
import contenidoEndOfServiceCalculator from "./contenido/end-of-service-calculator";
import finalSettlement from "./calculadoras/final-settlement";
import contenidoFinalSettlement from "./contenido/final-settlement";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import jodUsdConverter from "./calculadoras/jod-usd-converter";
import contenidoJodUsdConverter from "./contenido/jod-usd-converter";
import landRegistrationFees from "./calculadoras/land-registration-fees";
import contenidoLandRegistrationFees from "./contenido/land-registration-fees";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import retirementPensionCalculator from "./calculadoras/retirement-pension-calculator";
import contenidoRetirementPensionCalculator from "./contenido/retirement-pension-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import salesTaxCalculator from "./calculadoras/sales-tax-calculator";
import contenidoSalesTaxCalculator from "./contenido/sales-tax-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import socialSecurityCalculator from "./calculadoras/social-security-calculator";
import contenidoSocialSecurityCalculator from "./contenido/social-security-calculator";
import unemploymentBenefitCalculator from "./calculadoras/unemployment-benefit-calculator";
import contenidoUnemploymentBenefitCalculator from "./contenido/unemployment-benefit-calculator";
import unfairDismissalCompensation from "./calculadoras/unfair-dismissal-compensation";
import contenidoUnfairDismissalCompensation from "./contenido/unfair-dismissal-compensation";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// El impuesto a las ventas es local (sales-tax-calculator, con la tasa general y una tasa especial opcional): la universal del mismo concepto se cae sola.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: earlyRetirementCalculator, contenido: contenidoEarlyRetirementCalculator, cliente: () => import("./calculadoras/early-retirement-calculator.cliente") },
    { definicion: employeeCostCalculator, contenido: contenidoEmployeeCostCalculator, cliente: () => import("./calculadoras/employee-cost-calculator.cliente") },
    { definicion: endOfServiceCalculator, contenido: contenidoEndOfServiceCalculator, cliente: () => import("./calculadoras/end-of-service-calculator.cliente") },
    { definicion: finalSettlement, contenido: contenidoFinalSettlement, cliente: () => import("./calculadoras/final-settlement.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: jodUsdConverter, contenido: contenidoJodUsdConverter, cliente: () => import("./calculadoras/jod-usd-converter.cliente") },
    { definicion: landRegistrationFees, contenido: contenidoLandRegistrationFees, cliente: () => import("./calculadoras/land-registration-fees.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: retirementPensionCalculator, contenido: contenidoRetirementPensionCalculator, cliente: () => import("./calculadoras/retirement-pension-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: salesTaxCalculator, contenido: contenidoSalesTaxCalculator, cliente: () => import("./calculadoras/sales-tax-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: socialSecurityCalculator, contenido: contenidoSocialSecurityCalculator, cliente: () => import("./calculadoras/social-security-calculator.cliente") },
    { definicion: unemploymentBenefitCalculator, contenido: contenidoUnemploymentBenefitCalculator, cliente: () => import("./calculadoras/unemployment-benefit-calculator.cliente") },
    { definicion: unfairDismissalCompensation, contenido: contenidoUnfairDismissalCompensation, cliente: () => import("./calculadoras/unfair-dismissal-compensation.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
