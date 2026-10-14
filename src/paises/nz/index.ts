import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import accLevyCalculator from "./calculadoras/acc-levy-calculator";
import contenidoAccLevyCalculator from "./contenido/acc-levy-calculator";
import gstCalculator from "./calculadoras/gst-calculator";
import contenidoGstCalculator from "./contenido/gst-calculator";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import studentLoanRepayment from "./calculadoras/student-loan-repayment";
import contenidoStudentLoanRepayment from "./contenido/student-loan-repayment";
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
    { definicion: accLevyCalculator, contenido: contenidoAccLevyCalculator, cliente: () => import("./calculadoras/acc-levy-calculator.cliente") },
    { definicion: gstCalculator, contenido: contenidoGstCalculator, cliente: () => import("./calculadoras/gst-calculator.cliente") },
    { definicion: incomeTaxCalculator, contenido: contenidoIncomeTaxCalculator, cliente: () => import("./calculadoras/income-tax-calculator.cliente") },
    { definicion: studentLoanRepayment, contenido: contenidoStudentLoanRepayment, cliente: () => import("./calculadoras/student-loan-repayment.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
