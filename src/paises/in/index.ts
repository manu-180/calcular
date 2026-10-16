import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import inHandSalaryCalculator from "./calculadoras/in-hand-salary-calculator";
import contenidoInHandSalaryCalculator from "./contenido/in-hand-salary-calculator";
import hraCalculator from "./calculadoras/hra-calculator";
import contenidoHraCalculator from "./contenido/hra-calculator";
import gratuityCalculator from "./calculadoras/gratuity-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import epfCalculator from "./calculadoras/epf-calculator";
import contenidoEpfCalculator from "./contenido/epf-calculator";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import emiCalculator from "./calculadoras/emi-calculator";
import contenidoEmiCalculator from "./contenido/emi-calculator";
import sipCalculator from "./calculadoras/sip-calculator";
import contenidoSipCalculator from "./contenido/sip-calculator";
import fdCalculator from "./calculadoras/fd-calculator";
import contenidoFdCalculator from "./contenido/fd-calculator";
import capitalGainsTaxCalculator from "./calculadoras/capital-gains-tax-calculator";
import contenidoCapitalGainsTaxCalculator from "./contenido/capital-gains-tax-calculator";
import advanceTaxCalculator from "./calculadoras/advance-tax-calculator";
import contenidoAdvanceTaxCalculator from "./contenido/advance-tax-calculator";
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
    { definicion: inHandSalaryCalculator, contenido: contenidoInHandSalaryCalculator, cliente: () => import("./calculadoras/in-hand-salary-calculator.cliente") },
    { definicion: hraCalculator, contenido: contenidoHraCalculator, cliente: () => import("./calculadoras/hra-calculator.cliente") },
    { definicion: gratuityCalculator, contenido: contenidoGratuityCalculator, cliente: () => import("./calculadoras/gratuity-calculator.cliente") },
    { definicion: epfCalculator, contenido: contenidoEpfCalculator, cliente: () => import("./calculadoras/epf-calculator.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: emiCalculator, contenido: contenidoEmiCalculator, cliente: () => import("./calculadoras/emi-calculator.cliente") },
    { definicion: sipCalculator, contenido: contenidoSipCalculator, cliente: () => import("./calculadoras/sip-calculator.cliente") },
    { definicion: fdCalculator, contenido: contenidoFdCalculator, cliente: () => import("./calculadoras/fd-calculator.cliente") },
    { definicion: capitalGainsTaxCalculator, contenido: contenidoCapitalGainsTaxCalculator, cliente: () => import("./calculadoras/capital-gains-tax-calculator.cliente") },
    { definicion: advanceTaxCalculator, contenido: contenidoAdvanceTaxCalculator, cliente: () => import("./calculadoras/advance-tax-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
