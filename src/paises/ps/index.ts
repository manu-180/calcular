import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import endOfServiceCalculator from "./calculadoras/end-of-service-calculator";
import contenidoEndOfServiceCalculator from "./contenido/end-of-service-calculator";
import finalSettlement from "./calculadoras/final-settlement";
import contenidoFinalSettlement from "./contenido/final-settlement";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import salaryDeductionCalculator from "./calculadoras/salary-deduction-calculator";
import contenidoSalaryDeductionCalculator from "./contenido/salary-deduction-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import unfairDismissalCompensation from "./calculadoras/unfair-dismissal-compensation";
import contenidoUnfairDismissalCompensation from "./contenido/unfair-dismissal-compensation";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// Sin calculadora local de VAT, impuesto a la renta ni tipo de cambio: ninguna fuente oficial abrió
// (ver scripts/paises/ps/INFORME.md). La universal de VAT entra sin tasa fijada.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: endOfServiceCalculator, contenido: contenidoEndOfServiceCalculator, cliente: () => import("./calculadoras/end-of-service-calculator.cliente") },
    { definicion: finalSettlement, contenido: contenidoFinalSettlement, cliente: () => import("./calculadoras/final-settlement.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: salaryDeductionCalculator, contenido: contenidoSalaryDeductionCalculator, cliente: () => import("./calculadoras/salary-deduction-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: unfairDismissalCompensation, contenido: contenidoUnfairDismissalCompensation, cliente: () => import("./calculadoras/unfair-dismissal-compensation.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
