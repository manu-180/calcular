import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryTax from "./calculadoras/salary-tax";
import contenidoSalaryTax from "./contenido/salary-tax";
import bonusTax from "./calculadoras/bonus-tax";
import contenidoBonusTax from "./contenido/bonus-tax";
import fringeBenefitTax from "./calculadoras/fringe-benefit-tax";
import contenidoFringeBenefitTax from "./contenido/fringe-benefit-tax";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import overtimePay from "./calculadoras/overtime-pay";
import contenidoOvertimePay from "./contenido/overtime-pay";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import seniorityPay from "./calculadoras/seniority-pay";
import contenidoSeniorityPay from "./contenido/seniority-pay";
import netSalary from "./calculadoras/net-salary";
import contenidoNetSalary from "./contenido/net-salary";
import nssfContribution from "./calculadoras/nssf-contribution";
import contenidoNssfContribution from "./contenido/nssf-contribution";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import taxOnIncome from "./calculadoras/tax-on-income";
import contenidoTaxOnIncome from "./contenido/tax-on-income";
import prepaymentTax from "./calculadoras/prepayment-tax";
import contenidoPrepaymentTax from "./contenido/prepayment-tax";
import propertyTax from "./calculadoras/property-tax";
import contenidoPropertyTax from "./contenido/property-tax";
import transferTax from "./calculadoras/transfer-tax";
import contenidoTransferTax from "./contenido/transfer-tax";
import rentalTax from "./calculadoras/rental-tax";
import contenidoRentalTax from "./contenido/rental-tax";
import unusedLandTax from "./calculadoras/unused-land-tax";
import contenidoUnusedLandTax from "./contenido/unused-land-tax";
import patentTax from "./calculadoras/patent-tax";
import contenidoPatentTax from "./contenido/patent-tax";
import withholdingTax from "./calculadoras/withholding-tax";
import contenidoWithholdingTax from "./contenido/withholding-tax";
import specificTax from "./calculadoras/specific-tax";
import contenidoSpecificTax from "./contenido/specific-tax";
import accommodationTax from "./calculadoras/accommodation-tax";
import contenidoAccommodationTax from "./contenido/accommodation-tax";
import exchangeRate from "./calculadoras/exchange-rate";
import contenidoExchangeRate from "./contenido/exchange-rate";
import inflation from "./calculadoras/inflation";
import contenidoInflation from "./contenido/inflation";
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
    { definicion: salaryTax, contenido: contenidoSalaryTax, cliente: () => import("./calculadoras/salary-tax.cliente") },
    { definicion: bonusTax, contenido: contenidoBonusTax, cliente: () => import("./calculadoras/bonus-tax.cliente") },
    { definicion: fringeBenefitTax, contenido: contenidoFringeBenefitTax, cliente: () => import("./calculadoras/fringe-benefit-tax.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: overtimePay, contenido: contenidoOvertimePay, cliente: () => import("./calculadoras/overtime-pay.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: seniorityPay, contenido: contenidoSeniorityPay, cliente: () => import("./calculadoras/seniority-pay.cliente") },
    { definicion: netSalary, contenido: contenidoNetSalary, cliente: () => import("./calculadoras/net-salary.cliente") },
    { definicion: nssfContribution, contenido: contenidoNssfContribution, cliente: () => import("./calculadoras/nssf-contribution.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: taxOnIncome, contenido: contenidoTaxOnIncome, cliente: () => import("./calculadoras/tax-on-income.cliente") },
    { definicion: prepaymentTax, contenido: contenidoPrepaymentTax, cliente: () => import("./calculadoras/prepayment-tax.cliente") },
    { definicion: propertyTax, contenido: contenidoPropertyTax, cliente: () => import("./calculadoras/property-tax.cliente") },
    { definicion: transferTax, contenido: contenidoTransferTax, cliente: () => import("./calculadoras/transfer-tax.cliente") },
    { definicion: rentalTax, contenido: contenidoRentalTax, cliente: () => import("./calculadoras/rental-tax.cliente") },
    { definicion: unusedLandTax, contenido: contenidoUnusedLandTax, cliente: () => import("./calculadoras/unused-land-tax.cliente") },
    { definicion: patentTax, contenido: contenidoPatentTax, cliente: () => import("./calculadoras/patent-tax.cliente") },
    { definicion: withholdingTax, contenido: contenidoWithholdingTax, cliente: () => import("./calculadoras/withholding-tax.cliente") },
    { definicion: specificTax, contenido: contenidoSpecificTax, cliente: () => import("./calculadoras/specific-tax.cliente") },
    { definicion: accommodationTax, contenido: contenidoAccommodationTax, cliente: () => import("./calculadoras/accommodation-tax.cliente") },
    { definicion: exchangeRate, contenido: contenidoExchangeRate, cliente: () => import("./calculadoras/exchange-rate.cliente") },
    { definicion: inflation, contenido: contenidoInflation, cliente: () => import("./calculadoras/inflation.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
