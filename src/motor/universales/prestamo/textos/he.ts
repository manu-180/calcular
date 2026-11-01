import { MESES_HE, pluralHeTexto } from "../../../i18n/hebreo";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosHe: TextosUi<UiPrestamo> = {
  slug: "loan",
  ui: () => ({
    monto: "סכום ההלוואה",
    tasa: "ריבית שנתית (%)",
    tasaAyuda: "הריבית השנתית הנקובה שמופיעה בהצעה. עמלות לא כלולות בה.",
    meses: "תקופת ההלוואה בחודשים",
    extra: "תשלום נוסף בכל חודש (לא חובה)",
    extraAyuda: "הסכום שתוסיפו בכל חודש כדי לסיים מוקדם יותר. כולו הולך להקטנת הקרן.",
    cuota: "החזר חודשי",
    intereses: "סך הריבית",
    total: "סך כל התשלומים",
    mesesReales: "מספר החודשים עם התשלום הנוסף",
    ahorro: "החיסכון בריבית",
    tabla: "לוח סילוקין",
    colMes: "חודש",
    colPago: "תשלום",
    colInteres: "ריבית",
    colCapital: "קרן",
    colSaldo: "יתרה",
    errorMonto: "הזינו סכום גדול מאפס.",
    observacionCostos: "ההחזר לא כולל ביטוחים, עמלות או מסים שהמלווה עשוי להוסיף. לפני החתימה בקשו את העלות הכוללת.",
    observacionExtra: (meses, ahorro) => `עם התשלום הנוסף תסיימו את ההלוואה תוך ${pluralHeTexto(meses, MESES_HE)} ותחסכו ${ahorro} בריבית.`,
  }),
};
