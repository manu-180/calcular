import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import uifCalculator from "./calculadoras/uif-calculator";
import contenidoUifCalculator from "./contenido/uif-calculator";
import costToCompany from "./calculadoras/cost-to-company";
import contenidoCostToCompany from "./contenido/cost-to-company";
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
    { definicion: uifCalculator, contenido: contenidoUifCalculator, cliente: () => import("./calculadoras/uif-calculator.cliente") },
    { definicion: costToCompany, contenido: contenidoCostToCompany, cliente: () => import("./calculadoras/cost-to-company.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "za.vat" } }] },
  novedades,
  detectores,
});
