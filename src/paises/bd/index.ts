import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import salaryTaxCalculator from "./calculadoras/salary-tax-calculator";
import taxRebateCalculator from "./calculadoras/tax-rebate-calculator";
import vatCalculator from "./calculadoras/vat-calculator";
import tdsCalculator from "./calculadoras/tds-calculator";
import sanchayapatraCalculator from "./calculadoras/sanchayapatra-calculator";
import fdrCalculator from "./calculadoras/fdr-calculator";
import dpsCalculator from "./calculadoras/dps-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import contenidoSalaryTaxCalculator from "./contenido/salary-tax-calculator";
import contenidoTaxRebateCalculator from "./contenido/tax-rebate-calculator";
import contenidoVatCalculator from "./contenido/vat-calculator";
import contenidoTdsCalculator from "./contenido/tds-calculator";
import contenidoSanchayapatraCalculator from "./contenido/sanchayapatra-calculator";
import contenidoFdrCalculator from "./contenido/fdr-calculator";
import contenidoDpsCalculator from "./contenido/dps-calculator";
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
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: salaryTaxCalculator, contenido: contenidoSalaryTaxCalculator, cliente: () => import("./calculadoras/salary-tax-calculator.cliente") },
    { definicion: taxRebateCalculator, contenido: contenidoTaxRebateCalculator, cliente: () => import("./calculadoras/tax-rebate-calculator.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
    { definicion: tdsCalculator, contenido: contenidoTdsCalculator, cliente: () => import("./calculadoras/tds-calculator.cliente") },
    { definicion: sanchayapatraCalculator, contenido: contenidoSanchayapatraCalculator, cliente: () => import("./calculadoras/sanchayapatra-calculator.cliente") },
    { definicion: fdrCalculator, contenido: contenidoFdrCalculator, cliente: () => import("./calculadoras/fdr-calculator.cliente") },
    { definicion: dpsCalculator, contenido: contenidoDpsCalculator, cliente: () => import("./calculadoras/dps-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
