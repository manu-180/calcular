import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netPayCalculator from "./calculadoras/net-pay-calculator";
import contenidoNetPayCalculator from "./contenido/net-pay-calculator";
import fnpfCalculator from "./calculadoras/fnpf-calculator";
import contenidoFnpfCalculator from "./contenido/fnpf-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import secondaryEmploymentTaxCalculator from "./calculadoras/secondary-employment-tax-calculator";
import contenidoSecondaryEmploymentTaxCalculator from "./contenido/secondary-employment-tax-calculator";
import redundancyTaxCalculator from "./calculadoras/redundancy-tax-calculator";
import contenidoRedundancyTaxCalculator from "./contenido/redundancy-tax-calculator";
import fringeBenefitsTaxCalculator from "./calculadoras/fringe-benefits-tax-calculator";
import contenidoFringeBenefitsTaxCalculator from "./contenido/fringe-benefits-tax-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import contractPaymentTaxCalculator from "./calculadoras/contract-payment-tax-calculator";
import contenidoContractPaymentTaxCalculator from "./contenido/contract-payment-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import payePenaltyCalculator from "./calculadoras/paye-penalty-calculator";
import contenidoPayePenaltyCalculator from "./contenido/paye-penalty-calculator";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import redundancyPayCalculator from "./calculadoras/redundancy-pay-calculator";
import contenidoRedundancyPayCalculator from "./contenido/redundancy-pay-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
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
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: netPayCalculator, contenido: contenidoNetPayCalculator, cliente: () => import("./calculadoras/net-pay-calculator.cliente") },
    { definicion: fnpfCalculator, contenido: contenidoFnpfCalculator, cliente: () => import("./calculadoras/fnpf-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: secondaryEmploymentTaxCalculator, contenido: contenidoSecondaryEmploymentTaxCalculator, cliente: () => import("./calculadoras/secondary-employment-tax-calculator.cliente") },
    { definicion: redundancyTaxCalculator, contenido: contenidoRedundancyTaxCalculator, cliente: () => import("./calculadoras/redundancy-tax-calculator.cliente") },
    { definicion: fringeBenefitsTaxCalculator, contenido: contenidoFringeBenefitsTaxCalculator, cliente: () => import("./calculadoras/fringe-benefits-tax-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: contractPaymentTaxCalculator, contenido: contenidoContractPaymentTaxCalculator, cliente: () => import("./calculadoras/contract-payment-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: payePenaltyCalculator, contenido: contenidoPayePenaltyCalculator, cliente: () => import("./calculadoras/paye-penalty-calculator.cliente") },
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: redundancyPayCalculator, contenido: contenidoRedundancyPayCalculator, cliente: () => import("./calculadoras/redundancy-pay-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
