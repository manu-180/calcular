import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import socialInsurance from "./calculadoras/social-insurance";
import contenidoSocialInsurance from "./contenido/social-insurance";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import weeklyHolidayPay from "./calculadoras/weekly-holiday-pay";
import contenidoWeeklyHolidayPay from "./contenido/weekly-holiday-pay";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import overtimePay from "./calculadoras/overtime-pay";
import contenidoOvertimePay from "./contenido/overtime-pay";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import retirementIncomeTax from "./calculadoras/retirement-income-tax";
import contenidoRetirementIncomeTax from "./contenido/retirement-income-tax";
import unemploymentBenefit from "./calculadoras/unemployment-benefit";
import contenidoUnemploymentBenefit from "./contenido/unemployment-benefit";
import parentalLeaveBenefit from "./calculadoras/parental-leave-benefit";
import contenidoParentalLeaveBenefit from "./contenido/parental-leave-benefit";
import incomeTax from "./calculadoras/income-tax";
import contenidoIncomeTax from "./contenido/income-tax";
import yearEndTaxSettlement from "./calculadoras/year-end-tax-settlement";
import contenidoYearEndTaxSettlement from "./contenido/year-end-tax-settlement";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import acquisitionTax from "./calculadoras/acquisition-tax";
import contenidoAcquisitionTax from "./contenido/acquisition-tax";
import giftTax from "./calculadoras/gift-tax";
import contenidoGiftTax from "./contenido/gift-tax";
import inheritanceTax from "./calculadoras/inheritance-tax";
import contenidoInheritanceTax from "./contenido/inheritance-tax";
import brokerageFee from "./calculadoras/brokerage-fee";
import contenidoBrokerageFee from "./contenido/brokerage-fee";
import jeonwolseConversion from "./calculadoras/jeonwolse-conversion";
import contenidoJeonwolseConversion from "./contenido/jeonwolse-conversion";
import depositInterest from "./calculadoras/deposit-interest";
import contenidoDepositInterest from "./contenido/deposit-interest";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import usdToKrw from "./calculadoras/usd-to-krw";
import contenidoUsdToKrw from "./contenido/usd-to-krw";
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
    { definicion: socialInsurance, contenido: contenidoSocialInsurance, cliente: () => import("./calculadoras/social-insurance.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: weeklyHolidayPay, contenido: contenidoWeeklyHolidayPay, cliente: () => import("./calculadoras/weekly-holiday-pay.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: overtimePay, contenido: contenidoOvertimePay, cliente: () => import("./calculadoras/overtime-pay.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: retirementIncomeTax, contenido: contenidoRetirementIncomeTax, cliente: () => import("./calculadoras/retirement-income-tax.cliente") },
    { definicion: unemploymentBenefit, contenido: contenidoUnemploymentBenefit, cliente: () => import("./calculadoras/unemployment-benefit.cliente") },
    { definicion: parentalLeaveBenefit, contenido: contenidoParentalLeaveBenefit, cliente: () => import("./calculadoras/parental-leave-benefit.cliente") },
    { definicion: incomeTax, contenido: contenidoIncomeTax, cliente: () => import("./calculadoras/income-tax.cliente") },
    { definicion: yearEndTaxSettlement, contenido: contenidoYearEndTaxSettlement, cliente: () => import("./calculadoras/year-end-tax-settlement.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: acquisitionTax, contenido: contenidoAcquisitionTax, cliente: () => import("./calculadoras/acquisition-tax.cliente") },
    { definicion: giftTax, contenido: contenidoGiftTax, cliente: () => import("./calculadoras/gift-tax.cliente") },
    { definicion: inheritanceTax, contenido: contenidoInheritanceTax, cliente: () => import("./calculadoras/inheritance-tax.cliente") },
    { definicion: brokerageFee, contenido: contenidoBrokerageFee, cliente: () => import("./calculadoras/brokerage-fee.cliente") },
    { definicion: jeonwolseConversion, contenido: contenidoJeonwolseConversion, cliente: () => import("./calculadoras/jeonwolse-conversion.cliente") },
    { definicion: depositInterest, contenido: contenidoDepositInterest, cliente: () => import("./calculadoras/deposit-interest.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: usdToKrw, contenido: contenidoUsdToKrw, cliente: () => import("./calculadoras/usd-to-krw.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "kr.vat" } }] },
  novedades,
  detectores,
});
