import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import corporateTaxCalculator from "./calculadoras/corporate-tax-calculator";
import contenidoCorporateTaxCalculator from "./contenido/corporate-tax-calculator";
import dollarToNgultrum from "./calculadoras/dollar-to-ngultrum";
import contenidoDollarToNgultrum from "./contenido/dollar-to-ngultrum";
import finalPayDeadlineCalculator from "./calculadoras/final-pay-deadline-calculator";
import contenidoFinalPayDeadlineCalculator from "./contenido/final-pay-deadline-calculator";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import gstRegistrationCalculator from "./calculadoras/gst-registration-calculator";
import contenidoGstRegistrationCalculator from "./contenido/gst-registration-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import ngultrumToRupee from "./calculadoras/ngultrum-to-rupee";
import contenidoNgultrumToRupee from "./contenido/ngultrum-to-rupee";
import nightDutyPayCalculator from "./calculadoras/night-duty-pay-calculator";
import contenidoNightDutyPayCalculator from "./contenido/night-duty-pay-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import overtimePayCalculator from "./calculadoras/overtime-pay-calculator";
import contenidoOvertimePayCalculator from "./contenido/overtime-pay-calculator";
import presumptiveTaxCalculator from "./calculadoras/presumptive-tax-calculator";
import contenidoPresumptiveTaxCalculator from "./contenido/presumptive-tax-calculator";
import privateProvidentFundCalculator from "./calculadoras/private-provident-fund-calculator";
import contenidoPrivateProvidentFundCalculator from "./contenido/private-provident-fund-calculator";
import probationPeriodCalculator from "./calculadoras/probation-period-calculator";
import contenidoProbationPeriodCalculator from "./contenido/probation-period-calculator";
import publicHolidayPayCalculator from "./calculadoras/public-holiday-pay-calculator";
import contenidoPublicHolidayPayCalculator from "./contenido/public-holiday-pay-calculator";
import rentalIncomeTaxCalculator from "./calculadoras/rental-income-tax-calculator";
import contenidoRentalIncomeTaxCalculator from "./contenido/rental-income-tax-calculator";
import salaryDeductionLimitCalculator from "./calculadoras/salary-deduction-limit-calculator";
import contenidoSalaryDeductionLimitCalculator from "./contenido/salary-deduction-limit-calculator";
import takeHomePayCalculator from "./calculadoras/take-home-pay-calculator";
import contenidoTakeHomePayCalculator from "./contenido/take-home-pay-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import wrongfulDismissalCompensationCalculator from "./calculadoras/wrongful-dismissal-compensation-calculator";
import contenidoWrongfulDismissalCompensationCalculator from "./contenido/wrongful-dismissal-compensation-calculator";
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
    { definicion: corporateTaxCalculator, contenido: contenidoCorporateTaxCalculator, cliente: () => import("./calculadoras/corporate-tax-calculator.cliente") },
    { definicion: dollarToNgultrum, contenido: contenidoDollarToNgultrum, cliente: () => import("./calculadoras/dollar-to-ngultrum.cliente") },
    { definicion: finalPayDeadlineCalculator, contenido: contenidoFinalPayDeadlineCalculator, cliente: () => import("./calculadoras/final-pay-deadline-calculator.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: gstRegistrationCalculator, contenido: contenidoGstRegistrationCalculator, cliente: () => import("./calculadoras/gst-registration-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: ngultrumToRupee, contenido: contenidoNgultrumToRupee, cliente: () => import("./calculadoras/ngultrum-to-rupee.cliente") },
    { definicion: nightDutyPayCalculator, contenido: contenidoNightDutyPayCalculator, cliente: () => import("./calculadoras/night-duty-pay-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: overtimePayCalculator, contenido: contenidoOvertimePayCalculator, cliente: () => import("./calculadoras/overtime-pay-calculator.cliente") },
    { definicion: presumptiveTaxCalculator, contenido: contenidoPresumptiveTaxCalculator, cliente: () => import("./calculadoras/presumptive-tax-calculator.cliente") },
    { definicion: privateProvidentFundCalculator, contenido: contenidoPrivateProvidentFundCalculator, cliente: () => import("./calculadoras/private-provident-fund-calculator.cliente") },
    { definicion: probationPeriodCalculator, contenido: contenidoProbationPeriodCalculator, cliente: () => import("./calculadoras/probation-period-calculator.cliente") },
    { definicion: publicHolidayPayCalculator, contenido: contenidoPublicHolidayPayCalculator, cliente: () => import("./calculadoras/public-holiday-pay-calculator.cliente") },
    { definicion: rentalIncomeTaxCalculator, contenido: contenidoRentalIncomeTaxCalculator, cliente: () => import("./calculadoras/rental-income-tax-calculator.cliente") },
    { definicion: salaryDeductionLimitCalculator, contenido: contenidoSalaryDeductionLimitCalculator, cliente: () => import("./calculadoras/salary-deduction-limit-calculator.cliente") },
    { definicion: takeHomePayCalculator, contenido: contenidoTakeHomePayCalculator, cliente: () => import("./calculadoras/take-home-pay-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: wrongfulDismissalCompensationCalculator, contenido: contenidoWrongfulDismissalCompensationCalculator, cliente: () => import("./calculadoras/wrongful-dismissal-compensation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
