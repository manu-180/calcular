import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import pensionCalculator from "./calculadoras/pension-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import tevetLevyCalculator from "./calculadoras/tevet-levy-calculator";
import contenidoTevetLevyCalculator from "./contenido/tevet-levy-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import transferLevyCalculator from "./calculadoras/transfer-levy-calculator";
import contenidoTransferLevyCalculator from "./contenido/transfer-levy-calculator";
import winningsTaxCalculator from "./calculadoras/winnings-tax-calculator";
import contenidoWinningsTaxCalculator from "./contenido/winnings-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import fringeBenefitTaxCalculator from "./calculadoras/fringe-benefit-tax-calculator";
import contenidoFringeBenefitTaxCalculator from "./contenido/fringe-benefit-tax-calculator";
import presumptiveTaxCalculator from "./calculadoras/presumptive-tax-calculator";
import contenidoPresumptiveTaxCalculator from "./contenido/presumptive-tax-calculator";
import personalIncomeTaxCalculator from "./calculadoras/personal-income-tax-calculator";
import contenidoPersonalIncomeTaxCalculator from "./contenido/personal-income-tax-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
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
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: pensionCalculator, contenido: contenidoPensionCalculator, cliente: () => import("./calculadoras/pension-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: tevetLevyCalculator, contenido: contenidoTevetLevyCalculator, cliente: () => import("./calculadoras/tevet-levy-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: transferLevyCalculator, contenido: contenidoTransferLevyCalculator, cliente: () => import("./calculadoras/transfer-levy-calculator.cliente") },
    { definicion: winningsTaxCalculator, contenido: contenidoWinningsTaxCalculator, cliente: () => import("./calculadoras/winnings-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: fringeBenefitTaxCalculator, contenido: contenidoFringeBenefitTaxCalculator, cliente: () => import("./calculadoras/fringe-benefit-tax-calculator.cliente") },
    { definicion: presumptiveTaxCalculator, contenido: contenidoPresumptiveTaxCalculator, cliente: () => import("./calculadoras/presumptive-tax-calculator.cliente") },
    { definicion: personalIncomeTaxCalculator, contenido: contenidoPersonalIncomeTaxCalculator, cliente: () => import("./calculadoras/personal-income-tax-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
