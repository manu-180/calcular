import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import endOfYearPayment from "./calculadoras/end-of-year-payment";
import contenidoEndOfYearPayment from "./contenido/end-of-year-payment";
import hiborMortgageCalculator from "./calculadoras/hibor-mortgage-calculator";
import contenidoHiborMortgageCalculator from "./contenido/hibor-mortgage-calculator";
import holidayPay from "./calculadoras/holiday-pay";
import contenidoHolidayPay from "./contenido/holiday-pay";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import longServicePayment from "./calculadoras/long-service-payment";
import contenidoLongServicePayment from "./contenido/long-service-payment";
import maternityLeavePay from "./calculadoras/maternity-leave-pay";
import contenidoMaternityLeavePay from "./contenido/maternity-leave-pay";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import mpfCalculator from "./calculadoras/mpf-calculator";
import contenidoMpfCalculator from "./contenido/mpf-calculator";
import paternityLeavePay from "./calculadoras/paternity-leave-pay";
import contenidoPaternityLeavePay from "./contenido/paternity-leave-pay";
import paymentInLieuOfNotice from "./calculadoras/payment-in-lieu-of-notice";
import contenidoPaymentInLieuOfNotice from "./contenido/payment-in-lieu-of-notice";
import profitsTaxCalculator from "./calculadoras/profits-tax-calculator";
import contenidoProfitsTaxCalculator from "./contenido/profits-tax-calculator";
import propertyTaxCalculator from "./calculadoras/property-tax-calculator";
import contenidoPropertyTaxCalculator from "./contenido/property-tax-calculator";
import provisionalSalariesTax from "./calculadoras/provisional-salaries-tax";
import contenidoProvisionalSalariesTax from "./contenido/provisional-salaries-tax";
import salariesTaxCalculator from "./calculadoras/salaries-tax-calculator";
import contenidoSalariesTaxCalculator from "./contenido/salaries-tax-calculator";
import severancePayment from "./calculadoras/severance-payment";
import contenidoSeverancePayment from "./contenido/severance-payment";
import sickLeavePay from "./calculadoras/sick-leave-pay";
import contenidoSickLeavePay from "./contenido/sick-leave-pay";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
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
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: endOfYearPayment, contenido: contenidoEndOfYearPayment, cliente: () => import("./calculadoras/end-of-year-payment.cliente") },
    { definicion: hiborMortgageCalculator, contenido: contenidoHiborMortgageCalculator, cliente: () => import("./calculadoras/hibor-mortgage-calculator.cliente") },
    { definicion: holidayPay, contenido: contenidoHolidayPay, cliente: () => import("./calculadoras/holiday-pay.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: longServicePayment, contenido: contenidoLongServicePayment, cliente: () => import("./calculadoras/long-service-payment.cliente") },
    { definicion: maternityLeavePay, contenido: contenidoMaternityLeavePay, cliente: () => import("./calculadoras/maternity-leave-pay.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: mpfCalculator, contenido: contenidoMpfCalculator, cliente: () => import("./calculadoras/mpf-calculator.cliente") },
    { definicion: paternityLeavePay, contenido: contenidoPaternityLeavePay, cliente: () => import("./calculadoras/paternity-leave-pay.cliente") },
    { definicion: paymentInLieuOfNotice, contenido: contenidoPaymentInLieuOfNotice, cliente: () => import("./calculadoras/payment-in-lieu-of-notice.cliente") },
    { definicion: profitsTaxCalculator, contenido: contenidoProfitsTaxCalculator, cliente: () => import("./calculadoras/profits-tax-calculator.cliente") },
    { definicion: propertyTaxCalculator, contenido: contenidoPropertyTaxCalculator, cliente: () => import("./calculadoras/property-tax-calculator.cliente") },
    { definicion: provisionalSalariesTax, contenido: contenidoProvisionalSalariesTax, cliente: () => import("./calculadoras/provisional-salaries-tax.cliente") },
    { definicion: salariesTaxCalculator, contenido: contenidoSalariesTaxCalculator, cliente: () => import("./calculadoras/salaries-tax-calculator.cliente") },
    { definicion: severancePayment, contenido: contenidoSeverancePayment, cliente: () => import("./calculadoras/severance-payment.cliente") },
    { definicion: sickLeavePay, contenido: contenidoSickLeavePay, cliente: () => import("./calculadoras/sick-leave-pay.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
