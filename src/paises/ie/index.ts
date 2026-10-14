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
  ],
  universales: "todas",
  novedades,
  detectores,
});
