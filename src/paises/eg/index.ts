import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import netSalary from "./calculadoras/net-salary";
import contenidoNetSalary from "./contenido/net-salary";
import salaryTax from "./calculadoras/salary-tax";
import contenidoSalaryTax from "./contenido/salary-tax";
import socialInsurance from "./calculadoras/social-insurance";
import contenidoSocialInsurance from "./contenido/social-insurance";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import grossFromNet from "./calculadoras/gross-from-net";
import contenidoGrossFromNet from "./contenido/gross-from-net";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import overtime from "./calculadoras/overtime";
import contenidoOvertime from "./contenido/overtime";
import unfairDismissal from "./calculadoras/unfair-dismissal";
import contenidoUnfairDismissal from "./contenido/unfair-dismissal";
import noticePeriod from "./calculadoras/notice-period";
import contenidoNoticePeriod from "./contenido/notice-period";
import redundancyPay from "./calculadoras/redundancy-pay";
import contenidoRedundancyPay from "./contenido/redundancy-pay";
import endOfService from "./calculadoras/end-of-service";
import contenidoEndOfService from "./contenido/end-of-service";
import pension from "./calculadoras/pension";
import contenidoPension from "./contenido/pension";
import lumpSum from "./calculadoras/lump-sum";
import contenidoLumpSum from "./contenido/lump-sum";
import unemploymentBenefit from "./calculadoras/unemployment-benefit";
import contenidoUnemploymentBenefit from "./contenido/unemployment-benefit";
import sickPay from "./calculadoras/sick-pay";
import contenidoSickPay from "./contenido/sick-pay";
import maternityLeave from "./calculadoras/maternity-leave";
import contenidoMaternityLeave from "./contenido/maternity-leave";
import annualRaise from "./calculadoras/annual-raise";
import contenidoAnnualRaise from "./contenido/annual-raise";
import realEstateTax from "./calculadoras/real-estate-tax";
import contenidoRealEstateTax from "./contenido/real-estate-tax";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import dollarToPound from "./calculadoras/dollar-to-pound";
import contenidoDollarToPound from "./contenido/dollar-to-pound";
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
    { definicion: netSalary, contenido: contenidoNetSalary, cliente: () => import("./calculadoras/net-salary.cliente") },
    { definicion: salaryTax, contenido: contenidoSalaryTax, cliente: () => import("./calculadoras/salary-tax.cliente") },
    { definicion: socialInsurance, contenido: contenidoSocialInsurance, cliente: () => import("./calculadoras/social-insurance.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: grossFromNet, contenido: contenidoGrossFromNet, cliente: () => import("./calculadoras/gross-from-net.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: overtime, contenido: contenidoOvertime, cliente: () => import("./calculadoras/overtime.cliente") },
    { definicion: unfairDismissal, contenido: contenidoUnfairDismissal, cliente: () => import("./calculadoras/unfair-dismissal.cliente") },
    { definicion: noticePeriod, contenido: contenidoNoticePeriod, cliente: () => import("./calculadoras/notice-period.cliente") },
    { definicion: redundancyPay, contenido: contenidoRedundancyPay, cliente: () => import("./calculadoras/redundancy-pay.cliente") },
    { definicion: endOfService, contenido: contenidoEndOfService, cliente: () => import("./calculadoras/end-of-service.cliente") },
    { definicion: pension, contenido: contenidoPension, cliente: () => import("./calculadoras/pension.cliente") },
    { definicion: lumpSum, contenido: contenidoLumpSum, cliente: () => import("./calculadoras/lump-sum.cliente") },
    { definicion: unemploymentBenefit, contenido: contenidoUnemploymentBenefit, cliente: () => import("./calculadoras/unemployment-benefit.cliente") },
    { definicion: sickPay, contenido: contenidoSickPay, cliente: () => import("./calculadoras/sick-pay.cliente") },
    { definicion: maternityLeave, contenido: contenidoMaternityLeave, cliente: () => import("./calculadoras/maternity-leave.cliente") },
    { definicion: annualRaise, contenido: contenidoAnnualRaise, cliente: () => import("./calculadoras/annual-raise.cliente") },
    { definicion: realEstateTax, contenido: contenidoRealEstateTax, cliente: () => import("./calculadoras/real-estate-tax.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: dollarToPound, contenido: contenidoDollarToPound, cliente: () => import("./calculadoras/dollar-to-pound.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "eg.vat" } }] },
  novedades,
  detectores,
});
