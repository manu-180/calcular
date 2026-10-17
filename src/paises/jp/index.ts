import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import takeHomePay from "./calculadoras/take-home-pay";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import incomeTax from "./calculadoras/income-tax";
import contenidoIncomeTax from "./contenido/income-tax";
import residentTax from "./calculadoras/resident-tax";
import contenidoResidentTax from "./contenido/resident-tax";
import socialInsurance from "./calculadoras/social-insurance";
import contenidoSocialInsurance from "./contenido/social-insurance";
import employmentInsurance from "./calculadoras/employment-insurance";
import contenidoEmploymentInsurance from "./contenido/employment-insurance";
import consumptionTax from "./calculadoras/consumption-tax";
import contenidoConsumptionTax from "./contenido/consumption-tax";
import minimumWage from "./calculadoras/minimum-wage";
import contenidoMinimumWage from "./contenido/minimum-wage";
import overtimePay from "./calculadoras/overtime-pay";
import contenidoOvertimePay from "./contenido/overtime-pay";
import paidLeave from "./calculadoras/paid-leave";
import contenidoPaidLeave from "./contenido/paid-leave";
import yearEndAdjustment from "./calculadoras/year-end-adjustment";
import contenidoYearEndAdjustment from "./contenido/year-end-adjustment";
import furusatoNozei from "./calculadoras/furusato-nozei";
import contenidoFurusatoNozei from "./contenido/furusato-nozei";
import retirementAllowanceTax from "./calculadoras/retirement-allowance-tax";
import contenidoRetirementAllowanceTax from "./contenido/retirement-allowance-tax";
import giftTax from "./calculadoras/gift-tax";
import contenidoGiftTax from "./contenido/gift-tax";
import inheritanceTax from "./calculadoras/inheritance-tax";
import contenidoInheritanceTax from "./contenido/inheritance-tax";
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
    { definicion: residentTax, contenido: contenidoResidentTax, cliente: () => import("./calculadoras/resident-tax.cliente") },
    { definicion: socialInsurance, contenido: contenidoSocialInsurance, cliente: () => import("./calculadoras/social-insurance.cliente") },
    { definicion: employmentInsurance, contenido: contenidoEmploymentInsurance, cliente: () => import("./calculadoras/employment-insurance.cliente") },
    { definicion: consumptionTax, contenido: contenidoConsumptionTax, cliente: () => import("./calculadoras/consumption-tax.cliente") },
    { definicion: minimumWage, contenido: contenidoMinimumWage, cliente: () => import("./calculadoras/minimum-wage.cliente") },
    { definicion: overtimePay, contenido: contenidoOvertimePay, cliente: () => import("./calculadoras/overtime-pay.cliente") },
    { definicion: paidLeave, contenido: contenidoPaidLeave, cliente: () => import("./calculadoras/paid-leave.cliente") },
    { definicion: yearEndAdjustment, contenido: contenidoYearEndAdjustment, cliente: () => import("./calculadoras/year-end-adjustment.cliente") },
    { definicion: furusatoNozei, contenido: contenidoFurusatoNozei, cliente: () => import("./calculadoras/furusato-nozei.cliente") },
    { definicion: retirementAllowanceTax, contenido: contenidoRetirementAllowanceTax, cliente: () => import("./calculadoras/retirement-allowance-tax.cliente") },
    { definicion: giftTax, contenido: contenidoGiftTax, cliente: () => import("./calculadoras/gift-tax.cliente") },
    { definicion: inheritanceTax, contenido: contenidoInheritanceTax, cliente: () => import("./calculadoras/inheritance-tax.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
