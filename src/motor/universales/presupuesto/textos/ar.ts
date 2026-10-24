import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosAr: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "صافي الدخل الشهري",
    ingresoAyuda: "ما يصل إلى حسابك كل شهر بعد الضرائب والاستقطاعات.",
    pctNecesidades: "الاحتياجات (%)",
    pctNecesidadesAyuda: "السكن والطعام الأساسي والكهرباء والماء والمواصلات والصحة والحد الأدنى لأقساط الديون.",
    pctGustos: "الرغبات (%)",
    pctGustosAyuda: "الأكل خارج البيت والمشتريات غير الضرورية والاشتراكات والسفر.",
    pctAhorro: "الادخار (%)",
    pctAhorroAyuda: "صندوق الطوارئ والأهداف والتقاعد والسداد الإضافي للديون.",
    necesidades: "للاحتياجات",
    gustos: "للرغبات",
    ahorro: "للادخار",
    ahorroAnual: "الادخار في سنة",
    errorIngreso: "أدخل دخلك الشهري.",
    errorSuma: (suma) => `مجموع النسب الثلاث ${suma}%، ويجب أن يكون 100%.`,
    observacionAhorroBajo: "ادخار أقل من 10% لا يترك مجالًا كبيرًا للمفاجآت. إن استطعت، فقلّل بعض الرغبات.",
  }),
};
