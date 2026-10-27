import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import bonusTaxCalculator from "./calculadoras/bonus-tax-calculator";
import contenidoBonusTaxCalculator from "./contenido/bonus-tax-calculator";
import gratuityTaxCalculator from "./calculadoras/gratuity-tax-calculator";
import contenidoGratuityTaxCalculator from "./contenido/gratuity-tax-calculator";
import pensionLumpSumTax from "./calculadoras/pension-lump-sum-tax";
import contenidoPensionLumpSumTax from "./contenido/pension-lump-sum-tax";
import pensionTaxRelief from "./calculadoras/pension-tax-relief";
import contenidoPensionTaxRelief from "./contenido/pension-tax-relief";
import companyCarBenefit from "./calculadoras/company-car-benefit";
import contenidoCompanyCarBenefit from "./contenido/company-car-benefit";
import taxFreeSalaryGrossUp from "./calculadoras/tax-free-salary-gross-up";
import contenidoTaxFreeSalaryGrossUp from "./contenido/tax-free-salary-gross-up";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import companyTaxCalculator from "./calculadoras/company-tax-calculator";
import contenidoCompanyTaxCalculator from "./contenido/company-tax-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
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
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: bonusTaxCalculator, contenido: contenidoBonusTaxCalculator, cliente: () => import("./calculadoras/bonus-tax-calculator.cliente") },
    { definicion: gratuityTaxCalculator, contenido: contenidoGratuityTaxCalculator, cliente: () => import("./calculadoras/gratuity-tax-calculator.cliente") },
    { definicion: pensionLumpSumTax, contenido: contenidoPensionLumpSumTax, cliente: () => import("./calculadoras/pension-lump-sum-tax.cliente") },
    { definicion: pensionTaxRelief, contenido: contenidoPensionTaxRelief, cliente: () => import("./calculadoras/pension-tax-relief.cliente") },
    { definicion: companyCarBenefit, contenido: contenidoCompanyCarBenefit, cliente: () => import("./calculadoras/company-car-benefit.cliente") },
    { definicion: taxFreeSalaryGrossUp, contenido: contenidoTaxFreeSalaryGrossUp, cliente: () => import("./calculadoras/tax-free-salary-gross-up.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: companyTaxCalculator, contenido: contenidoCompanyTaxCalculator, cliente: () => import("./calculadoras/company-tax-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
