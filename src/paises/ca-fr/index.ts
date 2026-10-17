import { definirEdicion } from "@/motor/registro";
import ca from "../ca";
import contenidoCanadaChildBenefit from "./contenido/canada-child-benefit";
import contenidoCppCalculator from "./contenido/cpp-calculator";
import contenidoEiBenefitsCalculator from "./contenido/ei-benefits-calculator";
import contenidoEiPremiumCalculator from "./contenido/ei-premium-calculator";
import contenidoEmployerPayrollCost from "./contenido/employer-payroll-cost";
import contenidoInflationCalculator from "./contenido/inflation-calculator";
import contenidoMinimumWage from "./contenido/minimum-wage";
import contenidoOasClawback from "./contenido/oas-clawback";
import contenidoRrspContributionLimit from "./contenido/rrsp-contribution-limit";
import contenidoSalesTaxCalculator from "./contenido/sales-tax-calculator";
import contenidoTfsaContributionRoom from "./contenido/tfsa-contribution-room";
import contenidoUsdToCad from "./contenido/usd-to-cad";
import contenidoVariableRateMortgage from "./contenido/variable-rate-mortgage";
import { mercado } from "./mercado";
import textosCanadaChildBenefit from "./textos/canada-child-benefit";
import textosCppCalculator from "./textos/cpp-calculator";
import textosEiBenefitsCalculator from "./textos/ei-benefits-calculator";
import textosEiPremiumCalculator from "./textos/ei-premium-calculator";
import textosEmployerPayrollCost from "./textos/employer-payroll-cost";
import textosInflationCalculator from "./textos/inflation-calculator";
import textosMinimumWage from "./textos/minimum-wage";
import textosOasClawback from "./textos/oas-clawback";
import textosRrspContributionLimit from "./textos/rrsp-contribution-limit";
import textosSalesTaxCalculator from "./textos/sales-tax-calculator";
import textosTfsaContributionRoom from "./textos/tfsa-contribution-room";
import textosUsdToCad from "./textos/usd-to-cad";
import textosVariableRateMortgage from "./textos/variable-rate-mortgage";

// Edición en francés de Canadá para Quebec. Quedan afuera las calculadoras de ca que no cubren
// Quebec: impuesto sobre la renta, sueldo neto y ganancias de capital (sin el impuesto provincial
// de Quebec), impuesto de transferencia (solo ON, Toronto y BC) y las laborales de ON, BC, AB y
// federal (vacaciones, horas extra, preaviso e indemnización, sin las normas de la CNESST).
export default definirEdicion(ca, {
  mercado,
  traducciones: [
    { textos: textosSalesTaxCalculator, contenido: contenidoSalesTaxCalculator },
    { textos: textosMinimumWage, contenido: contenidoMinimumWage },
    { textos: textosCppCalculator, contenido: contenidoCppCalculator },
    { textos: textosEiPremiumCalculator, contenido: contenidoEiPremiumCalculator },
    { textos: textosEiBenefitsCalculator, contenido: contenidoEiBenefitsCalculator },
    { textos: textosEmployerPayrollCost, contenido: contenidoEmployerPayrollCost },
    { textos: textosCanadaChildBenefit, contenido: contenidoCanadaChildBenefit },
    { textos: textosOasClawback, contenido: contenidoOasClawback },
    { textos: textosRrspContributionLimit, contenido: contenidoRrspContributionLimit },
    { textos: textosTfsaContributionRoom, contenido: contenidoTfsaContributionRoom },
    { textos: textosInflationCalculator, contenido: contenidoInflationCalculator },
    { textos: textosUsdToCad, contenido: contenidoUsdToCad },
    { textos: textosVariableRateMortgage, contenido: contenidoVariableRateMortgage },
  ],
  universales: "todas",
});
