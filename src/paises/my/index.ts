import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import dailyRateCalculator from "./calculadoras/daily-rate-calculator";
import contenidoDailyRateCalculator from "./contenido/daily-rate-calculator";
import eisCalculator from "./calculadoras/eis-calculator";
import contenidoEisCalculator from "./contenido/eis-calculator";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import epfCalculator from "./calculadoras/epf-calculator";
import contenidoEpfCalculator from "./contenido/epf-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import maternityLeave from "./calculadoras/maternity-leave";
import contenidoMaternityLeave from "./contenido/maternity-leave";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import oprCalculator from "./calculadoras/opr-calculator";
import contenidoOprCalculator from "./contenido/opr-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import paternityLeave from "./calculadoras/paternity-leave";
import contenidoPaternityLeave from "./contenido/paternity-leave";
import pcbCalculator from "./calculadoras/pcb-calculator";
import contenidoPcbCalculator from "./contenido/pcb-calculator";
import rpgtCalculator from "./calculadoras/rpgt-calculator";
import contenidoRpgtCalculator from "./contenido/rpgt-calculator";
import sickLeave from "./calculadoras/sick-leave";
import contenidoSickLeave from "./contenido/sick-leave";
import socsoCalculator from "./calculadoras/socso-calculator";
import contenidoSocsoCalculator from "./contenido/socso-calculator";
import sstCalculator from "./calculadoras/sst-calculator";
import contenidoSstCalculator from "./contenido/sst-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import terminationBenefits from "./calculadoras/termination-benefits";
import contenidoTerminationBenefits from "./contenido/termination-benefits";
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
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: dailyRateCalculator, contenido: contenidoDailyRateCalculator, cliente: () => import("./calculadoras/daily-rate-calculator.cliente") },
    { definicion: eisCalculator, contenido: contenidoEisCalculator, cliente: () => import("./calculadoras/eis-calculator.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: epfCalculator, contenido: contenidoEpfCalculator, cliente: () => import("./calculadoras/epf-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: maternityLeave, contenido: contenidoMaternityLeave, cliente: () => import("./calculadoras/maternity-leave.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: oprCalculator, contenido: contenidoOprCalculator, cliente: () => import("./calculadoras/opr-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: paternityLeave, contenido: contenidoPaternityLeave, cliente: () => import("./calculadoras/paternity-leave.cliente") },
    { definicion: pcbCalculator, contenido: contenidoPcbCalculator, cliente: () => import("./calculadoras/pcb-calculator.cliente") },
    { definicion: rpgtCalculator, contenido: contenidoRpgtCalculator, cliente: () => import("./calculadoras/rpgt-calculator.cliente") },
    { definicion: sickLeave, contenido: contenidoSickLeave, cliente: () => import("./calculadoras/sick-leave.cliente") },
    { definicion: socsoCalculator, contenido: contenidoSocsoCalculator, cliente: () => import("./calculadoras/socso-calculator.cliente") },
    { definicion: sstCalculator, contenido: contenidoSstCalculator, cliente: () => import("./calculadoras/sst-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: terminationBenefits, contenido: contenidoTerminationBenefits, cliente: () => import("./calculadoras/termination-benefits.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
