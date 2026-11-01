import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosHe: TextosUi<UiHorasTrabajadas> = {
  slug: "time-card",
  ui: () => ({
    dias: ["יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת", "יום ראשון"],
    entrada: (dia) => `${dia}: שעת כניסה`,
    salida: (dia) => `${dia}: שעת יציאה`,
    horarioAyuda: "השאירו ריקים את הימים שלא עבדתם. משמרת שנגמרת אחרי חצות נספרת כאותה משמרת.",
    pausa: "הפסקה לא בתשלום בכל יום (דקות)",
    pausaAyuda: "זמן ארוחה או מנוחה שלא משולם. הוא יורד מכל יום שעבדתם.",
    pagoHora: "שכר שעתי",
    umbral: "שעות רגילות בשבוע (לא חובה)",
    umbralAyuda: "שעות מעל המספר הזה משולמות בתעריף של שעות נוספות. השאירו ריק אם אין שעות נוספות.",
    recargo: "תוספת לשעות נוספות (%)",
    recargoAyuda: "בכמה יותר משולמת כל שעה נוספת. 50% פירושו 150% מהשכר הרגיל.",
    horasTotales: "שעות עבודה",
    horasReloj: "בשעות ודקות",
    horasNormales: "שעות רגילות",
    horasExtra: "שעות נוספות",
    pagoNormal: "שכר על שעות רגילות",
    pagoExtra: "שכר על שעות נוספות",
    pagoTotal: "סך השכר לשבוע",
    tabla: "יום אחרי יום",
    colDia: "יום",
    colEntrada: "כניסה",
    colSalida: "יציאה",
    colHoras: "שעות",
    errorFaltaSalida: (dia) => `${dia}: חסרה שעת יציאה.`,
    errorFaltaEntrada: (dia) => `${dia}: חסרה שעת כניסה.`,
    errorIguales: (dia) => `${dia}: שעת הכניסה ושעת היציאה זהות.`,
    errorPausa: (dia) => `${dia}: ההפסקה ארוכה מהמשמרת או שווה לה.`,
    errorSinDias: "מלאו שעת כניסה ושעת יציאה לפחות ליום אחד.",
    observacionNoche: "חלק מהמשמרות נגמרות למחרת: הן נספרות במלואן ביום שבו התחילו.",
    observacionGenerico:
      "זה חישוב כללי. מספר השעות המרבי, הכללים לשעות נוספות והתשלום על עבודה בלילה או בחג תלויים בחוק ובחוזה העבודה שלכם.",
  }),
};
