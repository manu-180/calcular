import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import ssfCalculator from "./calculadoras/ssf-calculator";
import contenidoSsfCalculator from "./contenido/ssf-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import minimumWageInNepal from "./calculadoras/minimum-wage-in-nepal";
import contenidoMinimumWageInNepal from "./contenido/minimum-wage-in-nepal";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import homeLeaveCalculator from "./calculadoras/home-leave-calculator";
import contenidoHomeLeaveCalculator from "./contenido/home-leave-calculator";
import dashainBonusCalculator from "./calculadoras/dashain-bonus-calculator";
import contenidoDashainBonusCalculator from "./contenido/dashain-bonus-calculator";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import turnoverTaxCalculator from "./calculadoras/turnover-tax-calculator";
import contenidoTurnoverTaxCalculator from "./contenido/turnover-tax-calculator";
import dollarRateInNepal from "./calculadoras/dollar-rate-in-nepal";
import contenidoDollarRateInNepal from "./contenido/dollar-rate-in-nepal";
import indianRupeeToNpr from "./calculadoras/indian-rupee-to-npr";
import contenidoIndianRupeeToNpr from "./contenido/indian-rupee-to-npr";
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
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: ssfCalculator, contenido: contenidoSsfCalculator, cliente: () => import("./calculadoras/ssf-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: minimumWageInNepal, contenido: contenidoMinimumWageInNepal, cliente: () => import("./calculadoras/minimum-wage-in-nepal.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: homeLeaveCalculator, contenido: contenidoHomeLeaveCalculator, cliente: () => import("./calculadoras/home-leave-calculator.cliente") },
    { definicion: dashainBonusCalculator, contenido: contenidoDashainBonusCalculator, cliente: () => import("./calculadoras/dashain-bonus-calculator.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: turnoverTaxCalculator, contenido: contenidoTurnoverTaxCalculator, cliente: () => import("./calculadoras/turnover-tax-calculator.cliente") },
    { definicion: dollarRateInNepal, contenido: contenidoDollarRateInNepal, cliente: () => import("./calculadoras/dollar-rate-in-nepal.cliente") },
    { definicion: indianRupeeToNpr, contenido: contenidoIndianRupeeToNpr, cliente: () => import("./calculadoras/indian-rupee-to-npr.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
