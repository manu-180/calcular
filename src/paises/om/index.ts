import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import employeeCostCalculator from "./calculadoras/employee-cost-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import spfContributionCalculator from "./calculadoras/spf-contribution-calculator";
import contenidoSpfContributionCalculator from "./contenido/spf-contribution-calculator";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// El IVA es local (vat-calculator): la universal del mismo concepto se cae sola.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: employeeCostCalculator, contenido: contenidoEmployeeCostCalculator, cliente: () => import("./calculadoras/employee-cost-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: spfContributionCalculator, contenido: contenidoSpfContributionCalculator, cliente: () => import("./calculadoras/spf-contribution-calculator.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
