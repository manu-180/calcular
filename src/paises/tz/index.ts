import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import nssfContributionCalculator from "./calculadoras/nssf-contribution-calculator";
import contenidoNssfContributionCalculator from "./contenido/nssf-contribution-calculator";
import sdlCalculator from "./calculadoras/sdl-calculator";
import contenidoSdlCalculator from "./contenido/sdl-calculator";
import wcfContributionCalculator from "./calculadoras/wcf-contribution-calculator";
import contenidoWcfContributionCalculator from "./contenido/wcf-contribution-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import nssfPensionCalculator from "./calculadoras/nssf-pension-calculator";
import contenidoNssfPensionCalculator from "./contenido/nssf-pension-calculator";
import nssfMaternityBenefit from "./calculadoras/nssf-maternity-benefit";
import contenidoNssfMaternityBenefit from "./contenido/nssf-maternity-benefit";
import heslbLoanRepayment from "./calculadoras/heslb-loan-repayment";
import contenidoHeslbLoanRepayment from "./contenido/heslb-loan-repayment";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import presumptiveTaxCalculator from "./calculadoras/presumptive-tax-calculator";
import contenidoPresumptiveTaxCalculator from "./contenido/presumptive-tax-calculator";
import transportPresumptiveTax from "./calculadoras/transport-presumptive-tax";
import contenidoTransportPresumptiveTax from "./contenido/transport-presumptive-tax";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import vehicleRegistrationCalculator from "./calculadoras/vehicle-registration-calculator";
import contenidoVehicleRegistrationCalculator from "./contenido/vehicle-registration-calculator";
import taxPenaltyCalculator from "./calculadoras/tax-penalty-calculator";
import contenidoTaxPenaltyCalculator from "./contenido/tax-penalty-calculator";
import dollarToShilling from "./calculadoras/dollar-to-shilling";
import contenidoDollarToShilling from "./contenido/dollar-to-shilling";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
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
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: nssfContributionCalculator, contenido: contenidoNssfContributionCalculator, cliente: () => import("./calculadoras/nssf-contribution-calculator.cliente") },
    { definicion: sdlCalculator, contenido: contenidoSdlCalculator, cliente: () => import("./calculadoras/sdl-calculator.cliente") },
    { definicion: wcfContributionCalculator, contenido: contenidoWcfContributionCalculator, cliente: () => import("./calculadoras/wcf-contribution-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: nssfPensionCalculator, contenido: contenidoNssfPensionCalculator, cliente: () => import("./calculadoras/nssf-pension-calculator.cliente") },
    { definicion: nssfMaternityBenefit, contenido: contenidoNssfMaternityBenefit, cliente: () => import("./calculadoras/nssf-maternity-benefit.cliente") },
    { definicion: heslbLoanRepayment, contenido: contenidoHeslbLoanRepayment, cliente: () => import("./calculadoras/heslb-loan-repayment.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: presumptiveTaxCalculator, contenido: contenidoPresumptiveTaxCalculator, cliente: () => import("./calculadoras/presumptive-tax-calculator.cliente") },
    { definicion: transportPresumptiveTax, contenido: contenidoTransportPresumptiveTax, cliente: () => import("./calculadoras/transport-presumptive-tax.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: vehicleRegistrationCalculator, contenido: contenidoVehicleRegistrationCalculator, cliente: () => import("./calculadoras/vehicle-registration-calculator.cliente") },
    { definicion: taxPenaltyCalculator, contenido: contenidoTaxPenaltyCalculator, cliente: () => import("./calculadoras/tax-penalty-calculator.cliente") },
    { definicion: dollarToShilling, contenido: contenidoDollarToShilling, cliente: () => import("./calculadoras/dollar-to-shilling.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
