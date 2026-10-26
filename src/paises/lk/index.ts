import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import grossSalaryCalculator from "./calculadoras/gross-salary-calculator";
import contenidoGrossSalaryCalculator from "./contenido/gross-salary-calculator";
import apitCalculator from "./calculadoras/apit-calculator";
import contenidoApitCalculator from "./contenido/apit-calculator";
import epfEtfCalculator from "./calculadoras/epf-etf-calculator";
import contenidoEpfEtfCalculator from "./contenido/epf-etf-calculator";
import epfWithdrawalCalculator from "./calculadoras/epf-withdrawal-calculator";
import contenidoEpfWithdrawalCalculator from "./contenido/epf-withdrawal-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import freelancerTaxCalculator from "./calculadoras/freelancer-tax-calculator";
import contenidoFreelancerTaxCalculator from "./contenido/freelancer-tax-calculator";
import gratuityTaxCalculator from "./calculadoras/gratuity-tax-calculator";
import contenidoGratuityTaxCalculator from "./contenido/gratuity-tax-calculator";
import bonusTaxCalculator from "./calculadoras/bonus-tax-calculator";
import contenidoBonusTaxCalculator from "./contenido/bonus-tax-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import ssclCalculator from "./calculadoras/sscl-calculator";
import contenidoSsclCalculator from "./contenido/sscl-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import fixedDepositCalculator from "./calculadoras/fixed-deposit-calculator";
import contenidoFixedDepositCalculator from "./contenido/fixed-deposit-calculator";
import dollarRate from "./calculadoras/dollar-rate";
import contenidoDollarRate from "./contenido/dollar-rate";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
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
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: grossSalaryCalculator, contenido: contenidoGrossSalaryCalculator, cliente: () => import("./calculadoras/gross-salary-calculator.cliente") },
    { definicion: apitCalculator, contenido: contenidoApitCalculator, cliente: () => import("./calculadoras/apit-calculator.cliente") },
    { definicion: epfEtfCalculator, contenido: contenidoEpfEtfCalculator, cliente: () => import("./calculadoras/epf-etf-calculator.cliente") },
    { definicion: epfWithdrawalCalculator, contenido: contenidoEpfWithdrawalCalculator, cliente: () => import("./calculadoras/epf-withdrawal-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: freelancerTaxCalculator, contenido: contenidoFreelancerTaxCalculator, cliente: () => import("./calculadoras/freelancer-tax-calculator.cliente") },
    { definicion: gratuityTaxCalculator, contenido: contenidoGratuityTaxCalculator, cliente: () => import("./calculadoras/gratuity-tax-calculator.cliente") },
    { definicion: bonusTaxCalculator, contenido: contenidoBonusTaxCalculator, cliente: () => import("./calculadoras/bonus-tax-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: ssclCalculator, contenido: contenidoSsclCalculator, cliente: () => import("./calculadoras/sscl-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: fixedDepositCalculator, contenido: contenidoFixedDepositCalculator, cliente: () => import("./calculadoras/fixed-deposit-calculator.cliente") },
    { definicion: dollarRate, contenido: contenidoDollarRate, cliente: () => import("./calculadoras/dollar-rate.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
