import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTaxCalculator from "./calculadoras/income-tax-calculator";
import contenidoIncomeTaxCalculator from "./contenido/income-tax-calculator";
import nationalInsuranceCalculator from "./calculadoras/national-insurance-calculator";
import contenidoNationalInsuranceCalculator from "./contenido/national-insurance-calculator";
import studentLoanRepayment from "./calculadoras/student-loan-repayment";
import contenidoStudentLoanRepayment from "./contenido/student-loan-repayment";
import employerNiCalculator from "./calculadoras/employer-ni-calculator";
import contenidoEmployerNiCalculator from "./contenido/employer-ni-calculator";
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
    { definicion: nationalInsuranceCalculator, contenido: contenidoNationalInsuranceCalculator, cliente: () => import("./calculadoras/national-insurance-calculator.cliente") },
    { definicion: studentLoanRepayment, contenido: contenidoStudentLoanRepayment, cliente: () => import("./calculadoras/student-loan-repayment.cliente") },
    { definicion: employerNiCalculator, contenido: contenidoEmployerNiCalculator, cliente: () => import("./calculadoras/employer-ni-calculator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
