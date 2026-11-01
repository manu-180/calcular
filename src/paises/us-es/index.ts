import { definirEdicion } from "@/motor/registro";
import us from "../us";
import contenidoFederalIncomeTax from "./contenido/federal-income-tax";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import contenidoFicaTax from "./contenido/fica-tax";
import contenidoSelfEmploymentTax from "./contenido/self-employment-tax";
import contenidoBonusTax from "./contenido/bonus-tax";
import contenidoEmployerPayrollTax from "./contenido/employer-payroll-tax";
import contenidoMinimumWage from "./contenido/minimum-wage";
import contenidoOvertime from "./contenido/overtime";
import contenidoNoTaxOnOvertime from "./contenido/no-tax-on-overtime";
import contenidoNoTaxOnTips from "./contenido/no-tax-on-tips";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import contenidoC401kContribution from "./contenido/401k-contribution";
import contenidoRothIraContribution from "./contenido/roth-ira-contribution";
import contenidoHsaContribution from "./contenido/hsa-contribution";
import contenidoRmdCalculator from "./contenido/rmd-calculator";
import contenidoSocialSecurityBenefits from "./contenido/social-security-benefits";
import contenidoChildTaxCredit from "./contenido/child-tax-credit";
import contenidoQuarterlyEstimatedTaxes from "./contenido/quarterly-estimated-taxes";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import contenidoSalesTax from "./contenido/sales-tax";
import contenidoMileageReimbursement from "./contenido/mileage-reimbursement";
import contenidoSeniorDeduction from "./contenido/senior-deduction";
import contenidoStandardDeduction from "./contenido/standard-deduction";
import { AVISOS, DATOS } from "./lib/datos";
import { mercado } from "./mercado";
import textosFederalIncomeTax from "./textos/federal-income-tax";
import textosTakeHomePay from "./textos/take-home-pay";
import textosFicaTax from "./textos/fica-tax";
import textosSelfEmploymentTax from "./textos/self-employment-tax";
import textosBonusTax from "./textos/bonus-tax";
import textosEmployerPayrollTax from "./textos/employer-payroll-tax";
import textosMinimumWage from "./textos/minimum-wage";
import textosOvertime from "./textos/overtime";
import textosNoTaxOnOvertime from "./textos/no-tax-on-overtime";
import textosNoTaxOnTips from "./textos/no-tax-on-tips";
import textosCapitalGainsTax from "./textos/capital-gains-tax";
import textosC401kContribution from "./textos/401k-contribution";
import textosRothIraContribution from "./textos/roth-ira-contribution";
import textosHsaContribution from "./textos/hsa-contribution";
import textosRmdCalculator from "./textos/rmd-calculator";
import textosSocialSecurityBenefits from "./textos/social-security-benefits";
import textosChildTaxCredit from "./textos/child-tax-credit";
import textosQuarterlyEstimatedTaxes from "./textos/quarterly-estimated-taxes";
import textosInflationCalculator from "./textos/inflation-calculator";
import textosSalesTax from "./textos/sales-tax";
import textosMileageReimbursement from "./textos/mileage-reimbursement";
import textosSeniorDeduction from "./textos/senior-deduction";
import textosStandardDeduction from "./textos/standard-deduction";

export default definirEdicion(us, {
  mercado,
  traducciones: [
    { textos: textosFederalIncomeTax, contenido: contenidoFederalIncomeTax },
    { textos: textosTakeHomePay, contenido: contenidoTakeHomePay },
    { textos: textosFicaTax, contenido: contenidoFicaTax },
    { textos: textosSelfEmploymentTax, contenido: contenidoSelfEmploymentTax },
    { textos: textosBonusTax, contenido: contenidoBonusTax },
    { textos: textosEmployerPayrollTax, contenido: contenidoEmployerPayrollTax },
    { textos: textosMinimumWage, contenido: contenidoMinimumWage },
    { textos: textosOvertime, contenido: contenidoOvertime },
    { textos: textosNoTaxOnOvertime, contenido: contenidoNoTaxOnOvertime },
    { textos: textosNoTaxOnTips, contenido: contenidoNoTaxOnTips },
    { textos: textosCapitalGainsTax, contenido: contenidoCapitalGainsTax },
    { textos: textosC401kContribution, contenido: contenidoC401kContribution },
    { textos: textosRothIraContribution, contenido: contenidoRothIraContribution },
    { textos: textosHsaContribution, contenido: contenidoHsaContribution },
    { textos: textosRmdCalculator, contenido: contenidoRmdCalculator },
    { textos: textosSocialSecurityBenefits, contenido: contenidoSocialSecurityBenefits },
    { textos: textosChildTaxCredit, contenido: contenidoChildTaxCredit },
    { textos: textosQuarterlyEstimatedTaxes, contenido: contenidoQuarterlyEstimatedTaxes },
    { textos: textosInflationCalculator, contenido: contenidoInflationCalculator },
    { textos: textosSalesTax, contenido: contenidoSalesTax },
    { textos: textosMileageReimbursement, contenido: contenidoMileageReimbursement },
    { textos: textosSeniorDeduction, contenido: contenidoSeniorDeduction },
    { textos: textosStandardDeduction, contenido: contenidoStandardDeduction },
  ],
  universales: "todas",
  avisos: AVISOS,
  datos: DATOS,
});
