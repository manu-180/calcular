import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import corporateTaxCalculator from "./calculadoras/corporate-tax-calculator";
import contenidoCorporateTaxCalculator from "./contenido/corporate-tax-calculator";
import dewaBillCalculator from "./calculadoras/dewa-bill-calculator";
import contenidoDewaBillCalculator from "./contenido/dewa-bill-calculator";
import dubaiTransferFee from "./calculadoras/dubai-transfer-fee";
import contenidoDubaiTransferFee from "./contenido/dubai-transfer-fee";
import eiborMortgageCalculator from "./calculadoras/eibor-mortgage-calculator";
import contenidoEiborMortgageCalculator from "./contenido/eibor-mortgage-calculator";
import emiratiMinimumWage from "./calculadoras/emirati-minimum-wage";
import contenidoEmiratiMinimumWage from "./contenido/emirati-minimum-wage";
import emiratisationContribution from "./calculadoras/emiratisation-contribution";
import contenidoEmiratisationContribution from "./contenido/emiratisation-contribution";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import gpssaContributionCalculator from "./calculadoras/gpssa-contribution-calculator";
import contenidoGpssaContributionCalculator from "./contenido/gpssa-contribution-calculator";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import maternityLeavePay from "./calculadoras/maternity-leave-pay";
import contenidoMaternityLeavePay from "./contenido/maternity-leave-pay";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import rentalYieldCalculator from "./calculadoras/rental-yield-calculator";
import contenidoRentalYieldCalculator from "./contenido/rental-yield-calculator";
import sickLeavePay from "./calculadoras/sick-leave-pay";
import contenidoSickLeavePay from "./contenido/sick-leave-pay";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import touristVatRefund from "./calculadoras/tourist-vat-refund";
import contenidoTouristVatRefund from "./contenido/tourist-vat-refund";
import unemploymentInsurance from "./calculadoras/unemployment-insurance";
import contenidoUnemploymentInsurance from "./contenido/unemployment-insurance";
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
    { definicion: dewaBillCalculator, contenido: contenidoDewaBillCalculator, cliente: () => import("./calculadoras/dewa-bill-calculator.cliente") },
    { definicion: dubaiTransferFee, contenido: contenidoDubaiTransferFee, cliente: () => import("./calculadoras/dubai-transfer-fee.cliente") },
    { definicion: eiborMortgageCalculator, contenido: contenidoEiborMortgageCalculator, cliente: () => import("./calculadoras/eibor-mortgage-calculator.cliente") },
    { definicion: emiratiMinimumWage, contenido: contenidoEmiratiMinimumWage, cliente: () => import("./calculadoras/emirati-minimum-wage.cliente") },
    { definicion: emiratisationContribution, contenido: contenidoEmiratisationContribution, cliente: () => import("./calculadoras/emiratisation-contribution.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: gpssaContributionCalculator, contenido: contenidoGpssaContributionCalculator, cliente: () => import("./calculadoras/gpssa-contribution-calculator.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: maternityLeavePay, contenido: contenidoMaternityLeavePay, cliente: () => import("./calculadoras/maternity-leave-pay.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: rentalYieldCalculator, contenido: contenidoRentalYieldCalculator, cliente: () => import("./calculadoras/rental-yield-calculator.cliente") },
    { definicion: sickLeavePay, contenido: contenidoSickLeavePay, cliente: () => import("./calculadoras/sick-leave-pay.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: touristVatRefund, contenido: contenidoTouristVatRefund, cliente: () => import("./calculadoras/tourist-vat-refund.cliente") },
    { definicion: unemploymentInsurance, contenido: contenidoUnemploymentInsurance, cliente: () => import("./calculadoras/unemployment-insurance.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "ae.vat" } }] },
  novedades,
  detectores,
});
