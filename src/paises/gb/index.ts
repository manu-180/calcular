import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import nationalInsuranceCalculator from "./calculadoras/national-insurance-calculator";
import contenidoNationalInsuranceCalculator from "./contenido/national-insurance-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import studentLoanRepayment from "./calculadoras/student-loan-repayment";
import contenidoStudentLoanRepayment from "./contenido/student-loan-repayment";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import redundancyPay from "./calculadoras/redundancy-pay";
import contenidoRedundancyPay from "./contenido/redundancy-pay";
import holidayEntitlement from "./calculadoras/holiday-entitlement";
import contenidoHolidayEntitlement from "./contenido/holiday-entitlement";
import maternityPay from "./calculadoras/maternity-pay";
import contenidoMaternityPay from "./contenido/maternity-pay";
import statutorySickPay from "./calculadoras/statutory-sick-pay";
import contenidoStatutorySickPay from "./contenido/statutory-sick-pay";
import selfEmployedTax from "./calculadoras/self-employed-tax";
import contenidoSelfEmployedTax from "./contenido/self-employed-tax";
import dividendTax from "./calculadoras/dividend-tax";
import contenidoDividendTax from "./contenido/dividend-tax";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import pensionTaxRelief from "./calculadoras/pension-tax-relief";
import contenidoPensionTaxRelief from "./contenido/pension-tax-relief";
import employerNiCalculator from "./calculadoras/employer-ni-calculator";
import contenidoEmployerNiCalculator from "./contenido/employer-ni-calculator";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
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
    { definicion: nationalInsuranceCalculator, contenido: contenidoNationalInsuranceCalculator, cliente: () => import("./calculadoras/national-insurance-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: studentLoanRepayment, contenido: contenidoStudentLoanRepayment, cliente: () => import("./calculadoras/student-loan-repayment.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: redundancyPay, contenido: contenidoRedundancyPay, cliente: () => import("./calculadoras/redundancy-pay.cliente") },
    { definicion: holidayEntitlement, contenido: contenidoHolidayEntitlement, cliente: () => import("./calculadoras/holiday-entitlement.cliente") },
    { definicion: maternityPay, contenido: contenidoMaternityPay, cliente: () => import("./calculadoras/maternity-pay.cliente") },
    { definicion: statutorySickPay, contenido: contenidoStatutorySickPay, cliente: () => import("./calculadoras/statutory-sick-pay.cliente") },
    { definicion: selfEmployedTax, contenido: contenidoSelfEmployedTax, cliente: () => import("./calculadoras/self-employed-tax.cliente") },
    { definicion: dividendTax, contenido: contenidoDividendTax, cliente: () => import("./calculadoras/dividend-tax.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: pensionTaxRelief, contenido: contenidoPensionTaxRelief, cliente: () => import("./calculadoras/pension-tax-relief.cliente") },
    { definicion: employerNiCalculator, contenido: contenidoEmployerNiCalculator, cliente: () => import("./calculadoras/employer-ni-calculator.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
