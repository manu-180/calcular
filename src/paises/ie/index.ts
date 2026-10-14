import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import uscCalculator from "./calculadoras/usc-calculator";
import contenidoUscCalculator from "./contenido/usc-calculator";
import prsiCalculator from "./calculadoras/prsi-calculator";
import contenidoPrsiCalculator from "./contenido/prsi-calculator";
import employerPrsiCalculator from "./calculadoras/employer-prsi-calculator";
import contenidoEmployerPrsiCalculator from "./contenido/employer-prsi-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import redundancyPay from "./calculadoras/redundancy-pay";
import contenidoRedundancyPay from "./contenido/redundancy-pay";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import publicHolidayPay from "./calculadoras/public-holiday-pay";
import contenidoPublicHolidayPay from "./contenido/public-holiday-pay";
import maternityBenefit from "./calculadoras/maternity-benefit";
import contenidoMaternityBenefit from "./contenido/maternity-benefit";
import jobseekersBenefit from "./calculadoras/jobseekers-benefit";
import contenidoJobseekersBenefit from "./contenido/jobseekers-benefit";
import illnessBenefit from "./calculadoras/illness-benefit";
import contenidoIllnessBenefit from "./contenido/illness-benefit";
import childBenefit from "./calculadoras/child-benefit";
import contenidoChildBenefit from "./contenido/child-benefit";
import stampDutyCalculator from "./calculadoras/stamp-duty-calculator";
import contenidoStampDutyCalculator from "./contenido/stamp-duty-calculator";
import helpToBuy from "./calculadoras/help-to-buy";
import contenidoHelpToBuy from "./contenido/help-to-buy";
import localPropertyTax from "./calculadoras/local-property-tax";
import contenidoLocalPropertyTax from "./contenido/local-property-tax";
import capitalGainsTax from "./calculadoras/capital-gains-tax";
import contenidoCapitalGainsTax from "./contenido/capital-gains-tax";
import capitalAcquisitionsTax from "./calculadoras/capital-acquisitions-tax";
import contenidoCapitalAcquisitionsTax from "./contenido/capital-acquisitions-tax";
import rentTaxCredit from "./calculadoras/rent-tax-credit";
import contenidoRentTaxCredit from "./contenido/rent-tax-credit";
import inflationCalculator from "./calculadoras/inflation-calculator";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
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
    { definicion: uscCalculator, contenido: contenidoUscCalculator, cliente: () => import("./calculadoras/usc-calculator.cliente") },
    { definicion: prsiCalculator, contenido: contenidoPrsiCalculator, cliente: () => import("./calculadoras/prsi-calculator.cliente") },
    { definicion: employerPrsiCalculator, contenido: contenidoEmployerPrsiCalculator, cliente: () => import("./calculadoras/employer-prsi-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: redundancyPay, contenido: contenidoRedundancyPay, cliente: () => import("./calculadoras/redundancy-pay.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: publicHolidayPay, contenido: contenidoPublicHolidayPay, cliente: () => import("./calculadoras/public-holiday-pay.cliente") },
    { definicion: maternityBenefit, contenido: contenidoMaternityBenefit, cliente: () => import("./calculadoras/maternity-benefit.cliente") },
    { definicion: jobseekersBenefit, contenido: contenidoJobseekersBenefit, cliente: () => import("./calculadoras/jobseekers-benefit.cliente") },
    { definicion: illnessBenefit, contenido: contenidoIllnessBenefit, cliente: () => import("./calculadoras/illness-benefit.cliente") },
    { definicion: childBenefit, contenido: contenidoChildBenefit, cliente: () => import("./calculadoras/child-benefit.cliente") },
    { definicion: stampDutyCalculator, contenido: contenidoStampDutyCalculator, cliente: () => import("./calculadoras/stamp-duty-calculator.cliente") },
    { definicion: helpToBuy, contenido: contenidoHelpToBuy, cliente: () => import("./calculadoras/help-to-buy.cliente") },
    { definicion: localPropertyTax, contenido: contenidoLocalPropertyTax, cliente: () => import("./calculadoras/local-property-tax.cliente") },
    { definicion: capitalGainsTax, contenido: contenidoCapitalGainsTax, cliente: () => import("./calculadoras/capital-gains-tax.cliente") },
    { definicion: capitalAcquisitionsTax, contenido: contenidoCapitalAcquisitionsTax, cliente: () => import("./calculadoras/capital-acquisitions-tax.cliente") },
    { definicion: rentTaxCredit, contenido: contenidoRentTaxCredit, cliente: () => import("./calculadoras/rent-tax-credit.cliente") },
    { definicion: inflationCalculator, contenido: contenidoInflationCalculator, cliente: () => import("./calculadoras/inflation-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
