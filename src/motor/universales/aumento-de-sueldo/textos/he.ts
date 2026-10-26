import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosHe: TextosUi<UiAumentoDeSueldo> = {
  slug: "pay-raise",
  ui: () => ({
    sueldo: "שכר חודשי נוכחי",
    sueldoAyuda: "ברוטו או נטו, מה שנוח לכם. התוצאה תהיה באותו בסיס.",
    aumentoPorcentaje: "העלאה (%)",
    aumentoMonto: "העלאה בסכום (לא חובה)",
    aumentoMontoAyuda: "אם ההעלאה היא סכום קבוע, הזינו אותו כאן. הוא ישמש במקום האחוז.",
    inflacion: "אינפלציה בתקופה (%, לא חובה)",
    inflacionAyuda: "האינפלציה מאז ההעלאה הקודמת, כדי לראות אם השכר קונה יותר או פחות מבעבר.",
    sueldosAnio: "משכורות בשנה",
    sueldosAnioAyuda: "12 במשכורת חודשית. 13 או 14 אם מקבלים גם משכורת נוספת בכל שנה.",
    nuevo: "שכר חודשי חדש",
    diferenciaMensual: "הפרש בחודש",
    diferenciaAnual: "הפרש בשנה",
    porcentaje: "ההעלאה באחוזים",
    real: "העלאה ריאלית (אחרי אינפלציה)",
    realAyuda: "בכמה יותר השכר החדש קונה לעומת השכר הקודם.",
    errorSueldo: "הזינו את השכר הנוכחי.",
    errorSinAumento: "הזינו את ההעלאה באחוזים או בסכום.",
    observacionGana: (puntos) => `ההעלאה עקפה את האינפלציה: השכר קונה ${puntos}% יותר מבעבר.`,
    observacionPierde: (puntos) => `ההעלאה לא מכסה את האינפלציה: השכר קונה ${puntos}% פחות מבעבר.`,
    observacionIgual: "ההעלאה שווה לאינפלציה: השכר קונה בדיוק כמו קודם.",
  }),
};
