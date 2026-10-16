import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import eisCalculator from "./calculadoras/eis-calculator";
import contenidoEisCalculator from "./contenido/eis-calculator";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import pcbCalculator from "./calculadoras/pcb-calculator";
import contenidoPcbCalculator from "./contenido/pcb-calculator";
import socsoCalculator from "./calculadoras/socso-calculator";
import contenidoSocsoCalculator from "./contenido/socso-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
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
    { definicion: eisCalculator, contenido: contenidoEisCalculator, cliente: () => import("./calculadoras/eis-calculator.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: pcbCalculator, contenido: contenidoPcbCalculator, cliente: () => import("./calculadoras/pcb-calculator.cliente") },
    { definicion: socsoCalculator, contenido: contenidoSocsoCalculator, cliente: () => import("./calculadoras/socso-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
