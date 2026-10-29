import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import grossSalaryCalculator from "./calculadoras/gross-salary-calculator";
import contenidoGrossSalaryCalculator from "./contenido/gross-salary-calculator";
import fringeBenefitsTax from "./calculadoras/fringe-benefits-tax";
import contenidoFringeBenefitsTax from "./contenido/fringe-benefits-tax";
import companyTaxCalculator from "./calculadoras/company-tax-calculator";
import contenidoCompanyTaxCalculator from "./contenido/company-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import sickLeave from "./calculadoras/sick-leave";
import contenidoSickLeave from "./contenido/sick-leave";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import finalPay from "./calculadoras/final-pay";
import contenidoFinalPay from "./contenido/final-pay";
import maternityLeave from "./calculadoras/maternity-leave";
import contenidoMaternityLeave from "./contenido/maternity-leave";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import pensionLumpSumTax from "./calculadoras/pension-lump-sum-tax";
import contenidoPensionLumpSumTax from "./contenido/pension-lump-sum-tax";
import bonusTaxCalculator from "./calculadoras/bonus-tax-calculator";
import contenidoBonusTaxCalculator from "./contenido/bonus-tax-calculator";
import hourlyRateCalculator from "./calculadoras/hourly-rate-calculator";
import contenidoHourlyRateCalculator from "./contenido/hourly-rate-calculator";
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
    { definicion: grossSalaryCalculator, contenido: contenidoGrossSalaryCalculator, cliente: () => import("./calculadoras/gross-salary-calculator.cliente") },
    { definicion: fringeBenefitsTax, contenido: contenidoFringeBenefitsTax, cliente: () => import("./calculadoras/fringe-benefits-tax.cliente") },
    { definicion: companyTaxCalculator, contenido: contenidoCompanyTaxCalculator, cliente: () => import("./calculadoras/company-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: sickLeave, contenido: contenidoSickLeave, cliente: () => import("./calculadoras/sick-leave.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: finalPay, contenido: contenidoFinalPay, cliente: () => import("./calculadoras/final-pay.cliente") },
    { definicion: maternityLeave, contenido: contenidoMaternityLeave, cliente: () => import("./calculadoras/maternity-leave.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: pensionLumpSumTax, contenido: contenidoPensionLumpSumTax, cliente: () => import("./calculadoras/pension-lump-sum-tax.cliente") },
    { definicion: bonusTaxCalculator, contenido: contenidoBonusTaxCalculator, cliente: () => import("./calculadoras/bonus-tax-calculator.cliente") },
    { definicion: hourlyRateCalculator, contenido: contenidoHourlyRateCalculator, cliente: () => import("./calculadoras/hourly-rate-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
