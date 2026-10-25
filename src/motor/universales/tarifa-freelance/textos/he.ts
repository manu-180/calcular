import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosHe: TextosUi<UiTarifaFreelance> = {
  slug: "freelance-rate",
  ui: () => ({
    ingreso: "כמה תרצו שיישאר לכם נטו בשנה",
    ingresoAyuda: "אחרי מסים והוצאות. זו המשכורת שלכם כפרילנסרים.",
    gastos: "הוצאות העסק בשנה",
    gastosAyuda: "ציוד, תוכנות, אינטרנט, קורסים, רואה חשבון, ביטוח בריאות וחיסכון לפנסיה.",
    impuestos: "מסים ותשלומי חובה משוערים (%)",
    impuestosAyuda: "החלק שהולך למס מתוך מה שאתם מחייבים פחות ההוצאות. אם אינכם בטוחים, התייעצו עם רואה חשבון. 25% היא נקודת התחלה.",
    diasLibres: "ימי חופש בשנה",
    diasLibresAyuda: "חופשה, חגים וימי מחלה. אף אחד לא משלם עליהם, ולכן התעריף צריך לכסות אותם.",
    diasSemana: "ימי עבודה בשבוע",
    horasSemana: "שעות לחיוב בשבוע",
    horasSemanaAyuda: "רק השעות שאתם גובים עליהן כסף. חיפוש לקוחות, ניהול ולמידה לא נכללים. 20 עד 30 מתוך 40 זה מקובל.",
    tarifaHora: "תעריף לשעה",
    tarifaDia: "תעריף ליום עבודה",
    facturacionMensual: "כמה צריך לחייב בחודש",
    facturacionAnual: "כמה צריך לחייב בשנה",
    horasAnio: "שעות לחיוב בשנה",
    errorIngreso: "הזינו כמה תרצו להרוויח בשנה.",
    errorImpuestos: "שיעור המס צריך להיות מתחת ל-100%.",
    errorDias: "עם כל כך הרבה ימי חופש לא נשארים ימי עבודה בשנה.",
    errorHoras: "הזינו כמה שעות בשבוע תוכלו לחייב.",
    observacionFacturables: "אם תגבו פחות מזה, תרוויחו פחות ממה שתכננתם או שתעבדו יותר שעות.",
  }),
};
