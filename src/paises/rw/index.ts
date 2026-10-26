import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import rssbContributionCalculator from "./calculadoras/rssb-contribution-calculator";
import contenidoRssbContributionCalculator from "./contenido/rssb-contribution-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import terminalBenefitsCalculator from "./calculadoras/terminal-benefits-calculator";
import contenidoTerminalBenefitsCalculator from "./contenido/terminal-benefits-calculator";
import unfairDismissalCalculator from "./calculadoras/unfair-dismissal-calculator";
import contenidoUnfairDismissalCalculator from "./contenido/unfair-dismissal-calculator";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import rentalIncomeTaxCalculator from "./calculadoras/rental-income-tax-calculator";
import contenidoRentalIncomeTaxCalculator from "./contenido/rental-income-tax-calculator";
import smallBusinessTaxCalculator from "./calculadoras/small-business-tax-calculator";
import contenidoSmallBusinessTaxCalculator from "./contenido/small-business-tax-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import businessIncomeTaxCalculator from "./calculadoras/business-income-tax-calculator";
import contenidoBusinessIncomeTaxCalculator from "./contenido/business-income-tax-calculator";
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
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: rssbContributionCalculator, contenido: contenidoRssbContributionCalculator, cliente: () => import("./calculadoras/rssb-contribution-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: terminalBenefitsCalculator, contenido: contenidoTerminalBenefitsCalculator, cliente: () => import("./calculadoras/terminal-benefits-calculator.cliente") },
    { definicion: unfairDismissalCalculator, contenido: contenidoUnfairDismissalCalculator, cliente: () => import("./calculadoras/unfair-dismissal-calculator.cliente") },
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: rentalIncomeTaxCalculator, contenido: contenidoRentalIncomeTaxCalculator, cliente: () => import("./calculadoras/rental-income-tax-calculator.cliente") },
    { definicion: smallBusinessTaxCalculator, contenido: contenidoSmallBusinessTaxCalculator, cliente: () => import("./calculadoras/small-business-tax-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: businessIncomeTaxCalculator, contenido: contenidoBusinessIncomeTaxCalculator, cliente: () => import("./calculadoras/business-income-tax-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
