import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import netToGrossCalculator from "./calculadoras/net-to-gross-calculator";
import contenidoNetToGrossCalculator from "./contenido/net-to-gross-calculator";
import weeklyPayCalculator from "./calculadoras/weekly-pay-calculator";
import contenidoWeeklyPayCalculator from "./contenido/weekly-pay-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import bonusTaxCalculator from "./calculadoras/bonus-tax-calculator";
import contenidoBonusTaxCalculator from "./contenido/bonus-tax-calculator";
import nisCalculator from "./calculadoras/nis-calculator";
import contenidoNisCalculator from "./contenido/nis-calculator";
import healthSurchargeCalculator from "./calculadoras/health-surcharge-calculator";
import contenidoHealthSurchargeCalculator from "./contenido/health-surcharge-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import severanceTaxCalculator from "./calculadoras/severance-tax-calculator";
import contenidoSeveranceTaxCalculator from "./contenido/severance-tax-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import usdToTtd from "./calculadoras/usd-to-ttd";
import contenidoUsdToTtd from "./contenido/usd-to-ttd";
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
    { definicion: netToGrossCalculator, contenido: contenidoNetToGrossCalculator, cliente: () => import("./calculadoras/net-to-gross-calculator.cliente") },
    { definicion: weeklyPayCalculator, contenido: contenidoWeeklyPayCalculator, cliente: () => import("./calculadoras/weekly-pay-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: bonusTaxCalculator, contenido: contenidoBonusTaxCalculator, cliente: () => import("./calculadoras/bonus-tax-calculator.cliente") },
    { definicion: nisCalculator, contenido: contenidoNisCalculator, cliente: () => import("./calculadoras/nis-calculator.cliente") },
    { definicion: healthSurchargeCalculator, contenido: contenidoHealthSurchargeCalculator, cliente: () => import("./calculadoras/health-surcharge-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: severanceTaxCalculator, contenido: contenidoSeveranceTaxCalculator, cliente: () => import("./calculadoras/severance-tax-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: usdToTtd, contenido: contenidoUsdToTtd, cliente: () => import("./calculadoras/usd-to-ttd.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
