import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosHe: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even",
  ui: () => ({
    fijos: "הוצאות קבועות בחודש",
    fijosAyuda: "מה שמשלמים גם בלי למכור כלום: שכירות, משכורות קבועות, חשבונות, תוכנות.",
    precio: "מחיר מכירה ליחידה",
    variable: "עלות משתנה ליחידה",
    variableAyuda: "כמה עולה לכם כל יחידה שנמכרת: חומרים, מלאי, עמלות, משלוח.",
    objetivo: "רווח רצוי בחודש (לא חובה)",
    objetivoAyuda: "כדי לראות כמה צריך למכור מעבר לכיסוי ההוצאות.",
    unidades: "יחידות עד נקודת האיזון",
    facturacion: "מחזור מכירות עד נקודת האיזון",
    contribucion: "תרומה ליחידה",
    contribucionAyuda: "מה שכל מכירה משאירה לכיסוי ההוצאות הקבועות: מחיר פחות עלות משתנה.",
    contribucionPct: "שיעור התרומה (%)",
    unidadesObjetivo: "יחידות לרווח הרצוי",
    facturacionObjetivo: "מחזור מכירות לרווח הרצוי",
    errorPrecio: "הזינו את מחיר המכירה של יחידה אחת.",
    errorMargen: "העלות המשתנה שווה למחיר או גבוהה ממנו: כל מכירה מפסידה ואף פעם לא מגיעים לאיזון. בדקו את המחיר או את העלות.",
    observacionRedondeo: "מספר היחידות מעוגל כלפי מעלה, כי אי אפשר למכור חלק מיחידה.",
  }),
};
