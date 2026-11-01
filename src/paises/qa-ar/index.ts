import { definirEdicion } from "@/motor/registro";
import qa from "../qa";
import contenidoAnnualLeave from "./contenido/annual-leave";
import contenidoCorporateTaxCalculator from "./contenido/corporate-tax-calculator";
import contenidoDomesticWorkerGratuity from "./contenido/domestic-worker-gratuity";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import contenidoExciseTaxCalculator from "./contenido/excise-tax-calculator";
import contenidoFinalSettlement from "./contenido/final-settlement";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import contenidoGrsiaContributionCalculator from "./contenido/grsia-contribution-calculator";
import contenidoMaternityLeavePay from "./contenido/maternity-leave-pay";
import contenidoMinimumWage from "./contenido/minimum-wage";
import contenidoNoticePeriod from "./contenido/notice-period";
import contenidoOvertimeCalculator from "./contenido/overtime-calculator";
import contenidoPensionCalculator from "./contenido/pension-calculator";
import contenidoPropertyRegistrationFee from "./contenido/property-registration-fee";
import contenidoQarUsdConverter from "./contenido/qar-usd-converter";
import contenidoRamadanWorkingHours from "./contenido/ramadan-working-hours";
import contenidoSickLeavePay from "./contenido/sick-leave-pay";
import contenidoSugarTaxCalculator from "./contenido/sugar-tax-calculator";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import contenidoWithholdingTaxCalculator from "./contenido/withholding-tax-calculator";
import { mercado } from "./mercado";
import textosAnnualLeave from "./textos/annual-leave";
import textosCorporateTaxCalculator from "./textos/corporate-tax-calculator";
import textosDomesticWorkerGratuity from "./textos/domestic-worker-gratuity";
import textosEmployerCostCalculator from "./textos/employer-cost-calculator";
import textosExciseTaxCalculator from "./textos/excise-tax-calculator";
import textosFinalSettlement from "./textos/final-settlement";
import textosGratuityCalculator from "./textos/gratuity-calculator";
import textosGrsiaContributionCalculator from "./textos/grsia-contribution-calculator";
import textosMaternityLeavePay from "./textos/maternity-leave-pay";
import textosMinimumWage from "./textos/minimum-wage";
import textosNoticePeriod from "./textos/notice-period";
import textosOvertimeCalculator from "./textos/overtime-calculator";
import textosPensionCalculator from "./textos/pension-calculator";
import textosPropertyRegistrationFee from "./textos/property-registration-fee";
import textosQarUsdConverter from "./textos/qar-usd-converter";
import textosRamadanWorkingHours from "./textos/ramadan-working-hours";
import textosSickLeavePay from "./textos/sick-leave-pay";
import textosSugarTaxCalculator from "./textos/sugar-tax-calculator";
import textosTakeHomePay from "./textos/take-home-pay";
import textosWithholdingTaxCalculator from "./textos/withholding-tax-calculator";

export default definirEdicion(qa, {
  mercado,
  traducciones: [
    { textos: textosAnnualLeave, contenido: contenidoAnnualLeave },
    { textos: textosCorporateTaxCalculator, contenido: contenidoCorporateTaxCalculator },
    { textos: textosDomesticWorkerGratuity, contenido: contenidoDomesticWorkerGratuity },
    { textos: textosEmployerCostCalculator, contenido: contenidoEmployerCostCalculator },
    { textos: textosExciseTaxCalculator, contenido: contenidoExciseTaxCalculator },
    { textos: textosFinalSettlement, contenido: contenidoFinalSettlement },
    { textos: textosGratuityCalculator, contenido: contenidoGratuityCalculator },
    { textos: textosGrsiaContributionCalculator, contenido: contenidoGrsiaContributionCalculator },
    { textos: textosMaternityLeavePay, contenido: contenidoMaternityLeavePay },
    { textos: textosMinimumWage, contenido: contenidoMinimumWage },
    { textos: textosNoticePeriod, contenido: contenidoNoticePeriod },
    { textos: textosOvertimeCalculator, contenido: contenidoOvertimeCalculator },
    { textos: textosPensionCalculator, contenido: contenidoPensionCalculator },
    { textos: textosPropertyRegistrationFee, contenido: contenidoPropertyRegistrationFee },
    { textos: textosQarUsdConverter, contenido: contenidoQarUsdConverter },
    { textos: textosRamadanWorkingHours, contenido: contenidoRamadanWorkingHours },
    { textos: textosSickLeavePay, contenido: contenidoSickLeavePay },
    { textos: textosSugarTaxCalculator, contenido: contenidoSugarTaxCalculator },
    { textos: textosTakeHomePay, contenido: contenidoTakeHomePay },
    { textos: textosWithholdingTaxCalculator, contenido: contenidoWithholdingTaxCalculator },
  ],
  universales: "todas",
  avisos: {
    "qa.labour-law-scope": {
      texto: "تتبع هذه الحاسبة قانون العمل القطري. ولا تشمل موظفي الجهات الحكومية والقوات المسلحة والشرطة والعاملين في البحر وشركات النفط والغاز الحكومية والعمال في الأعمال العارضة والمستخدمين في المنازل وعمال الزراعة والعاملين بنظام العمل الجزئي أو الحر، فلهم أحكامهم الخاصة.",
    },
  },
  datos: {
    "qa.excise": { nombre: "نسب الضريبة الانتقائية", etiquetas: { tobacco: "منتجات التبغ", energy: "مشروبات الطاقة", special: "السلع ذات الأغراض الخاصة" } },
  },
});
