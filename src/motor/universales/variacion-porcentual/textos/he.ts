import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosHe: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "ערך התחלתי",
    final: "ערך סופי",
    variacion: "שינוי באחוזים",
    diferencia: "הפרש",
    vuelta: "כדי לחזור לערך ההתחלתי",
    vueltaAyuda: "בכמה אחוזים הערך הסופי צריך להשתנות כדי לחזור לערך ההתחלתי.",
    errorInicialCero: "הערך ההתחלתי לא יכול להיות 0: אין שינוי באחוזים מאפס.",
    subio: (p) => `הערך עלה ב-${p}%.`,
    bajo: (p) => `הערך ירד ב-${p}%.`,
    igual: "אין שינוי: שני הערכים זהים.",
  }),
};
