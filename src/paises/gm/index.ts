import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeavePay from "./calculadoras/annual-leave-pay";
import contenidoAnnualLeavePay from "./contenido/annual-leave-pay";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import corporateIncomeTax from "./calculadoras/corporate-income-tax";
import contenidoCorporateIncomeTax from "./contenido/corporate-income-tax";
import dividendTax from "./calculadoras/dividend-tax";
import contenidoDividendTax from "./contenido/dividend-tax";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import exchangeRate from "./calculadoras/exchange-rate";
import contenidoExchangeRate from "./contenido/exchange-rate";
import expatriatePayrollTax from "./calculadoras/expatriate-payroll-tax";
import contenidoExpatriatePayrollTax from "./contenido/expatriate-payroll-tax";
import fringeBenefitsTax from "./calculadoras/fringe-benefits-tax";
import contenidoFringeBenefitsTax from "./contenido/fringe-benefits-tax";
import informalSectorTax from "./calculadoras/informal-sector-tax";
import contenidoInformalSectorTax from "./contenido/informal-sector-tax";
import maternityLeave from "./calculadoras/maternity-leave";
import contenidoMaternityLeave from "./contenido/maternity-leave";
import netToGross from "./calculadoras/net-to-gross";
import contenidoNetToGross from "./contenido/net-to-gross";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import rentalIncomeTax from "./calculadoras/rental-income-tax";
import contenidoRentalIncomeTax from "./contenido/rental-income-tax";
import retirementAge from "./calculadoras/retirement-age";
import contenidoRetirementAge from "./contenido/retirement-age";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import smallBusinessTax from "./calculadoras/small-business-tax";
import contenidoSmallBusinessTax from "./contenido/small-business-tax";
import sshfcContribution from "./calculadoras/sshfc-contribution";
import contenidoSshfcContribution from "./contenido/sshfc-contribution";
import sshfcLatePenalty from "./calculadoras/sshfc-late-penalty";
import contenidoSshfcLatePenalty from "./contenido/sshfc-late-penalty";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import vatRegistration from "./calculadoras/vat-registration";
import contenidoVatRegistration from "./contenido/vat-registration";
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
    { definicion: annualLeavePay, contenido: contenidoAnnualLeavePay, cliente: () => import("./calculadoras/annual-leave-pay.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: corporateIncomeTax, contenido: contenidoCorporateIncomeTax, cliente: () => import("./calculadoras/corporate-income-tax.cliente") },
    { definicion: dividendTax, contenido: contenidoDividendTax, cliente: () => import("./calculadoras/dividend-tax.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: exchangeRate, contenido: contenidoExchangeRate, cliente: () => import("./calculadoras/exchange-rate.cliente") },
    { definicion: expatriatePayrollTax, contenido: contenidoExpatriatePayrollTax, cliente: () => import("./calculadoras/expatriate-payroll-tax.cliente") },
    { definicion: fringeBenefitsTax, contenido: contenidoFringeBenefitsTax, cliente: () => import("./calculadoras/fringe-benefits-tax.cliente") },
    { definicion: informalSectorTax, contenido: contenidoInformalSectorTax, cliente: () => import("./calculadoras/informal-sector-tax.cliente") },
    { definicion: maternityLeave, contenido: contenidoMaternityLeave, cliente: () => import("./calculadoras/maternity-leave.cliente") },
    { definicion: netToGross, contenido: contenidoNetToGross, cliente: () => import("./calculadoras/net-to-gross.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: rentalIncomeTax, contenido: contenidoRentalIncomeTax, cliente: () => import("./calculadoras/rental-income-tax.cliente") },
    { definicion: retirementAge, contenido: contenidoRetirementAge, cliente: () => import("./calculadoras/retirement-age.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: smallBusinessTax, contenido: contenidoSmallBusinessTax, cliente: () => import("./calculadoras/small-business-tax.cliente") },
    { definicion: sshfcContribution, contenido: contenidoSshfcContribution, cliente: () => import("./calculadoras/sshfc-contribution.cliente") },
    { definicion: sshfcLatePenalty, contenido: contenidoSshfcLatePenalty, cliente: () => import("./calculadoras/sshfc-late-penalty.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: vatRegistration, contenido: contenidoVatRegistration, cliente: () => import("./calculadoras/vat-registration.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
