import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import spkCalculator from "./calculadoras/spk-calculator";
import contenidoSpkCalculator from "./contenido/spk-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import corporateTaxCalculator from "./calculadoras/corporate-tax-calculator";
import contenidoCorporateTaxCalculator from "./contenido/corporate-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import stampDutyPenaltyCalculator from "./calculadoras/stamp-duty-penalty-calculator";
import contenidoStampDutyPenaltyCalculator from "./contenido/stamp-duty-penalty-calculator";
import spkSelfEmployedCalculator from "./calculadoras/spk-self-employed-calculator";
import contenidoSpkSelfEmployedCalculator from "./contenido/spk-self-employed-calculator";
import bndToSgd from "./calculadoras/bnd-to-sgd";
import contenidoBndToSgd from "./contenido/bnd-to-sgd";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import capitalAllowanceCalculator from "./calculadoras/capital-allowance-calculator";
import contenidoCapitalAllowanceCalculator from "./contenido/capital-allowance-calculator";
import companyCarDeductionCalculator from "./calculadoras/company-car-deduction-calculator";
import contenidoCompanyCarDeductionCalculator from "./contenido/company-car-deduction-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
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
    { definicion: spkCalculator, contenido: contenidoSpkCalculator, cliente: () => import("./calculadoras/spk-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: corporateTaxCalculator, contenido: contenidoCorporateTaxCalculator, cliente: () => import("./calculadoras/corporate-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: stampDutyPenaltyCalculator, contenido: contenidoStampDutyPenaltyCalculator, cliente: () => import("./calculadoras/stamp-duty-penalty-calculator.cliente") },
    { definicion: spkSelfEmployedCalculator, contenido: contenidoSpkSelfEmployedCalculator, cliente: () => import("./calculadoras/spk-self-employed-calculator.cliente") },
    { definicion: bndToSgd, contenido: contenidoBndToSgd, cliente: () => import("./calculadoras/bnd-to-sgd.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: capitalAllowanceCalculator, contenido: contenidoCapitalAllowanceCalculator, cliente: () => import("./calculadoras/capital-allowance-calculator.cliente") },
    { definicion: companyCarDeductionCalculator, contenido: contenidoCompanyCarDeductionCalculator, cliente: () => import("./calculadoras/company-car-deduction-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
