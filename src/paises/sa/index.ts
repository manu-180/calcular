import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import annualLeaveCalculator from "./calculadoras/annual-leave-calculator";
import contenidoAnnualLeaveCalculator from "./contenido/annual-leave-calculator";
import employeeCostCalculator from "./calculadoras/employee-cost-calculator";
import contenidoEmployeeCostCalculator from "./contenido/employee-cost-calculator";
import endOfServiceCalculator from "./calculadoras/end-of-service-calculator";
import contenidoEndOfServiceCalculator from "./contenido/end-of-service-calculator";
import finalSettlement from "./calculadoras/final-settlement";
import contenidoFinalSettlement from "./contenido/final-settlement";
import gosiCalculator from "./calculadoras/gosi-calculator";
import contenidoGosiCalculator from "./contenido/gosi-calculator";
import maternityLeaveCalculator from "./calculadoras/maternity-leave-calculator";
import contenidoMaternityLeaveCalculator from "./contenido/maternity-leave-calculator";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import ramadanWorkingHours from "./calculadoras/ramadan-working-hours";
import contenidoRamadanWorkingHours from "./contenido/ramadan-working-hours";
import realEstateTransactionTax from "./calculadoras/real-estate-transaction-tax";
import contenidoRealEstateTransactionTax from "./contenido/real-estate-transaction-tax";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import sickLeaveCalculator from "./calculadoras/sick-leave-calculator";
import contenidoSickLeaveCalculator from "./contenido/sick-leave-calculator";
import unfairDismissalCompensation from "./calculadoras/unfair-dismissal-compensation";
import contenidoUnfairDismissalCompensation from "./contenido/unfair-dismissal-compensation";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import zakatCalculator from "./calculadoras/zakat-calculator";
import contenidoZakatCalculator from "./contenido/zakat-calculator";
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
    { definicion: annualLeaveCalculator, contenido: contenidoAnnualLeaveCalculator, cliente: () => import("./calculadoras/annual-leave-calculator.cliente") },
    { definicion: employeeCostCalculator, contenido: contenidoEmployeeCostCalculator, cliente: () => import("./calculadoras/employee-cost-calculator.cliente") },
    { definicion: endOfServiceCalculator, contenido: contenidoEndOfServiceCalculator, cliente: () => import("./calculadoras/end-of-service-calculator.cliente") },
    { definicion: finalSettlement, contenido: contenidoFinalSettlement, cliente: () => import("./calculadoras/final-settlement.cliente") },
    { definicion: gosiCalculator, contenido: contenidoGosiCalculator, cliente: () => import("./calculadoras/gosi-calculator.cliente") },
    { definicion: maternityLeaveCalculator, contenido: contenidoMaternityLeaveCalculator, cliente: () => import("./calculadoras/maternity-leave-calculator.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: ramadanWorkingHours, contenido: contenidoRamadanWorkingHours, cliente: () => import("./calculadoras/ramadan-working-hours.cliente") },
    { definicion: realEstateTransactionTax, contenido: contenidoRealEstateTransactionTax, cliente: () => import("./calculadoras/real-estate-transaction-tax.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: sickLeaveCalculator, contenido: contenidoSickLeaveCalculator, cliente: () => import("./calculadoras/sick-leave-calculator.cliente") },
    { definicion: unfairDismissalCompensation, contenido: contenidoUnfairDismissalCompensation, cliente: () => import("./calculadoras/unfair-dismissal-compensation.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: zakatCalculator, contenido: contenidoZakatCalculator, cliente: () => import("./calculadoras/zakat-calculator.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
