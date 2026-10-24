import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import nssfCalculator from "./calculadoras/nssf-calculator";
import contenidoNssfCalculator from "./contenido/nssf-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import localServiceTaxCalculator from "./calculadoras/local-service-tax-calculator";
import contenidoLocalServiceTaxCalculator from "./contenido/local-service-tax-calculator";
import nssfMidtermAccessCalculator from "./calculadoras/nssf-midterm-access-calculator";
import contenidoNssfMidtermAccessCalculator from "./contenido/nssf-midterm-access-calculator";
import withholdingTaxCalculator from "./calculadoras/withholding-tax-calculator";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import rentalIncomeTaxCalculator from "./calculadoras/rental-income-tax-calculator";
import contenidoRentalIncomeTaxCalculator from "./contenido/rental-income-tax-calculator";
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
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: localServiceTaxCalculator, contenido: contenidoLocalServiceTaxCalculator, cliente: () => import("./calculadoras/local-service-tax-calculator.cliente") },
    { definicion: nssfMidtermAccessCalculator, contenido: contenidoNssfMidtermAccessCalculator, cliente: () => import("./calculadoras/nssf-midterm-access-calculator.cliente") },
    { definicion: withholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator, cliente: () => import("./calculadoras/withholding-tax-calculator.cliente") },
    { definicion: rentalIncomeTaxCalculator, contenido: contenidoRentalIncomeTaxCalculator, cliente: () => import("./calculadoras/rental-income-tax-calculator.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "ug.vat" } }] },
  novedades,
  detectores,
});
