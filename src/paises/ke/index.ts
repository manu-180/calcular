import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import nssfCalculator from "./calculadoras/nssf-calculator";
import contenidoNssfCalculator from "./contenido/nssf-calculator";
import shifCalculator from "./calculadoras/shif-calculator";
import contenidoShifCalculator from "./contenido/shif-calculator";
import housingLevyCalculator from "./calculadoras/housing-levy-calculator";
import contenidoHousingLevyCalculator from "./contenido/housing-levy-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import turnoverTaxCalculator from "./calculadoras/turnover-tax-calculator";
import contenidoTurnoverTaxCalculator from "./contenido/turnover-tax-calculator";
import rentalIncomeTaxCalculator from "./calculadoras/rental-income-tax-calculator";
import contenidoRentalIncomeTaxCalculator from "./contenido/rental-income-tax-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import advanceTaxCalculator from "./calculadoras/advance-tax-calculator";
import contenidoAdvanceTaxCalculator from "./contenido/advance-tax-calculator";
import payePenaltyCalculator from "./calculadoras/paye-penalty-calculator";
import contenidoPayePenaltyCalculator from "./contenido/paye-penalty-calculator";
import treasuryBillCalculator from "./calculadoras/treasury-bill-calculator";
import contenidoTreasuryBillCalculator from "./contenido/treasury-bill-calculator";
import dollarToShilling from "./calculadoras/dollar-to-shilling";
import contenidoDollarToShilling from "./contenido/dollar-to-shilling";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
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
    { definicion: nssfCalculator, contenido: contenidoNssfCalculator, cliente: () => import("./calculadoras/nssf-calculator.cliente") },
    { definicion: shifCalculator, contenido: contenidoShifCalculator, cliente: () => import("./calculadoras/shif-calculator.cliente") },
    { definicion: housingLevyCalculator, contenido: contenidoHousingLevyCalculator, cliente: () => import("./calculadoras/housing-levy-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: turnoverTaxCalculator, contenido: contenidoTurnoverTaxCalculator, cliente: () => import("./calculadoras/turnover-tax-calculator.cliente") },
    { definicion: rentalIncomeTaxCalculator, contenido: contenidoRentalIncomeTaxCalculator, cliente: () => import("./calculadoras/rental-income-tax-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: advanceTaxCalculator, contenido: contenidoAdvanceTaxCalculator, cliente: () => import("./calculadoras/advance-tax-calculator.cliente") },
    { definicion: payePenaltyCalculator, contenido: contenidoPayePenaltyCalculator, cliente: () => import("./calculadoras/paye-penalty-calculator.cliente") },
    { definicion: treasuryBillCalculator, contenido: contenidoTreasuryBillCalculator, cliente: () => import("./calculadoras/treasury-bill-calculator.cliente") },
    { definicion: dollarToShilling, contenido: contenidoDollarToShilling, cliente: () => import("./calculadoras/dollar-to-shilling.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
