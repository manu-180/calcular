import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import payeCalculator from "./calculadoras/paye-calculator";
import contenidoPayeCalculator from "./contenido/paye-calculator";
import netSalaryCalculator from "./calculadoras/net-salary-calculator";
import contenidoNetSalaryCalculator from "./contenido/net-salary-calculator";
import nssfCalculator from "./calculadoras/nssf-calculator";
import contenidoNssfCalculator from "./contenido/nssf-calculator";
import employerCostCalculator from "./calculadoras/employer-cost-calculator";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
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
    { definicion: payeCalculator, contenido: contenidoPayeCalculator, cliente: () => import("./calculadoras/paye-calculator.cliente") },
    { definicion: netSalaryCalculator, contenido: contenidoNetSalaryCalculator, cliente: () => import("./calculadoras/net-salary-calculator.cliente") },
    { definicion: nssfCalculator, contenido: contenidoNssfCalculator, cliente: () => import("./calculadoras/nssf-calculator.cliente") },
    { definicion: employerCostCalculator, contenido: contenidoEmployerCostCalculator, cliente: () => import("./calculadoras/employer-cost-calculator.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "ug.vat" } }] },
  novedades,
  detectores,
});
