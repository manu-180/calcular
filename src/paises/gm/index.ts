import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import corporateIncomeTax from "./calculadoras/corporate-income-tax";
import contenidoCorporateIncomeTax from "./contenido/corporate-income-tax";
import dividendTax from "./calculadoras/dividend-tax";
import contenidoDividendTax from "./contenido/dividend-tax";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import expatriatePayrollTax from "./calculadoras/expatriate-payroll-tax";
import contenidoExpatriatePayrollTax from "./contenido/expatriate-payroll-tax";
import fringeBenefitsTax from "./calculadoras/fringe-benefits-tax";
import contenidoFringeBenefitsTax from "./contenido/fringe-benefits-tax";
import informalSectorTax from "./calculadoras/informal-sector-tax";
import contenidoInformalSectorTax from "./contenido/informal-sector-tax";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import rentalIncomeTax from "./calculadoras/rental-income-tax";
import contenidoRentalIncomeTax from "./contenido/rental-income-tax";
import smallBusinessTax from "./calculadoras/small-business-tax";
import contenidoSmallBusinessTax from "./contenido/small-business-tax";
import sshfcContribution from "./calculadoras/sshfc-contribution";
import contenidoSshfcContribution from "./contenido/sshfc-contribution";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
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
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: corporateIncomeTax, contenido: contenidoCorporateIncomeTax, cliente: () => import("./calculadoras/corporate-income-tax.cliente") },
    { definicion: dividendTax, contenido: contenidoDividendTax, cliente: () => import("./calculadoras/dividend-tax.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: expatriatePayrollTax, contenido: contenidoExpatriatePayrollTax, cliente: () => import("./calculadoras/expatriate-payroll-tax.cliente") },
    { definicion: fringeBenefitsTax, contenido: contenidoFringeBenefitsTax, cliente: () => import("./calculadoras/fringe-benefits-tax.cliente") },
    { definicion: informalSectorTax, contenido: contenidoInformalSectorTax, cliente: () => import("./calculadoras/informal-sector-tax.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: rentalIncomeTax, contenido: contenidoRentalIncomeTax, cliente: () => import("./calculadoras/rental-income-tax.cliente") },
    { definicion: smallBusinessTax, contenido: contenidoSmallBusinessTax, cliente: () => import("./calculadoras/small-business-tax.cliente") },
    { definicion: sshfcContribution, contenido: contenidoSshfcContribution, cliente: () => import("./calculadoras/sshfc-contribution.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
