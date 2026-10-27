import { definirEdicion } from "@/motor/registro";
import qa from "../qa";
import contenidoAnnualLeave from "./contenido/annual-leave";
import contenidoEmployerCostCalculator from "./contenido/employer-cost-calculator";
import contenidoGratuityCalculator from "./contenido/gratuity-calculator";
import contenidoGrsiaContributionCalculator from "./contenido/grsia-contribution-calculator";
import contenidoNoticePeriod from "./contenido/notice-period";
import contenidoTakeHomePay from "./contenido/take-home-pay";
import { mercado } from "./mercado";
import textosAnnualLeave from "./textos/annual-leave";
import textosEmployerCostCalculator from "./textos/employer-cost-calculator";
import textosGratuityCalculator from "./textos/gratuity-calculator";
import textosGrsiaContributionCalculator from "./textos/grsia-contribution-calculator";
import textosNoticePeriod from "./textos/notice-period";
import textosTakeHomePay from "./textos/take-home-pay";

export default definirEdicion(qa, {
  mercado,
  traducciones: [
    { textos: textosTakeHomePay, contenido: contenidoTakeHomePay },
    { textos: textosGrsiaContributionCalculator, contenido: contenidoGrsiaContributionCalculator },
    { textos: textosEmployerCostCalculator, contenido: contenidoEmployerCostCalculator },
    { textos: textosGratuityCalculator, contenido: contenidoGratuityCalculator },
    { textos: textosAnnualLeave, contenido: contenidoAnnualLeave },
    { textos: textosNoticePeriod, contenido: contenidoNoticePeriod },
  ],
  universales: "todas",
  avisos: {
    "qa.labour-law-scope": {
      texto: "تتبع هذه الحاسبة قانون العمل القطري. ولا تشمل موظفي الجهات الحكومية والقوات المسلحة والشرطة والعاملين في البحر وشركات النفط والغاز الحكومية والعمال في الأعمال العارضة والمستخدمين في المنازل وعمال الزراعة والعاملين بنظام العمل الجزئي أو الحر، فلهم أحكامهم الخاصة.",
    },
  },
});
