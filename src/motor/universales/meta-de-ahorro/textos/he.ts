import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosHe: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "כמה אתם רוצים לחסוך?",
    actual: "כמה כבר חסכתם (לא חובה)",
    meses: "בכמה חודשים",
    rendimiento: "תשואה שנתית על החיסכון (%, לא חובה)",
    rendimientoAyuda: "אם הכסף נמצא בחשבון או בהשקעה שנותנים ריבית. השאירו ריק אם הוא לא מניב כלום.",
    aporteMensual: "צריך לחסוך בכל חודש",
    aporteSemanal: "כלומר בכל שבוע",
    totalAportado: "סך ההפקדות שלכם",
    intereses: "הריבית שנצברה",
    errorMeta: "הזינו כמה אתם רוצים לחסוך.",
    yaLlegas: "מה שכבר חסכתם מגיע ליעד בזמן הזה גם בלי להוסיף.",
  }),
};
