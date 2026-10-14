import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import cpfContributionCalculator from "./calculadoras/cpf-contribution-calculator";
import contenidoCpfContributionCalculator from "./contenido/cpf-contribution-calculator";
import cpfAllocation from "./calculadoras/cpf-allocation";
import contenidoCpfAllocation from "./contenido/cpf-allocation";
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
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: cpfContributionCalculator, contenido: contenidoCpfContributionCalculator, cliente: () => import("./calculadoras/cpf-contribution-calculator.cliente") },
    { definicion: cpfAllocation, contenido: contenidoCpfAllocation, cliente: () => import("./calculadoras/cpf-allocation.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
