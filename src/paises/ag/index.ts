import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import abstCalculator from "./calculadoras/abst-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import maternityAllowanceCalculator from "./calculadoras/maternity-allowance-calculator";
import medicalBenefitsCalculator from "./calculadoras/medical-benefits-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import publicHolidayPayCalculator from "./calculadoras/public-holiday-pay-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import sicknessBenefitCalculator from "./calculadoras/sickness-benefit-calculator";
import sickLeavePayCalculator from "./calculadoras/sick-leave-pay-calculator";
import socialSecurityCalculator from "./calculadoras/social-security-calculator";
import takeHomePayCalculator from "./calculadoras/take-home-pay-calculator";
import unincorporatedBusinessTaxCalculator from "./calculadoras/unincorporated-business-tax-calculator";
import usdToXcd from "./calculadoras/usd-to-xcd";
import vacationLeaveCalculator from "./calculadoras/vacation-leave-calculator";
import contenidoAbstCalculator from "./contenido/abst-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import contenidoMaternityAllowanceCalculator from "./contenido/maternity-allowance-calculator";
import contenidoMedicalBenefitsCalculator from "./contenido/medical-benefits-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import contenidoPublicHolidayPayCalculator from "./contenido/public-holiday-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import contenidoSicknessBenefitCalculator from "./contenido/sickness-benefit-calculator";
import contenidoSickLeavePayCalculator from "./contenido/sick-leave-pay-calculator";
import contenidoSocialSecurityCalculator from "./contenido/social-security-calculator";
import contenidoTakeHomePayCalculator from "./contenido/take-home-pay-calculator";
import contenidoUnincorporatedBusinessTaxCalculator from "./contenido/unincorporated-business-tax-calculator";
import contenidoUsdToXcd from "./contenido/usd-to-xcd";
import contenidoVacationLeaveCalculator from "./contenido/vacation-leave-calculator";
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
    { definicion: abstCalculator, contenido: contenidoAbstCalculator, cliente: () => import("./calculadoras/abst-calculator.cliente") },
    { definicion: socialSecurityCalculator, contenido: contenidoSocialSecurityCalculator, cliente: () => import("./calculadoras/social-security-calculator.cliente") },
    { definicion: medicalBenefitsCalculator, contenido: contenidoMedicalBenefitsCalculator, cliente: () => import("./calculadoras/medical-benefits-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: publicHolidayPayCalculator, contenido: contenidoPublicHolidayPayCalculator, cliente: () => import("./calculadoras/public-holiday-pay-calculator.cliente") },
    { definicion: vacationLeaveCalculator, contenido: contenidoVacationLeaveCalculator, cliente: () => import("./calculadoras/vacation-leave-calculator.cliente") },
    { definicion: sickLeavePayCalculator, contenido: contenidoSickLeavePayCalculator, cliente: () => import("./calculadoras/sick-leave-pay-calculator.cliente") },
    { definicion: sicknessBenefitCalculator, contenido: contenidoSicknessBenefitCalculator, cliente: () => import("./calculadoras/sickness-benefit-calculator.cliente") },
    { definicion: maternityAllowanceCalculator, contenido: contenidoMaternityAllowanceCalculator, cliente: () => import("./calculadoras/maternity-allowance-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: unincorporatedBusinessTaxCalculator, contenido: contenidoUnincorporatedBusinessTaxCalculator, cliente: () => import("./calculadoras/unincorporated-business-tax-calculator.cliente") },
    { definicion: takeHomePayCalculator, contenido: contenidoTakeHomePayCalculator, cliente: () => import("./calculadoras/take-home-pay-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: usdToXcd, contenido: contenidoUsdToXcd, cliente: () => import("./calculadoras/usd-to-xcd.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
