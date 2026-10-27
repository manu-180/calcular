import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import contractorTax from "./calculadoras/contractor-tax";
import contenidoContractorTax from "./contenido/contractor-tax";
import corporateIncomeTax from "./calculadoras/corporate-income-tax";
import contenidoCorporateIncomeTax from "./contenido/corporate-income-tax";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import exchangeRate from "./calculadoras/exchange-rate";
import contenidoExchangeRate from "./contenido/exchange-rate";
import exciseTax from "./calculadoras/excise-tax";
import contenidoExciseTax from "./contenido/excise-tax";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import nasscorpContribution from "./calculadoras/nasscorp-contribution";
import contenidoNasscorpContribution from "./contenido/nasscorp-contribution";
import nasscorpPension from "./calculadoras/nasscorp-pension";
import contenidoNasscorpPension from "./contenido/nasscorp-pension";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimePay from "./calculadoras/overtime-pay";
import contenidoOvertimePay from "./contenido/overtime-pay";
import presumptiveTax from "./calculadoras/presumptive-tax";
import contenidoPresumptiveTax from "./contenido/presumptive-tax";
import realPropertyTax from "./calculadoras/real-property-tax";
import contenidoRealPropertyTax from "./contenido/real-property-tax";
import rentalIncomeTax from "./calculadoras/rental-income-tax";
import contenidoRentalIncomeTax from "./contenido/rental-income-tax";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import withholdingTax from "./calculadoras/withholding-tax";
import contenidoWithholdingTax from "./contenido/withholding-tax";
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
    { definicion: contractorTax, contenido: contenidoContractorTax, cliente: () => import("./calculadoras/contractor-tax.cliente") },
    { definicion: corporateIncomeTax, contenido: contenidoCorporateIncomeTax, cliente: () => import("./calculadoras/corporate-income-tax.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: exchangeRate, contenido: contenidoExchangeRate, cliente: () => import("./calculadoras/exchange-rate.cliente") },
    { definicion: exciseTax, contenido: contenidoExciseTax, cliente: () => import("./calculadoras/excise-tax.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: nasscorpContribution, contenido: contenidoNasscorpContribution, cliente: () => import("./calculadoras/nasscorp-contribution.cliente") },
    { definicion: nasscorpPension, contenido: contenidoNasscorpPension, cliente: () => import("./calculadoras/nasscorp-pension.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimePay, contenido: contenidoOvertimePay, cliente: () => import("./calculadoras/overtime-pay.cliente") },
    { definicion: presumptiveTax, contenido: contenidoPresumptiveTax, cliente: () => import("./calculadoras/presumptive-tax.cliente") },
    { definicion: realPropertyTax, contenido: contenidoRealPropertyTax, cliente: () => import("./calculadoras/real-property-tax.cliente") },
    { definicion: rentalIncomeTax, contenido: contenidoRentalIncomeTax, cliente: () => import("./calculadoras/rental-income-tax.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: withholdingTax, contenido: contenidoWithholdingTax, cliente: () => import("./calculadoras/withholding-tax.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
