import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import thirteenthMonthPayTax from "./calculadoras/13th-month-pay-tax";
import contenidoThirteenthMonthPayTax from "./contenido/13th-month-pay-tax";
import eightPercentTax from "./calculadoras/eight-percent-tax";
import contenidoEightPercentTax from "./contenido/eight-percent-tax";
import mixedIncomeTax from "./calculadoras/mixed-income-tax";
import contenidoMixedIncomeTax from "./contenido/mixed-income-tax";
import percentageTax from "./calculadoras/percentage-tax";
import contenidoPercentageTax from "./contenido/percentage-tax";
import sssContribution from "./calculadoras/sss-contribution";
import contenidoSssContribution from "./contenido/sss-contribution";
import philhealthContribution from "./calculadoras/philhealth-contribution";
import contenidoPhilhealthContribution from "./contenido/philhealth-contribution";
import pagIbigContribution from "./calculadoras/pag-ibig-contribution";
import contenidoPagIbigContribution from "./contenido/pag-ibig-contribution";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import kasambahayMinimumWage from "./calculadoras/kasambahay-minimum-wage";
import contenidoKasambahayMinimumWage from "./contenido/kasambahay-minimum-wage";
import retirementPay from "./calculadoras/retirement-pay";
import contenidoRetirementPay from "./contenido/retirement-pay";
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
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: thirteenthMonthPayTax, contenido: contenidoThirteenthMonthPayTax, cliente: () => import("./calculadoras/13th-month-pay-tax.cliente") },
    { definicion: eightPercentTax, contenido: contenidoEightPercentTax, cliente: () => import("./calculadoras/eight-percent-tax.cliente") },
    { definicion: mixedIncomeTax, contenido: contenidoMixedIncomeTax, cliente: () => import("./calculadoras/mixed-income-tax.cliente") },
    { definicion: percentageTax, contenido: contenidoPercentageTax, cliente: () => import("./calculadoras/percentage-tax.cliente") },
    { definicion: sssContribution, contenido: contenidoSssContribution, cliente: () => import("./calculadoras/sss-contribution.cliente") },
    { definicion: philhealthContribution, contenido: contenidoPhilhealthContribution, cliente: () => import("./calculadoras/philhealth-contribution.cliente") },
    { definicion: pagIbigContribution, contenido: contenidoPagIbigContribution, cliente: () => import("./calculadoras/pag-ibig-contribution.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: kasambahayMinimumWage, contenido: contenidoKasambahayMinimumWage, cliente: () => import("./calculadoras/kasambahay-minimum-wage.cliente") },
    { definicion: retirementPay, contenido: contenidoRetirementPay, cliente: () => import("./calculadoras/retirement-pay.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
