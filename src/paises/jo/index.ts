import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import employeeCostCalculator from "./calculadoras/employee-cost-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import socialSecurityCalculator from "./calculadoras/social-security-calculator";
import contenidoSocialSecurityCalculator from "./contenido/social-security-calculator";
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
    { definicion: employeeCostCalculator, contenido: contenidoEmployeeCostCalculator, cliente: () => import("./calculadoras/employee-cost-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: socialSecurityCalculator, contenido: contenidoSocialSecurityCalculator, cliente: () => import("./calculadoras/social-security-calculator.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
