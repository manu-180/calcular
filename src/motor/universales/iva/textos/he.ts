import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosHe: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "מה תרצו לעשות?",
    agregar: 'להוסיף מע"מ למחיר לפני מע"מ',
    quitar: 'להוריד מע"מ ממחיר שכולל אותו',
    monto: "מחיר",
    montoAyuda: 'לפני מע"מ אם מוסיפים אותו, וכולל מע"מ אם מורידים אותו.',
    otraTasa: 'שיעור מע"מ אחר (%)',
    otraTasaAyuda: "לא חובה. אם המוצר או השירות בשיעור מופחת, הזינו אותו כאן. אחרת ייעשה שימוש בשיעור הרגיל.",
    neto: 'מחיר לפני מע"מ',
    impuesto: 'מע"מ',
    total: 'מחיר כולל מע"מ',
    tasaUsada: "השיעור שחושב",
    errorTasa: 'שיעור המע"מ לא תקין.',
  }),
};
