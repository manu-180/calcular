import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import csgCalculator from "./calculadoras/csg-calculator";
import contenidoCsgCalculator from "./contenido/csg-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import salaryCompensationCalculator from "./calculadoras/salary-compensation-calculator";
import contenidoSalaryCompensationCalculator from "./contenido/salary-compensation-calculator";
import endOfYearBonusCalculator from "./calculadoras/end-of-year-bonus-calculator";
import contenidoEndOfYearBonusCalculator from "./contenido/end-of-year-bonus-calculator";
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
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: csgCalculator, contenido: contenidoCsgCalculator, cliente: () => import("./calculadoras/csg-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: salaryCompensationCalculator, contenido: contenidoSalaryCompensationCalculator, cliente: () => import("./calculadoras/salary-compensation-calculator.cliente") },
    { definicion: endOfYearBonusCalculator, contenido: contenidoEndOfYearBonusCalculator, cliente: () => import("./calculadoras/end-of-year-bonus-calculator.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "mu.vat" } }] },
  novedades,
  detectores,
});
