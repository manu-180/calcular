import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import expatriatePayrollTax from "./calculadoras/expatriate-payroll-tax";
import contenidoExpatriatePayrollTax from "./contenido/expatriate-payroll-tax";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import sshfcContribution from "./calculadoras/sshfc-contribution";
import contenidoSshfcContribution from "./contenido/sshfc-contribution";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
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
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: expatriatePayrollTax, contenido: contenidoExpatriatePayrollTax, cliente: () => import("./calculadoras/expatriate-payroll-tax.cliente") },
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: sshfcContribution, contenido: contenidoSshfcContribution, cliente: () => import("./calculadoras/sshfc-contribution.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: vatCalculator, contenido: contenidoVatCalculator, cliente: () => import("./calculadoras/vat-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
