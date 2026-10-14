import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bonusTax from "./calculadoras/bonus-tax";
import employerPayrollTax from "./calculadoras/employer-payroll-tax";
import federalIncomeTax from "./calculadoras/federal-income-tax";
import ficaTax from "./calculadoras/fica-tax";
import selfEmploymentTax from "./calculadoras/self-employment-tax";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoBonusTax from "./contenido/bonus-tax";
import contenidoEmployerPayrollTax from "./contenido/employer-payroll-tax";
import contenidoFederalIncomeTax from "./contenido/federal-income-tax";
import contenidoFicaTax from "./contenido/fica-tax";
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
  ],
  universales: "todas",
  novedades,
  detectores,
});
