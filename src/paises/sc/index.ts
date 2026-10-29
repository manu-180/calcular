import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import businessTaxCalculator from "./calculadoras/business-tax-calculator";
import contenidoBusinessTaxCalculator from "./contenido/business-tax-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import immovablePropertyTaxCalculator from "./calculadoras/immovable-property-tax-calculator";
import contenidoImmovablePropertyTaxCalculator from "./contenido/immovable-property-tax-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import presumptiveTaxCalculator from "./calculadoras/presumptive-tax-calculator";
import contenidoPresumptiveTaxCalculator from "./contenido/presumptive-tax-calculator";
import publicHolidayPayCalculator from "./calculadoras/public-holiday-pay-calculator";
import contenidoPublicHolidayPayCalculator from "./contenido/public-holiday-pay-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import spfContributionCalculator from "./calculadoras/spf-contribution-calculator";
import contenidoSpfContributionCalculator from "./contenido/spf-contribution-calculator";
import thirteenthMonthPayCalculator from "./calculadoras/thirteenth-month-pay-calculator";
import contenidoThirteenthMonthPayCalculator from "./contenido/thirteenth-month-pay-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
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
    { definicion: businessTaxCalculator, contenido: contenidoBusinessTaxCalculator, cliente: () => import("./calculadoras/business-tax-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: immovablePropertyTaxCalculator, contenido: contenidoImmovablePropertyTaxCalculator, cliente: () => import("./calculadoras/immovable-property-tax-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: presumptiveTaxCalculator, contenido: contenidoPresumptiveTaxCalculator, cliente: () => import("./calculadoras/presumptive-tax-calculator.cliente") },
    { definicion: publicHolidayPayCalculator, contenido: contenidoPublicHolidayPayCalculator, cliente: () => import("./calculadoras/public-holiday-pay-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: spfContributionCalculator, contenido: contenidoSpfContributionCalculator, cliente: () => import("./calculadoras/spf-contribution-calculator.cliente") },
    { definicion: thirteenthMonthPayCalculator, contenido: contenidoThirteenthMonthPayCalculator, cliente: () => import("./calculadoras/thirteenth-month-pay-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
  ],
  novedades,
  detectores,
  universales: "todas",
});
