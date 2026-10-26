import { ANIOS_HE, MESES_HE, pluralHeTexto, prefijoHe } from "../../../i18n/hebreo";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosHe: TextosUi<UiTarjetaDeCredito> = {
  slug: "credit-card-payoff",
  ui: () => ({
    saldo: "יתרת החוב בכרטיס",
    tasa: "ריבית שנתית (%)",
    tasaAyuda: "הריבית על יתרת החוב בכרטיס. היא מופיעה בדף הפירוט החודשי.",
    modo: "איך תשלמו?",
    modoFijo: "סכום קבוע בכל חודש",
    modoMinimo: "התשלום המינימלי",
    pagoFijo: "תשלום חודשי קבוע",
    minimoPorcentaje: "תשלום מינימלי (% מהיתרה)",
    minimoPorcentajeAyuda: "מה שחברת האשראי דורשת בכל חודש. אם אתם לא בטוחים, 5% הוא ערך נפוץ.",
    minimoPiso: "תשלום מינימלי שלא יורד מתחת ל",
    meses: "מספר החודשים עד לסילוק",
    intereses: "הריבית שתשלמו",
    total: "סך כל התשלומים",
    primerPago: "התשלום המינימלי הראשון",
    tabla: "התוכנית חודש אחרי חודש",
    colMes: "חודש",
    colPago: "תשלום",
    colInteres: "ריבית",
    colCapital: "קרן",
    colSaldo: "יתרה",
    errorSaldo: "הזינו את יתרת החוב בכרטיס.",
    errorFaltaPago: "הזינו כמה תשלמו בכל חודש.",
    errorNoCubre: (interes) => `עם התשלום הזה היתרה אף פעם לא יורדת: הריבית של החודש הראשון לבדה היא ${interes}. הגדילו את התשלום.`,
    errorMuyLargo: "עם התשלום הזה הסילוק יימשך יותר מ-50 שנה. הגדילו את התשלום.",
    observacionAnios: (anios, meses) => {
      const a = pluralHeTexto(anios, ANIOS_HE);
      const m = meses === "0" ? "" : ` ${prefijoHe("ו", pluralHeTexto(meses, MESES_HE))}`;
      return `כלומר ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `אם תשלמו תמיד ${pago}, כמו התשלום המינימלי הראשון, תסיימו תוך ${pluralHeTexto(meses, MESES_HE)} ותחסכו ${ahorro} בריבית.`,
    observacionNoGastar: "החישוב מניח שלא תבצעו רכישות חדשות בכרטיס בזמן שאתם מסלקים את החוב.",
  }),
};
