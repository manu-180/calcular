import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryTaxCalculator from "./calculadoras/salary-tax-calculator";
import contenidoSalaryTaxCalculator from "./contenido/salary-tax-calculator";
import takeHomeSalaryCalculator from "./calculadoras/take-home-salary-calculator";
import contenidoTakeHomeSalaryCalculator from "./contenido/take-home-salary-calculator";
import eobiCalculator from "./calculadoras/eobi-calculator";
import contenidoEobiCalculator from "./contenido/eobi-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import salesTaxCalculator from "./calculadoras/sales-tax-calculator";
import contenidoSalesTaxCalculator from "./contenido/sales-tax-calculator";
import propertyTransferTaxCalculator from "./calculadoras/property-transfer-tax-calculator";
import contenidoPropertyTransferTaxCalculator from "./contenido/property-transfer-tax-calculator";
import bankProfitTaxCalculator from "./calculadoras/bank-profit-tax-calculator";
import contenidoBankProfitTaxCalculator from "./contenido/bank-profit-tax-calculator";
import foreignCardTaxCalculator from "./calculadoras/foreign-card-tax-calculator";
import contenidoForeignCardTaxCalculator from "./contenido/foreign-card-tax-calculator";
import zakatCalculator from "./calculadoras/zakat-calculator";
import contenidoZakatCalculator from "./contenido/zakat-calculator";
import behboodSavingsCertificateCalculator from "./calculadoras/behbood-savings-certificate-calculator";
import contenidoBehboodSavingsCertificateCalculator from "./contenido/behbood-savings-certificate-calculator";
import regularIncomeCertificateCalculator from "./calculadoras/regular-income-certificate-calculator";
import contenidoRegularIncomeCertificateCalculator from "./contenido/regular-income-certificate-calculator";
import specialSavingsCertificateCalculator from "./calculadoras/special-savings-certificate-calculator";
import contenidoSpecialSavingsCertificateCalculator from "./contenido/special-savings-certificate-calculator";
import shortTermSavingsCertificateCalculator from "./calculadoras/short-term-savings-certificate-calculator";
import contenidoShortTermSavingsCertificateCalculator from "./contenido/short-term-savings-certificate-calculator";
import nationalSavingsAccountCalculator from "./calculadoras/national-savings-account-calculator";
import contenidoNationalSavingsAccountCalculator from "./contenido/national-savings-account-calculator";
import dollarToPkr from "./calculadoras/dollar-to-pkr";
import contenidoDollarToPkr from "./contenido/dollar-to-pkr";
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
    { definicion: salaryTaxCalculator, contenido: contenidoSalaryTaxCalculator, cliente: () => import("./calculadoras/salary-tax-calculator.cliente") },
    { definicion: takeHomeSalaryCalculator, contenido: contenidoTakeHomeSalaryCalculator, cliente: () => import("./calculadoras/take-home-salary-calculator.cliente") },
    { definicion: eobiCalculator, contenido: contenidoEobiCalculator, cliente: () => import("./calculadoras/eobi-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: salesTaxCalculator, contenido: contenidoSalesTaxCalculator, cliente: () => import("./calculadoras/sales-tax-calculator.cliente") },
    { definicion: propertyTransferTaxCalculator, contenido: contenidoPropertyTransferTaxCalculator, cliente: () => import("./calculadoras/property-transfer-tax-calculator.cliente") },
    { definicion: bankProfitTaxCalculator, contenido: contenidoBankProfitTaxCalculator, cliente: () => import("./calculadoras/bank-profit-tax-calculator.cliente") },
    { definicion: foreignCardTaxCalculator, contenido: contenidoForeignCardTaxCalculator, cliente: () => import("./calculadoras/foreign-card-tax-calculator.cliente") },
    { definicion: zakatCalculator, contenido: contenidoZakatCalculator, cliente: () => import("./calculadoras/zakat-calculator.cliente") },
    { definicion: behboodSavingsCertificateCalculator, contenido: contenidoBehboodSavingsCertificateCalculator, cliente: () => import("./calculadoras/behbood-savings-certificate-calculator.cliente") },
    { definicion: regularIncomeCertificateCalculator, contenido: contenidoRegularIncomeCertificateCalculator, cliente: () => import("./calculadoras/regular-income-certificate-calculator.cliente") },
    { definicion: specialSavingsCertificateCalculator, contenido: contenidoSpecialSavingsCertificateCalculator, cliente: () => import("./calculadoras/special-savings-certificate-calculator.cliente") },
    { definicion: shortTermSavingsCertificateCalculator, contenido: contenidoShortTermSavingsCertificateCalculator, cliente: () => import("./calculadoras/short-term-savings-certificate-calculator.cliente") },
    { definicion: nationalSavingsAccountCalculator, contenido: contenidoNationalSavingsAccountCalculator, cliente: () => import("./calculadoras/national-savings-account-calculator.cliente") },
    { definicion: dollarToPkr, contenido: contenidoDollarToPkr, cliente: () => import("./calculadoras/dollar-to-pkr.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
