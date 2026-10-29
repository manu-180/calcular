import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import grossSalaryCalculator from "./calculadoras/gross-salary-calculator";
import contenidoGrossSalaryCalculator from "./contenido/gross-salary-calculator";
import pensionContributionCalculator from "./calculadoras/pension-contribution-calculator";
import contenidoPensionContributionCalculator from "./contenido/pension-contribution-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import pensionCalculator from "./calculadoras/pension-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import publicHolidayPayCalculator from "./calculadoras/public-holiday-pay-calculator";
import contenidoPublicHolidayPayCalculator from "./contenido/public-holiday-pay-calculator";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import finalSettlementCalculator from "./calculadoras/final-settlement-calculator";
import contenidoFinalSettlementCalculator from "./contenido/final-settlement-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import rentalIncomeTaxCalculator from "./calculadoras/rental-income-tax-calculator";
import contenidoRentalIncomeTaxCalculator from "./contenido/rental-income-tax-calculator";
import businessIncomeTaxCalculator from "./calculadoras/business-income-tax-calculator";
import contenidoBusinessIncomeTaxCalculator from "./contenido/business-income-tax-calculator";
import dividendTaxCalculator from "./calculadoras/dividend-tax-calculator";
import contenidoDividendTaxCalculator from "./contenido/dividend-tax-calculator";
import dollarToBirr from "./calculadoras/dollar-to-birr";
import contenidoDollarToBirr from "./contenido/dollar-to-birr";
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
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: grossSalaryCalculator, contenido: contenidoGrossSalaryCalculator, cliente: () => import("./calculadoras/gross-salary-calculator.cliente") },
    { definicion: pensionContributionCalculator, contenido: contenidoPensionContributionCalculator, cliente: () => import("./calculadoras/pension-contribution-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: pensionCalculator, contenido: contenidoPensionCalculator, cliente: () => import("./calculadoras/pension-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: publicHolidayPayCalculator, contenido: contenidoPublicHolidayPayCalculator, cliente: () => import("./calculadoras/public-holiday-pay-calculator.cliente") },
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: finalSettlementCalculator, contenido: contenidoFinalSettlementCalculator, cliente: () => import("./calculadoras/final-settlement-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: rentalIncomeTaxCalculator, contenido: contenidoRentalIncomeTaxCalculator, cliente: () => import("./calculadoras/rental-income-tax-calculator.cliente") },
    { definicion: businessIncomeTaxCalculator, contenido: contenidoBusinessIncomeTaxCalculator, cliente: () => import("./calculadoras/business-income-tax-calculator.cliente") },
    { definicion: dividendTaxCalculator, contenido: contenidoDividendTaxCalculator, cliente: () => import("./calculadoras/dividend-tax-calculator.cliente") },
    { definicion: dollarToBirr, contenido: contenidoDollarToBirr, cliente: () => import("./calculadoras/dollar-to-birr.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
