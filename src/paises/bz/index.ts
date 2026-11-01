import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import socialSecurityCalculator from "./calculadoras/social-security-calculator";
import contenidoSocialSecurityCalculator from "./contenido/social-security-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import vacationPayCalculator from "./calculadoras/vacation-pay-calculator";
import contenidoVacationPayCalculator from "./contenido/vacation-pay-calculator";
import sickLeavePayCalculator from "./calculadoras/sick-leave-pay-calculator";
import contenidoSickLeavePayCalculator from "./contenido/sick-leave-pay-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import noticePayCalculator from "./calculadoras/notice-pay-calculator";
import contenidoNoticePayCalculator from "./contenido/notice-pay-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import finalPayCalculator from "./calculadoras/final-pay-calculator";
import contenidoFinalPayCalculator from "./contenido/final-pay-calculator";
import usdToBzd from "./calculadoras/usd-to-bzd";
import contenidoUsdToBzd from "./contenido/usd-to-bzd";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
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
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: socialSecurityCalculator, contenido: contenidoSocialSecurityCalculator, cliente: () => import("./calculadoras/social-security-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: vacationPayCalculator, contenido: contenidoVacationPayCalculator, cliente: () => import("./calculadoras/vacation-pay-calculator.cliente") },
    { definicion: sickLeavePayCalculator, contenido: contenidoSickLeavePayCalculator, cliente: () => import("./calculadoras/sick-leave-pay-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: noticePayCalculator, contenido: contenidoNoticePayCalculator, cliente: () => import("./calculadoras/notice-pay-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: finalPayCalculator, contenido: contenidoFinalPayCalculator, cliente: () => import("./calculadoras/final-pay-calculator.cliente") },
    { definicion: usdToBzd, contenido: contenidoUsdToBzd, cliente: () => import("./calculadoras/usd-to-bzd.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
