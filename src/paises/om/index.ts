import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import employeeCostCalculator from "./calculadoras/employee-cost-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import endOfServiceGratuity from "./calculadoras/end-of-service-gratuity";
import contenidoEndOfServiceGratuity from "./contenido/end-of-service-gratuity";
import finalSettlement from "./calculadoras/final-settlement";
import contenidoFinalSettlement from "./contenido/final-settlement";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import jobSecurityBenefit from "./calculadoras/job-security-benefit";
import contenidoJobSecurityBenefit from "./contenido/job-security-benefit";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import pensionCalculator from "./calculadoras/pension-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import spfContributionCalculator from "./calculadoras/spf-contribution-calculator";
import contenidoSpfContributionCalculator from "./contenido/spf-contribution-calculator";
import unfairDismissalCompensation from "./calculadoras/unfair-dismissal-compensation";
import contenidoUnfairDismissalCompensation from "./contenido/unfair-dismissal-compensation";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import workingHoursCalculator from "./calculadoras/working-hours-calculator";
import contenidoWorkingHoursCalculator from "./contenido/working-hours-calculator";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// El IVA es local (vat-calculator): la universal del mismo concepto se cae sola.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: employeeCostCalculator, contenido: contenidoEmployeeCostCalculator, cliente: () => import("./calculadoras/employee-cost-calculator.cliente") },
    { definicion: endOfServiceGratuity, contenido: contenidoEndOfServiceGratuity, cliente: () => import("./calculadoras/end-of-service-gratuity.cliente") },
    { definicion: finalSettlement, contenido: contenidoFinalSettlement, cliente: () => import("./calculadoras/final-settlement.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: jobSecurityBenefit, contenido: contenidoJobSecurityBenefit, cliente: () => import("./calculadoras/job-security-benefit.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: pensionCalculator, contenido: contenidoPensionCalculator, cliente: () => import("./calculadoras/pension-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: spfContributionCalculator, contenido: contenidoSpfContributionCalculator, cliente: () => import("./calculadoras/spf-contribution-calculator.cliente") },
    { definicion: unfairDismissalCompensation, contenido: contenidoUnfairDismissalCompensation, cliente: () => import("./calculadoras/unfair-dismissal-compensation.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: workingHoursCalculator, contenido: contenidoWorkingHoursCalculator, cliente: () => import("./calculadoras/working-hours-calculator.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
