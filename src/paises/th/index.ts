import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTax from "./calculadoras/income-tax";
import contenidoIncomeTax from "./contenido/income-tax";
import socialSecurity from "./calculadoras/social-security";
import contenidoSocialSecurity from "./contenido/social-security";
import withholdingTax from "./calculadoras/withholding-tax";
import contenidoWithholdingTax from "./contenido/withholding-tax";
import inheritanceTax from "./calculadoras/inheritance-tax";
import contenidoInheritanceTax from "./contenido/inheritance-tax";
import depositInterest from "./calculadoras/deposit-interest";
import contenidoDepositInterest from "./contenido/deposit-interest";
import severancePay from "./calculadoras/severance-pay";
import contenidoSeverancePay from "./contenido/severance-pay";
import noticePay from "./calculadoras/notice-pay";
import contenidoNoticePay from "./contenido/notice-pay";
import overtimePay from "./calculadoras/overtime-pay";
import contenidoOvertimePay from "./contenido/overtime-pay";
import corporateIncomeTax from "./calculadoras/corporate-income-tax";
import contenidoCorporateIncomeTax from "./contenido/corporate-income-tax";
import employerCost from "./calculadoras/employer-cost";
import contenidoEmployerCost from "./contenido/employer-cost";
import annualLeave from "./calculadoras/annual-leave";
import contenidoAnnualLeave from "./contenido/annual-leave";
import stampDuty from "./calculadoras/stamp-duty";
import contenidoStampDuty from "./contenido/stamp-duty";
import taxDeduction from "./calculadoras/tax-deduction";
import contenidoTaxDeduction from "./contenido/tax-deduction";
import taxSurcharge from "./calculadoras/tax-surcharge";
import contenidoTaxSurcharge from "./contenido/tax-surcharge";
import bonusTax from "./calculadoras/bonus-tax";
import contenidoBonusTax from "./contenido/bonus-tax";
import freelanceTax from "./calculadoras/freelance-tax";
import contenidoFreelanceTax from "./contenido/freelance-tax";
import netToGross from "./calculadoras/net-to-gross";
import contenidoNetToGross from "./contenido/net-to-gross";
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
    { definicion: incomeTax, contenido: contenidoIncomeTax, cliente: () => import("./calculadoras/income-tax.cliente") },
    { definicion: socialSecurity, contenido: contenidoSocialSecurity, cliente: () => import("./calculadoras/social-security.cliente") },
    { definicion: withholdingTax, contenido: contenidoWithholdingTax, cliente: () => import("./calculadoras/withholding-tax.cliente") },
    { definicion: inheritanceTax, contenido: contenidoInheritanceTax, cliente: () => import("./calculadoras/inheritance-tax.cliente") },
    { definicion: depositInterest, contenido: contenidoDepositInterest, cliente: () => import("./calculadoras/deposit-interest.cliente") },
    { definicion: severancePay, contenido: contenidoSeverancePay, cliente: () => import("./calculadoras/severance-pay.cliente") },
    { definicion: noticePay, contenido: contenidoNoticePay, cliente: () => import("./calculadoras/notice-pay.cliente") },
    { definicion: overtimePay, contenido: contenidoOvertimePay, cliente: () => import("./calculadoras/overtime-pay.cliente") },
    { definicion: corporateIncomeTax, contenido: contenidoCorporateIncomeTax, cliente: () => import("./calculadoras/corporate-income-tax.cliente") },
    { definicion: employerCost, contenido: contenidoEmployerCost, cliente: () => import("./calculadoras/employer-cost.cliente") },
    { definicion: annualLeave, contenido: contenidoAnnualLeave, cliente: () => import("./calculadoras/annual-leave.cliente") },
    { definicion: stampDuty, contenido: contenidoStampDuty, cliente: () => import("./calculadoras/stamp-duty.cliente") },
    { definicion: taxDeduction, contenido: contenidoTaxDeduction, cliente: () => import("./calculadoras/tax-deduction.cliente") },
    { definicion: taxSurcharge, contenido: contenidoTaxSurcharge, cliente: () => import("./calculadoras/tax-surcharge.cliente") },
    { definicion: bonusTax, contenido: contenidoBonusTax, cliente: () => import("./calculadoras/bonus-tax.cliente") },
    { definicion: freelanceTax, contenido: contenidoFreelanceTax, cliente: () => import("./calculadoras/freelance-tax.cliente") },
    { definicion: netToGross, contenido: contenidoNetToGross, cliente: () => import("./calculadoras/net-to-gross.cliente") },
  ],
  universales: { todas: true, ajustes: [{ id: "iva", datos: { tasa: "th.vat" } }] },
  novedades,
  detectores,
});
