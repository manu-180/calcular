import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bonusTax from "./calculadoras/bonus-tax";
import employerPayrollTax from "./calculadoras/employer-payroll-tax";
import federalIncomeTax from "./calculadoras/federal-income-tax";
import ficaTax from "./calculadoras/fica-tax";
import minimumWage from "./calculadoras/minimum-wage";
import noTaxOnOvertime from "./calculadoras/no-tax-on-overtime";
import noTaxOnTips from "./calculadoras/no-tax-on-tips";
import overtime from "./calculadoras/overtime";
import selfEmploymentTax from "./calculadoras/self-employment-tax";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoBonusTax from "./contenido/bonus-tax";
import contenidoEmployerPayrollTax from "./contenido/employer-payroll-tax";
import contenidoFederalIncomeTax from "./contenido/federal-income-tax";
import contenidoFicaTax from "./contenido/fica-tax";
import contenidoMinimumWage from "./contenido/minimum-wage";
import contenidoNoTaxOnOvertime from "./contenido/no-tax-on-overtime";
import contenidoNoTaxOnTips from "./contenido/no-tax-on-tips";
import contenidoOvertime from "./contenido/overtime";
import contenidoSelfEmploymentTax from "./contenido/self-employment-tax";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import k401Contribution from "./calculadoras/401k-contribution";
import contenidoK401Contribution from "./contenido/401k-contribution";
import rothIraContribution from "./calculadoras/roth-ira-contribution";
import contenidoRothIraContribution from "./contenido/roth-ira-contribution";
import hsaContribution from "./calculadoras/hsa-contribution";
import contenidoHsaContribution from "./contenido/hsa-contribution";
import rmdCalculator from "./calculadoras/rmd-calculator";
import contenidoRmdCalculator from "./contenido/rmd-calculator";
import socialSecurityBenefits from "./calculadoras/social-security-benefits";
import contenidoSocialSecurityBenefits from "./contenido/social-security-benefits";
import childTaxCredit from "./calculadoras/child-tax-credit";
import contenidoChildTaxCredit from "./contenido/child-tax-credit";
import quarterlyEstimatedTaxes from "./calculadoras/quarterly-estimated-taxes";
import contenidoQuarterlyEstimatedTaxes from "./contenido/quarterly-estimated-taxes";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import salesTax from "./calculadoras/sales-tax";
import contenidoSalesTax from "./contenido/sales-tax";
import mileageReimbursement from "./calculadoras/mileage-reimbursement";
import contenidoMileageReimbursement from "./contenido/mileage-reimbursement";
import seniorDeduction from "./calculadoras/senior-deduction";
import contenidoSeniorDeduction from "./contenido/senior-deduction";
import standardDeduction from "./calculadoras/standard-deduction";
import contenidoStandardDeduction from "./contenido/standard-deduction";
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
    { definicion: federalIncomeTax, contenido: contenidoFederalIncomeTax, cliente: () => import("./calculadoras/federal-income-tax.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: ficaTax, contenido: contenidoFicaTax, cliente: () => import("./calculadoras/fica-tax.cliente") },
    { definicion: selfEmploymentTax, contenido: contenidoSelfEmploymentTax, cliente: () => import("./calculadoras/self-employment-tax.cliente") },
    { definicion: bonusTax, contenido: contenidoBonusTax, cliente: () => import("./calculadoras/bonus-tax.cliente") },
    { definicion: employerPayrollTax, contenido: contenidoEmployerPayrollTax, cliente: () => import("./calculadoras/employer-payroll-tax.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: overtime, contenido: contenidoOvertime, cliente: () => import("./calculadoras/overtime.cliente") },
    { definicion: noTaxOnOvertime, contenido: contenidoNoTaxOnOvertime, cliente: () => import("./calculadoras/no-tax-on-overtime.cliente") },
    { definicion: noTaxOnTips, contenido: contenidoNoTaxOnTips, cliente: () => import("./calculadoras/no-tax-on-tips.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: k401Contribution, contenido: contenidoK401Contribution, cliente: () => import("./calculadoras/401k-contribution.cliente") },
    { definicion: rothIraContribution, contenido: contenidoRothIraContribution, cliente: () => import("./calculadoras/roth-ira-contribution.cliente") },
    { definicion: hsaContribution, contenido: contenidoHsaContribution, cliente: () => import("./calculadoras/hsa-contribution.cliente") },
    { definicion: rmdCalculator, contenido: contenidoRmdCalculator, cliente: () => import("./calculadoras/rmd-calculator.cliente") },
    { definicion: socialSecurityBenefits, contenido: contenidoSocialSecurityBenefits, cliente: () => import("./calculadoras/social-security-benefits.cliente") },
    { definicion: childTaxCredit, contenido: contenidoChildTaxCredit, cliente: () => import("./calculadoras/child-tax-credit.cliente") },
    { definicion: quarterlyEstimatedTaxes, contenido: contenidoQuarterlyEstimatedTaxes, cliente: () => import("./calculadoras/quarterly-estimated-taxes.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: salesTax, contenido: contenidoSalesTax, cliente: () => import("./calculadoras/sales-tax.cliente") },
    { definicion: mileageReimbursement, contenido: contenidoMileageReimbursement, cliente: () => import("./calculadoras/mileage-reimbursement.cliente") },
    { definicion: seniorDeduction, contenido: contenidoSeniorDeduction, cliente: () => import("./calculadoras/senior-deduction.cliente") },
    { definicion: standardDeduction, contenido: contenidoStandardDeduction, cliente: () => import("./calculadoras/standard-deduction.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
