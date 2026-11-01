import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosHe: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "הספק המכשיר (וואט)",
    potenciaAyuda: "ההספק מופיע על התווית או בהוראות השימוש, בוואט (W). אם כתוב kW, הכפילו ב-1000.",
    cantidad: "מספר מכשירים זהים",
    horas: "שעות שימוש ביום",
    dias: "ימי שימוש בחודש",
    precio: 'מחיר לקוט"ש',
    precioAyuda: 'המחיר מופיע בחשבון החשמל: התעריף לקוט"ש, כולל מע"מ אם רוצים את העלות המלאה.',
    kwhDia: 'צריכה ביום (קוט"ש)',
    kwhMes: 'צריכה בחודש (קוט"ש)',
    kwhAnio: 'צריכה בשנה (קוט"ש)',
    costoDia: "עלות ליום",
    costoMes: "עלות לחודש",
    costoAnio: "עלות לשנה",
    errorHoras: "ביום יש 24 שעות: השימוש צריך להיות בין 0 ל-24.",
  }),
};
