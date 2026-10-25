import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import nisNhtEducationTaxCalculator from "./calculadoras/nis-nht-education-tax-calculator";
import contenidoNisNhtEducationTaxCalculator from "./contenido/nis-nht-education-tax-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
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
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: nisNhtEducationTaxCalculator, contenido: contenidoNisNhtEducationTaxCalculator, cliente: () => import("./calculadoras/nis-nht-education-tax-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
