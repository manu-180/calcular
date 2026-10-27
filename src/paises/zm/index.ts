import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import napsaCalculator from "./calculadoras/napsa-calculator";
import contenidoNapsaCalculator from "./contenido/napsa-calculator";
import nhimaCalculator from "./calculadoras/nhima-calculator";
import contenidoNhimaCalculator from "./contenido/nhima-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import skillsDevelopmentLevyCalculator from "./calculadoras/skills-development-levy-calculator";
import contenidoSkillsDevelopmentLevyCalculator from "./contenido/skills-development-levy-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import leaveDaysCalculator from "./calculadoras/leave-days-calculator";
import contenidoLeaveDaysCalculator from "./contenido/leave-days-calculator";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import redundancyPayCalculator from "./calculadoras/redundancy-pay-calculator";
import contenidoRedundancyPayCalculator from "./contenido/redundancy-pay-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
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
    { definicion: napsaCalculator, contenido: contenidoNapsaCalculator, cliente: () => import("./calculadoras/napsa-calculator.cliente") },
    { definicion: nhimaCalculator, contenido: contenidoNhimaCalculator, cliente: () => import("./calculadoras/nhima-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: skillsDevelopmentLevyCalculator, contenido: contenidoSkillsDevelopmentLevyCalculator, cliente: () => import("./calculadoras/skills-development-levy-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: leaveDaysCalculator, contenido: contenidoLeaveDaysCalculator, cliente: () => import("./calculadoras/leave-days-calculator.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: redundancyPayCalculator, contenido: contenidoRedundancyPayCalculator, cliente: () => import("./calculadoras/redundancy-pay-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
