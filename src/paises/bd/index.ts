import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import salaryTaxCalculator from "./calculadoras/salary-tax-calculator";
import taxRebateCalculator from "./calculadoras/tax-rebate-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import tdsCalculator from "./calculadoras/tds-calculator";
import sanchayapatraCalculator from "./calculadoras/sanchayapatra-calculator";
import fdrCalculator from "./calculadoras/fdr-calculator";
import dpsCalculator from "./calculadoras/dps-calculator";
import providentFundCalculator from "./calculadoras/provident-fund-calculator";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import serviceBenefitCalculator from "./calculadoras/service-benefit-calculator";
import retrenchmentCalculator from "./calculadoras/retrenchment-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import leaveCalculator from "./calculadoras/leave-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import maternityBenefitCalculator from "./calculadoras/maternity-benefit-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import workingDaysCalculator from "./calculadoras/working-days-calculator";
import addWorkingDays from "./calculadoras/add-working-days";
import inflationCalculator from "./calculadoras/inflation-calculator";
import dollarRate from "./calculadoras/dollar-rate";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import contenidoSalaryTaxCalculator from "./contenido/salary-tax-calculator";
import contenidoTaxRebateCalculator from "./contenido/tax-rebate-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import contenidoTdsCalculator from "./contenido/tds-calculator";
import contenidoSanchayapatraCalculator from "./contenido/sanchayapatra-calculator";
import contenidoFdrCalculator from "./contenido/fdr-calculator";
import contenidoDpsCalculator from "./contenido/dps-calculator";
import contenidoProvidentFundCalculator from "./contenido/provident-fund-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import contenidoServiceBenefitCalculator from "./contenido/service-benefit-calculator";
import contenidoRetrenchmentCalculator from "./contenido/retrenchment-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import contenidoLeaveCalculator from "./contenido/leave-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import contenidoMaternityBenefitCalculator from "./contenido/maternity-benefit-calculator";
import contenidoMinimumWage from "./contenido/minimum-wage";
import contenidoWorkingDaysCalculator from "./contenido/working-days-calculator";
import contenidoAddWorkingDays from "./contenido/add-working-days";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import contenidoDollarRate from "./contenido/dollar-rate";
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
    { definicion: salaryTaxCalculator, contenido: contenidoSalaryTaxCalculator, cliente: () => import("./calculadoras/salary-tax-calculator.cliente") },
    { definicion: taxRebateCalculator, contenido: contenidoTaxRebateCalculator, cliente: () => import("./calculadoras/tax-rebate-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: tdsCalculator, contenido: contenidoTdsCalculator, cliente: () => import("./calculadoras/tds-calculator.cliente") },
    { definicion: sanchayapatraCalculator, contenido: contenidoSanchayapatraCalculator, cliente: () => import("./calculadoras/sanchayapatra-calculator.cliente") },
    { definicion: fdrCalculator, contenido: contenidoFdrCalculator, cliente: () => import("./calculadoras/fdr-calculator.cliente") },
    { definicion: dpsCalculator, contenido: contenidoDpsCalculator, cliente: () => import("./calculadoras/dps-calculator.cliente") },
    { definicion: providentFundCalculator, contenido: contenidoProvidentFundCalculator, cliente: () => import("./calculadoras/provident-fund-calculator.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: serviceBenefitCalculator, contenido: contenidoServiceBenefitCalculator, cliente: () => import("./calculadoras/service-benefit-calculator.cliente") },
    { definicion: retrenchmentCalculator, contenido: contenidoRetrenchmentCalculator, cliente: () => import("./calculadoras/retrenchment-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: leaveCalculator, contenido: contenidoLeaveCalculator, cliente: () => import("./calculadoras/leave-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: maternityBenefitCalculator, contenido: contenidoMaternityBenefitCalculator, cliente: () => import("./calculadoras/maternity-benefit-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: workingDaysCalculator, contenido: contenidoWorkingDaysCalculator, cliente: () => import("./calculadoras/working-days-calculator.cliente") },
    { definicion: addWorkingDays, contenido: contenidoAddWorkingDays, cliente: () => import("./calculadoras/add-working-days.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: dollarRate, contenido: contenidoDollarRate, cliente: () => import("./calculadoras/dollar-rate.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
