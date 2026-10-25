import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import nisNhtEducationTaxCalculator from "./calculadoras/nis-nht-education-tax-calculator";
import contenidoNisNhtEducationTaxCalculator from "./contenido/nis-nht-education-tax-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import vacationLeaveCalculator from "./calculadoras/vacation-leave-calculator";
import contenidoVacationLeaveCalculator from "./contenido/vacation-leave-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import redundancyCalculator from "./calculadoras/redundancy-calculator";
import contenidoRedundancyCalculator from "./contenido/redundancy-calculator";
import gctCalculator from "./calculadoras/gct-calculator";
import contenidoGctCalculator from "./contenido/gct-calculator";
import transferTaxCalculator from "./calculadoras/transfer-tax-calculator";
import contenidoTransferTaxCalculator from "./contenido/transfer-tax-calculator";
import propertyTaxCalculator from "./calculadoras/property-tax-calculator";
import contenidoPropertyTaxCalculator from "./contenido/property-tax-calculator";
import nhtMortgageCalculator from "./calculadoras/nht-mortgage-calculator";
import contenidoNhtMortgageCalculator from "./contenido/nht-mortgage-calculator";
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
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: nisNhtEducationTaxCalculator, contenido: contenidoNisNhtEducationTaxCalculator, cliente: () => import("./calculadoras/nis-nht-education-tax-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: vacationLeaveCalculator, contenido: contenidoVacationLeaveCalculator, cliente: () => import("./calculadoras/vacation-leave-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: redundancyCalculator, contenido: contenidoRedundancyCalculator, cliente: () => import("./calculadoras/redundancy-calculator.cliente") },
    { definicion: gctCalculator, contenido: contenidoGctCalculator, cliente: () => import("./calculadoras/gct-calculator.cliente") },
    { definicion: transferTaxCalculator, contenido: contenidoTransferTaxCalculator, cliente: () => import("./calculadoras/transfer-tax-calculator.cliente") },
    { definicion: propertyTaxCalculator, contenido: contenidoPropertyTaxCalculator, cliente: () => import("./calculadoras/property-tax-calculator.cliente") },
    { definicion: nhtMortgageCalculator, contenido: contenidoNhtMortgageCalculator, cliente: () => import("./calculadoras/nht-mortgage-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
