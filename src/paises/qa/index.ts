import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import corporateTaxCalculator from "./calculadoras/corporate-tax-calculator";
import contenidoCorporateTaxCalculator from "./contenido/corporate-tax-calculator";
import domesticWorkerGratuity from "./calculadoras/domestic-worker-gratuity";
import contenidoDomesticWorkerGratuity from "./contenido/domestic-worker-gratuity";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import exciseTaxCalculator from "./calculadoras/excise-tax-calculator";
import contenidoExciseTaxCalculator from "./contenido/excise-tax-calculator";
import finalSettlement from "./calculadoras/final-settlement";
import contenidoFinalSettlement from "./contenido/final-settlement";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import grsiaContributionCalculator from "./calculadoras/grsia-contribution-calculator";
import contenidoGrsiaContributionCalculator from "./contenido/grsia-contribution-calculator";
import maternityLeavePay from "./calculadoras/maternity-leave-pay";
import contenidoMaternityLeavePay from "./contenido/maternity-leave-pay";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import pensionCalculator from "./calculadoras/pension-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import propertyRegistrationFee from "./calculadoras/property-registration-fee";
import contenidoPropertyRegistrationFee from "./contenido/property-registration-fee";
import qarUsdConverter from "./calculadoras/qar-usd-converter";
import contenidoQarUsdConverter from "./contenido/qar-usd-converter";
import ramadanWorkingHours from "./calculadoras/ramadan-working-hours";
import contenidoRamadanWorkingHours from "./contenido/ramadan-working-hours";
import sickLeavePay from "./calculadoras/sick-leave-pay";
import contenidoSickLeavePay from "./contenido/sick-leave-pay";
import sugarTaxCalculator from "./calculadoras/sugar-tax-calculator";
import contenidoSugarTaxCalculator from "./contenido/sugar-tax-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
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
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: corporateTaxCalculator, contenido: contenidoCorporateTaxCalculator, cliente: () => import("./calculadoras/corporate-tax-calculator.cliente") },
    { definicion: domesticWorkerGratuity, contenido: contenidoDomesticWorkerGratuity, cliente: () => import("./calculadoras/domestic-worker-gratuity.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: exciseTaxCalculator, contenido: contenidoExciseTaxCalculator, cliente: () => import("./calculadoras/excise-tax-calculator.cliente") },
    { definicion: finalSettlement, contenido: contenidoFinalSettlement, cliente: () => import("./calculadoras/final-settlement.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: grsiaContributionCalculator, contenido: contenidoGrsiaContributionCalculator, cliente: () => import("./calculadoras/grsia-contribution-calculator.cliente") },
    { definicion: maternityLeavePay, contenido: contenidoMaternityLeavePay, cliente: () => import("./calculadoras/maternity-leave-pay.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: pensionCalculator, contenido: contenidoPensionCalculator, cliente: () => import("./calculadoras/pension-calculator.cliente") },
    { definicion: propertyRegistrationFee, contenido: contenidoPropertyRegistrationFee, cliente: () => import("./calculadoras/property-registration-fee.cliente") },
    { definicion: qarUsdConverter, contenido: contenidoQarUsdConverter, cliente: () => import("./calculadoras/qar-usd-converter.cliente") },
    { definicion: ramadanWorkingHours, contenido: contenidoRamadanWorkingHours, cliente: () => import("./calculadoras/ramadan-working-hours.cliente") },
    { definicion: sickLeavePay, contenido: contenidoSickLeavePay, cliente: () => import("./calculadoras/sick-leave-pay.cliente") },
    { definicion: sugarTaxCalculator, contenido: contenidoSugarTaxCalculator, cliente: () => import("./calculadoras/sugar-tax-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
