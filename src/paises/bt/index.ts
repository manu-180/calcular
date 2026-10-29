import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import finalPayDeadlineCalculator from "./calculadoras/final-pay-deadline-calculator";
import contenidoFinalPayDeadlineCalculator from "./contenido/final-pay-deadline-calculator";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import ngultrumToRupee from "./calculadoras/ngultrum-to-rupee";
import contenidoNgultrumToRupee from "./contenido/ngultrum-to-rupee";
import nightDutyPayCalculator from "./calculadoras/night-duty-pay-calculator";
import contenidoNightDutyPayCalculator from "./contenido/night-duty-pay-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import overtimePayCalculator from "./calculadoras/overtime-pay-calculator";
import contenidoOvertimePayCalculator from "./contenido/overtime-pay-calculator";
import privateProvidentFundCalculator from "./calculadoras/private-provident-fund-calculator";
import contenidoPrivateProvidentFundCalculator from "./contenido/private-provident-fund-calculator";
import probationPeriodCalculator from "./calculadoras/probation-period-calculator";
import contenidoProbationPeriodCalculator from "./contenido/probation-period-calculator";
import publicHolidayPayCalculator from "./calculadoras/public-holiday-pay-calculator";
import contenidoPublicHolidayPayCalculator from "./contenido/public-holiday-pay-calculator";
import salaryDeductionLimitCalculator from "./calculadoras/salary-deduction-limit-calculator";
import contenidoSalaryDeductionLimitCalculator from "./contenido/salary-deduction-limit-calculator";
import wrongfulDismissalCompensationCalculator from "./calculadoras/wrongful-dismissal-compensation-calculator";
import contenidoWrongfulDismissalCompensationCalculator from "./contenido/wrongful-dismissal-compensation-calculator";
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
    { definicion: finalPayDeadlineCalculator, contenido: contenidoFinalPayDeadlineCalculator, cliente: () => import("./calculadoras/final-pay-deadline-calculator.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: ngultrumToRupee, contenido: contenidoNgultrumToRupee, cliente: () => import("./calculadoras/ngultrum-to-rupee.cliente") },
    { definicion: nightDutyPayCalculator, contenido: contenidoNightDutyPayCalculator, cliente: () => import("./calculadoras/night-duty-pay-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: overtimePayCalculator, contenido: contenidoOvertimePayCalculator, cliente: () => import("./calculadoras/overtime-pay-calculator.cliente") },
    { definicion: privateProvidentFundCalculator, contenido: contenidoPrivateProvidentFundCalculator, cliente: () => import("./calculadoras/private-provident-fund-calculator.cliente") },
    { definicion: probationPeriodCalculator, contenido: contenidoProbationPeriodCalculator, cliente: () => import("./calculadoras/probation-period-calculator.cliente") },
    { definicion: publicHolidayPayCalculator, contenido: contenidoPublicHolidayPayCalculator, cliente: () => import("./calculadoras/public-holiday-pay-calculator.cliente") },
    { definicion: salaryDeductionLimitCalculator, contenido: contenidoSalaryDeductionLimitCalculator, cliente: () => import("./calculadoras/salary-deduction-limit-calculator.cliente") },
    { definicion: wrongfulDismissalCompensationCalculator, contenido: contenidoWrongfulDismissalCompensationCalculator, cliente: () => import("./calculadoras/wrongful-dismissal-compensation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
