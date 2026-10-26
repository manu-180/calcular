import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import colaIncrease from "./calculadoras/cola-increase";
import contenidoColaIncrease from "./contenido/cola-increase";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
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
    { definicion: colaIncrease, contenido: contenidoColaIncrease, cliente: () => import("./calculadoras/cola-increase.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
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
