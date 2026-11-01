import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosHe: TextosUi<UiCostoDeUnAuto> = {
  slug: "car-cost",
  ui: () => ({
    precio: "שווי הרכב",
    precioAyuda: "כמה שילמתם עליו, או כמה הוא שווה היום אם הוא אצלכם כבר כמה שנים.",
    depreciacion: "ירידת ערך בשנה (%)",
    depreciacionAyuda: "רכב חדש מאבד 15% עד 25% מערכו בשנה הראשונה. רכב יד שנייה מאבד פחות.",
    cuota: "החזר הלוואה חודשי (לא חובה)",
    cuotaAyuda: "רק כדי להראות כמה יוצא מהחשבון בכל חודש. הוא לא נכנס לעלות האמיתית.",
    seguro: "ביטוח בחודש",
    distanciaKm: "קילומטרים בחודש",
    distanciaMi: "מיילים בחודש",
    consumoL100: "צריכת דלק (ליטרים ל-100 ק\"מ)",
    consumoMpg: "צריכת דלק (מיילים לגלון)",
    precioLitro: "מחיר ליטר דלק",
    precioGalon: "מחיר גלון דלק",
    mantenimiento: "טיפולים ותחזוקה בחודש",
    mantenimientoAyuda: "טיפולים, צמיגים, תיקונים ושטיפות, בממוצע לחודש.",
    estacionamiento: "חניה בחודש (לא חובה)",
    otros: "אגרות, כבישי אגרה והוצאות אחרות בחודש (לא חובה)",
    otrosAyuda: "רישוי, טסט, כבישי אגרה ודוחות, בממוצע לחודש.",
    costoMensual: "עלות אמיתית בחודש",
    costoAnual: "עלות אמיתית בשנה",
    porKm: "עלות לקילומטר",
    porMilla: "עלות למייל",
    combustible: "דלק בחודש",
    depreciacionMensual: "ירידת ערך בחודש",
    gastoBolsillo: "כמה יוצא מהחשבון בכל חודש",
    errorConsumo: "הזינו את צריכת הדלק של הרכב כדי לחשב את עלות הדלק.",
    observacionCuota:
      "החזר ההלוואה לא נכנס לעלות האמיתית, כי חלק ממנו משלם על הרכב עצמו, וזה כבר נספר בירידת הערך. הריבית על ההלוואה היא עלות נוספת מעבר לזה.",
  }),
};
