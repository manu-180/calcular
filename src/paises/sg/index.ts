import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import cpfContributionCalculator from "./calculadoras/cpf-contribution-calculator";
import contenidoCpfContributionCalculator from "./contenido/cpf-contribution-calculator";
import cpfAllocation from "./calculadoras/cpf-allocation";
import contenidoCpfAllocation from "./contenido/cpf-allocation";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import nonResidentTax from "./calculadoras/non-resident-tax";
import contenidoNonResidentTax from "./contenido/non-resident-tax";
import srsTaxSavings from "./calculadoras/srs-tax-savings";
import contenidoSrsTaxSavings from "./contenido/srs-tax-savings";
import buyerStampDuty from "./calculadoras/buyer-stamp-duty";
import contenidoBuyerStampDuty from "./contenido/buyer-stamp-duty";
import absdCalculator from "./calculadoras/absd-calculator";
import contenidoAbsdCalculator from "./contenido/absd-calculator";
import sellerStampDuty from "./calculadoras/seller-stamp-duty";
import contenidoSellerStampDuty from "./contenido/seller-stamp-duty";
import propertyTaxCalculator from "./calculadoras/property-tax-calculator";
import contenidoPropertyTaxCalculator from "./contenido/property-tax-calculator";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import overtimePay from "./calculadoras/overtime-pay";
import contenidoOvertimePay from "./contenido/overtime-pay";
import sickLeave from "./calculadoras/sick-leave";
import contenidoSickLeave from "./contenido/sick-leave";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import retrenchmentBenefit from "./calculadoras/retrenchment-benefit";
import contenidoRetrenchmentBenefit from "./contenido/retrenchment-benefit";
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
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: cpfContributionCalculator, contenido: contenidoCpfContributionCalculator, cliente: () => import("./calculadoras/cpf-contribution-calculator.cliente") },
    { definicion: cpfAllocation, contenido: contenidoCpfAllocation, cliente: () => import("./calculadoras/cpf-allocation.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: nonResidentTax, contenido: contenidoNonResidentTax, cliente: () => import("./calculadoras/non-resident-tax.cliente") },
    { definicion: srsTaxSavings, contenido: contenidoSrsTaxSavings, cliente: () => import("./calculadoras/srs-tax-savings.cliente") },
    { definicion: buyerStampDuty, contenido: contenidoBuyerStampDuty, cliente: () => import("./calculadoras/buyer-stamp-duty.cliente") },
    { definicion: absdCalculator, contenido: contenidoAbsdCalculator, cliente: () => import("./calculadoras/absd-calculator.cliente") },
    { definicion: sellerStampDuty, contenido: contenidoSellerStampDuty, cliente: () => import("./calculadoras/seller-stamp-duty.cliente") },
    { definicion: propertyTaxCalculator, contenido: contenidoPropertyTaxCalculator, cliente: () => import("./calculadoras/property-tax-calculator.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: overtimePay, contenido: contenidoOvertimePay, cliente: () => import("./calculadoras/overtime-pay.cliente") },
    { definicion: sickLeave, contenido: contenidoSickLeave, cliente: () => import("./calculadoras/sick-leave.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: retrenchmentBenefit, contenido: contenidoRetrenchmentBenefit, cliente: () => import("./calculadoras/retrenchment-benefit.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
