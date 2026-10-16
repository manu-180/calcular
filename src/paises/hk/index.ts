import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salariesTaxCalculator from "./calculadoras/salaries-tax-calculator";
import contenidoSalariesTaxCalculator from "./contenido/salaries-tax-calculator";
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
    { definicion: salariesTaxCalculator, contenido: contenidoSalariesTaxCalculator, cliente: () => import("./calculadoras/salaries-tax-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
