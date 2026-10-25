import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosHe: TextosUi<UiFondoDeEmergencia> = {
  slug: "emergency-fund",
  ui: () => ({
    gastos: "הוצאות חיוניות בחודש",
    gastosAyuda: "מה שאי אפשר להפסיק לשלם: דיור, אוכל, חשבונות, תחבורה, בריאות והחזרי הלוואות.",
    meses: "כמה חודשי הוצאות לכסות",
    mesesAyuda: "3 עד 6 חודשים אם ההכנסה יציבה. יותר אם היא משתנה או אם יש במשק הבית הכנסה אחת בלבד.",
    actual: "כמה כבר חסכתם (לא חובה)",
    aporte: "כמה תוכלו לחסוך בחודש (לא חובה)",
    meta: "גודל קרן החירום המומלץ",
    falta: "כמה נשאר לחסוך",
    mesesParaLlegar: "חודשים עד שהקרן מלאה",
    cobertura: "כמה חודשים החיסכון מכסה היום",
    errorGastos: "הזינו את ההוצאות החיוניות של חודש אחד.",
    yaCubierto: "קרן החירום שלכם מלאה. מה שתחסכו מעכשיו יכול ללכת למטרות אחרות.",
    sinAporte: "הזינו כמה תוכלו לחסוך בכל חודש, ונראה לכם כמה זמן זה ייקח.",
    observacionDonde: "כדאי להחזיק את הכסף בחשבון נפרד, שאפשר למשוך ממנו באותו יום ושלא מאבד מערכו, כמו פיקדון נזיל או קרן כספית.",
  }),
};
