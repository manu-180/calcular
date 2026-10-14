import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import accLevyCalculator from "./calculadoras/acc-levy-calculator";
import contenidoAccLevyCalculator from "./contenido/acc-levy-calculator";
import brightLineTest from "./calculadoras/bright-line-test";
import contenidoBrightLineTest from "./contenido/bright-line-test";
import esctCalculator from "./calculadoras/esct-calculator";
import contenidoEsctCalculator from "./contenido/esct-calculator";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import holidayPay from "./calculadoras/holiday-pay";
import contenidoHolidayPay from "./contenido/holiday-pay";
import ietcCalculator from "./calculadoras/ietc-calculator";
import contenidoIetcCalculator from "./contenido/ietc-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import kiwisaverCalculator from "./calculadoras/kiwisaver-calculator";
import contenidoKiwisaverCalculator from "./contenido/kiwisaver-calculator";
import kiwisaverGovernmentContribution from "./calculadoras/kiwisaver-government-contribution";
import contenidoKiwisaverGovernmentContribution from "./contenido/kiwisaver-government-contribution";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import parentalLeavePay from "./calculadoras/parental-leave-pay";
import contenidoParentalLeavePay from "./contenido/parental-leave-pay";
import publicHolidayPay from "./calculadoras/public-holiday-pay";
import contenidoPublicHolidayPay from "./contenido/public-holiday-pay";
import redundancyPay from "./calculadoras/redundancy-pay";
import contenidoRedundancyPay from "./contenido/redundancy-pay";
import secondaryTaxCode from "./calculadoras/secondary-tax-code";
import contenidoSecondaryTaxCode from "./contenido/secondary-tax-code";
import sickLeave from "./calculadoras/sick-leave";
import contenidoSickLeave from "./contenido/sick-leave";
import studentLoanRepayment from "./calculadoras/student-loan-repayment";
import contenidoStudentLoanRepayment from "./contenido/student-loan-repayment";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
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
    { definicion: accLevyCalculator, contenido: contenidoAccLevyCalculator, cliente: () => import("./calculadoras/acc-levy-calculator.cliente") },
    { definicion: brightLineTest, contenido: contenidoBrightLineTest, cliente: () => import("./calculadoras/bright-line-test.cliente") },
    { definicion: esctCalculator, contenido: contenidoEsctCalculator, cliente: () => import("./calculadoras/esct-calculator.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: holidayPay, contenido: contenidoHolidayPay, cliente: () => import("./calculadoras/holiday-pay.cliente") },
    { definicion: ietcCalculator, contenido: contenidoIetcCalculator, cliente: () => import("./calculadoras/ietc-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: kiwisaverCalculator, contenido: contenidoKiwisaverCalculator, cliente: () => import("./calculadoras/kiwisaver-calculator.cliente") },
    { definicion: kiwisaverGovernmentContribution, contenido: contenidoKiwisaverGovernmentContribution, cliente: () => import("./calculadoras/kiwisaver-government-contribution.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: parentalLeavePay, contenido: contenidoParentalLeavePay, cliente: () => import("./calculadoras/parental-leave-pay.cliente") },
    { definicion: publicHolidayPay, contenido: contenidoPublicHolidayPay, cliente: () => import("./calculadoras/public-holiday-pay.cliente") },
    { definicion: redundancyPay, contenido: contenidoRedundancyPay, cliente: () => import("./calculadoras/redundancy-pay.cliente") },
    { definicion: secondaryTaxCode, contenido: contenidoSecondaryTaxCode, cliente: () => import("./calculadoras/secondary-tax-code.cliente") },
    { definicion: sickLeave, contenido: contenidoSickLeave, cliente: () => import("./calculadoras/sick-leave.cliente") },
    { definicion: studentLoanRepayment, contenido: contenidoStudentLoanRepayment, cliente: () => import("./calculadoras/student-loan-repayment.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
