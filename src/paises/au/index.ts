import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import payCalculator from "./calculadoras/pay-calculator";
import contenidoPayCalculator from "./contenido/pay-calculator";
import medicareLevyCalculator from "./calculadoras/medicare-levy-calculator";
import contenidoMedicareLevyCalculator from "./contenido/medicare-levy-calculator";
import superGuaranteeCalculator from "./calculadoras/super-guarantee-calculator";
import contenidoSuperGuaranteeCalculator from "./contenido/super-guarantee-calculator";
import salarySacrificeCalculator from "./calculadoras/salary-sacrifice-calculator";
import contenidoSalarySacrificeCalculator from "./contenido/salary-sacrifice-calculator";
import hecsHelpRepaymentCalculator from "./calculadoras/hecs-help-repayment-calculator";
import contenidoHecsHelpRepaymentCalculator from "./contenido/hecs-help-repayment-calculator";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
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
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: payCalculator, contenido: contenidoPayCalculator, cliente: () => import("./calculadoras/pay-calculator.cliente") },
    { definicion: medicareLevyCalculator, contenido: contenidoMedicareLevyCalculator, cliente: () => import("./calculadoras/medicare-levy-calculator.cliente") },
    { definicion: superGuaranteeCalculator, contenido: contenidoSuperGuaranteeCalculator, cliente: () => import("./calculadoras/super-guarantee-calculator.cliente") },
    { definicion: salarySacrificeCalculator, contenido: contenidoSalarySacrificeCalculator, cliente: () => import("./calculadoras/salary-sacrifice-calculator.cliente") },
    { definicion: hecsHelpRepaymentCalculator, contenido: contenidoHecsHelpRepaymentCalculator, cliente: () => import("./calculadoras/hecs-help-repayment-calculator.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
