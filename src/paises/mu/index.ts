import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import csgCalculator from "./calculadoras/csg-calculator";
import contenidoCsgCalculator from "./contenido/csg-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import salaryCompensationCalculator from "./calculadoras/salary-compensation-calculator";
import contenidoSalaryCompensationCalculator from "./contenido/salary-compensation-calculator";
import endOfYearBonusCalculator from "./calculadoras/end-of-year-bonus-calculator";
import contenidoEndOfYearBonusCalculator from "./contenido/end-of-year-bonus-calculator";
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
import severanceAllowanceCalculator from "./calculadoras/severance-allowance-calculator";
import contenidoSeveranceAllowanceCalculator from "./contenido/severance-allowance-calculator";
import retirementGratuityCalculator from "./calculadoras/retirement-gratuity-calculator";
import contenidoRetirementGratuityCalculator from "./contenido/retirement-gratuity-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import registrationDutyCalculator from "./calculadoras/registration-duty-calculator";
import contenidoRegistrationDutyCalculator from "./contenido/registration-duty-calculator";
import csgIncomeAllowanceCalculator from "./calculadoras/csg-income-allowance-calculator";
import contenidoCsgIncomeAllowanceCalculator from "./contenido/csg-income-allowance-calculator";
import pensionAgeCalculator from "./calculadoras/pension-age-calculator";
import contenidoPensionAgeCalculator from "./contenido/pension-age-calculator";
import rupeeExchangeRate from "./calculadoras/rupee-exchange-rate";
import contenidoRupeeExchangeRate from "./contenido/rupee-exchange-rate";
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
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: csgCalculator, contenido: contenidoCsgCalculator, cliente: () => import("./calculadoras/csg-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: salaryCompensationCalculator, contenido: contenidoSalaryCompensationCalculator, cliente: () => import("./calculadoras/salary-compensation-calculator.cliente") },
    { definicion: endOfYearBonusCalculator, contenido: contenidoEndOfYearBonusCalculator, cliente: () => import("./calculadoras/end-of-year-bonus-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: severanceAllowanceCalculator, contenido: contenidoSeveranceAllowanceCalculator, cliente: () => import("./calculadoras/severance-allowance-calculator.cliente") },
    { definicion: retirementGratuityCalculator, contenido: contenidoRetirementGratuityCalculator, cliente: () => import("./calculadoras/retirement-gratuity-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: registrationDutyCalculator, contenido: contenidoRegistrationDutyCalculator, cliente: () => import("./calculadoras/registration-duty-calculator.cliente") },
    { definicion: csgIncomeAllowanceCalculator, contenido: contenidoCsgIncomeAllowanceCalculator, cliente: () => import("./calculadoras/csg-income-allowance-calculator.cliente") },
    { definicion: pensionAgeCalculator, contenido: contenidoPensionAgeCalculator, cliente: () => import("./calculadoras/pension-age-calculator.cliente") },
    { definicion: rupeeExchangeRate, contenido: contenidoRupeeExchangeRate, cliente: () => import("./calculadoras/rupee-exchange-rate.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
universales: "todas",
  novedades,
  detectores,
});
