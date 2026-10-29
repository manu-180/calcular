import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import holidayPayCalculator from "./calculadoras/holiday-pay-calculator";
import contenidoHolidayPayCalculator from "./contenido/holiday-pay-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import landTaxCalculator from "./calculadoras/land-tax-calculator";
import contenidoLandTaxCalculator from "./contenido/land-tax-calculator";
import maternityBenefitCalculator from "./calculadoras/maternity-benefit-calculator";
import contenidoMaternityBenefitCalculator from "./contenido/maternity-benefit-calculator";
import minimumWageCalculator from "./calculadoras/minimum-wage-calculator";
import contenidoMinimumWageCalculator from "./contenido/minimum-wage-calculator";
import nisCalculator from "./calculadoras/nis-calculator";
import contenidoNisCalculator from "./contenido/nis-calculator";
import nisPensionCalculator from "./calculadoras/nis-pension-calculator";
import contenidoNisPensionCalculator from "./contenido/nis-pension-calculator";
import noticePeriodCalculator from "./calculadoras/notice-period-calculator";
import contenidoNoticePeriodCalculator from "./contenido/notice-period-calculator";
import overtimeCalculator from "./calculadoras/overtime-calculator";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import paternityBenefitCalculator from "./calculadoras/paternity-benefit-calculator";
import contenidoPaternityBenefitCalculator from "./contenido/paternity-benefit-calculator";
import propertyTransferTaxCalculator from "./calculadoras/property-transfer-tax-calculator";
import contenidoPropertyTransferTaxCalculator from "./contenido/property-transfer-tax-calculator";
import salaryCalculator from "./calculadoras/salary-calculator";
import contenidoSalaryCalculator from "./contenido/salary-calculator";
import severancePayCalculator from "./calculadoras/severance-pay-calculator";
import contenidoSeverancePayCalculator from "./contenido/severance-pay-calculator";
import sicknessBenefitCalculator from "./calculadoras/sickness-benefit-calculator";
import contenidoSicknessBenefitCalculator from "./contenido/sickness-benefit-calculator";
import unemploymentBenefitCalculator from "./calculadoras/unemployment-benefit-calculator";
import contenidoUnemploymentBenefitCalculator from "./contenido/unemployment-benefit-calculator";
import usdToBbd from "./calculadoras/usd-to-bbd";
import contenidoUsdToBbd from "./contenido/usd-to-bbd";
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
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
    { definicion: holidayPayCalculator, contenido: contenidoHolidayPayCalculator, cliente: () => import("./calculadoras/holiday-pay-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
    { definicion: landTaxCalculator, contenido: contenidoLandTaxCalculator, cliente: () => import("./calculadoras/land-tax-calculator.cliente") },
    { definicion: maternityBenefitCalculator, contenido: contenidoMaternityBenefitCalculator, cliente: () => import("./calculadoras/maternity-benefit-calculator.cliente") },
    { definicion: minimumWageCalculator, contenido: contenidoMinimumWageCalculator, cliente: () => import("./calculadoras/minimum-wage-calculator.cliente") },
    { definicion: nisCalculator, contenido: contenidoNisCalculator, cliente: () => import("./calculadoras/nis-calculator.cliente") },
    { definicion: nisPensionCalculator, contenido: contenidoNisPensionCalculator, cliente: () => import("./calculadoras/nis-pension-calculator.cliente") },
    { definicion: noticePeriodCalculator, contenido: contenidoNoticePeriodCalculator, cliente: () => import("./calculadoras/notice-period-calculator.cliente") },
    { definicion: overtimeCalculator, contenido: contenidoOvertimeCalculator, cliente: () => import("./calculadoras/overtime-calculator.cliente") },
    { definicion: paternityBenefitCalculator, contenido: contenidoPaternityBenefitCalculator, cliente: () => import("./calculadoras/paternity-benefit-calculator.cliente") },
    { definicion: propertyTransferTaxCalculator, contenido: contenidoPropertyTransferTaxCalculator, cliente: () => import("./calculadoras/property-transfer-tax-calculator.cliente") },
    { definicion: salaryCalculator, contenido: contenidoSalaryCalculator, cliente: () => import("./calculadoras/salary-calculator.cliente") },
    { definicion: severancePayCalculator, contenido: contenidoSeverancePayCalculator, cliente: () => import("./calculadoras/severance-pay-calculator.cliente") },
    { definicion: sicknessBenefitCalculator, contenido: contenidoSicknessBenefitCalculator, cliente: () => import("./calculadoras/sickness-benefit-calculator.cliente") },
    { definicion: unemploymentBenefitCalculator, contenido: contenidoUnemploymentBenefitCalculator, cliente: () => import("./calculadoras/unemployment-benefit-calculator.cliente") },
    { definicion: usdToBbd, contenido: contenidoUsdToBbd, cliente: () => import("./calculadoras/usd-to-bbd.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
