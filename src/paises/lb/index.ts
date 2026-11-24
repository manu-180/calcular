import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import salaryTaxCalculator from "./calculadoras/salary-tax-calculator";
import contenidoSalaryTaxCalculator from "./contenido/salary-tax-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import dismissalCompensation from "./calculadoras/dismissal-compensation";
import contenidoDismissalCompensation from "./contenido/dismissal-compensation";
import endOfServiceCalculator from "./calculadoras/end-of-service-calculator";
import contenidoEndOfServiceCalculator from "./contenido/end-of-service-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import familyAllowanceCalculator from "./calculadoras/family-allowance-calculator";
import contenidoFamilyAllowanceCalculator from "./contenido/family-allowance-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import nssfContributions from "./calculadoras/nssf-contributions";
import contenidoNssfContributions from "./contenido/nssf-contributions";
import employeeCostCalculator from "./calculadoras/employee-cost-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import lbpUsdConverter from "./calculadoras/lbp-usd-converter";
import contenidoLbpUsdConverter from "./contenido/lbp-usd-converter";
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
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: salaryTaxCalculator, contenido: contenidoSalaryTaxCalculator, cliente: () => import("./calculadoras/salary-tax-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: dismissalCompensation, contenido: contenidoDismissalCompensation, cliente: () => import("./calculadoras/dismissal-compensation.cliente") },
    { definicion: endOfServiceCalculator, contenido: contenidoEndOfServiceCalculator, cliente: () => import("./calculadoras/end-of-service-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: familyAllowanceCalculator, contenido: contenidoFamilyAllowanceCalculator, cliente: () => import("./calculadoras/family-allowance-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: nssfContributions, contenido: contenidoNssfContributions, cliente: () => import("./calculadoras/nssf-contributions.cliente") },
    { definicion: employeeCostCalculator, contenido: contenidoEmployeeCostCalculator, cliente: () => import("./calculadoras/employee-cost-calculator.cliente") },
    { definicion: lbpUsdConverter, contenido: contenidoLbpUsdConverter, cliente: () => import("./calculadoras/lbp-usd-converter.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
