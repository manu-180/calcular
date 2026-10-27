import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import colaIncrease from "./calculadoras/cola-increase";
import contenidoColaIncrease from "./contenido/cola-increase";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import fixedTermContract from "./calculadoras/fixed-term-contract";
import contenidoFixedTermContract from "./contenido/fixed-term-contract";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import probationPeriod from "./calculadoras/probation-period";
import contenidoProbationPeriod from "./contenido/probation-period";
import propertyTransferTax from "./calculadoras/property-transfer-tax";
import contenidoPropertyTransferTax from "./contenido/property-transfer-tax";
import sscCalculator from "./calculadoras/ssc-calculator";
import contenidoSscCalculator from "./contenido/ssc-calculator";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import statutoryBonus from "./calculadoras/statutory-bonus";
import contenidoStatutoryBonus from "./contenido/statutory-bonus";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
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
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: colaIncrease, contenido: contenidoColaIncrease, cliente: () => import("./calculadoras/cola-increase.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: fixedTermContract, contenido: contenidoFixedTermContract, cliente: () => import("./calculadoras/fixed-term-contract.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: probationPeriod, contenido: contenidoProbationPeriod, cliente: () => import("./calculadoras/probation-period.cliente") },
    { definicion: propertyTransferTax, contenido: contenidoPropertyTransferTax, cliente: () => import("./calculadoras/property-transfer-tax.cliente") },
    { definicion: sscCalculator, contenido: contenidoSscCalculator, cliente: () => import("./calculadoras/ssc-calculator.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: statutoryBonus, contenido: contenidoStatutoryBonus, cliente: () => import("./calculadoras/statutory-bonus.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
