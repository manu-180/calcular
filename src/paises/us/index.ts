import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bonusTax from "./calculadoras/bonus-tax";
import employerPayrollTax from "./calculadoras/employer-payroll-tax";
import federalIncomeTax from "./calculadoras/federal-income-tax";
import ficaTax from "./calculadoras/fica-tax";
import minimumWage from "./calculadoras/minimum-wage";
import noTaxOnOvertime from "./calculadoras/no-tax-on-overtime";
import noTaxOnTips from "./calculadoras/no-tax-on-tips";
import overtime from "./calculadoras/overtime";
import selfEmploymentTax from "./calculadoras/self-employment-tax";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoBonusTax from "./contenido/bonus-tax";
import contenidoEmployerPayrollTax from "./contenido/employer-payroll-tax";
import contenidoFederalIncomeTax from "./contenido/federal-income-tax";
import contenidoFicaTax from "./contenido/fica-tax";
import contenidoMinimumWage from "./contenido/minimum-wage";
import contenidoNoTaxOnOvertime from "./contenido/no-tax-on-overtime";
import contenidoNoTaxOnTips from "./contenido/no-tax-on-tips";
import contenidoOvertime from "./contenido/overtime";
import contenidoSelfEmploymentTax from "./contenido/self-employment-tax";
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
    { definicion: federalIncomeTax, contenido: contenidoFederalIncomeTax, cliente: () => import("./calculadoras/federal-income-tax.cliente") },
    { definicion: takeHomePay, contenido: contenidoTakeHomePay, cliente: () => import("./calculadoras/take-home-pay.cliente") },
    { definicion: ficaTax, contenido: contenidoFicaTax, cliente: () => import("./calculadoras/fica-tax.cliente") },
    { definicion: selfEmploymentTax, contenido: contenidoSelfEmploymentTax, cliente: () => import("./calculadoras/self-employment-tax.cliente") },
    { definicion: bonusTax, contenido: contenidoBonusTax, cliente: () => import("./calculadoras/bonus-tax.cliente") },
    { definicion: employerPayrollTax, contenido: contenidoEmployerPayrollTax, cliente: () => import("./calculadoras/employer-payroll-tax.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: overtime, contenido: contenidoOvertime, cliente: () => import("./calculadoras/overtime.cliente") },
    { definicion: noTaxOnOvertime, contenido: contenidoNoTaxOnOvertime, cliente: () => import("./calculadoras/no-tax-on-overtime.cliente") },
    { definicion: noTaxOnTips, contenido: contenidoNoTaxOnTips, cliente: () => import("./calculadoras/no-tax-on-tips.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
