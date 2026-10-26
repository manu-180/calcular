import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosHe: TextosUi<UiRendimientoInversion> = {
  slug: "roi",
  ui: () => ({
    inicial: "סכום ההשקעה",
    final: "שווי סופי",
    finalAyuda: "כמה ההשקעה שווה היום, או כמה קיבלתם כשמכרתם אותה.",
    cobrado: "הכנסות שקיבלתם בדרך (לא חובה)",
    cobradoAyuda: "דיבידנדים, ריבית או שכר דירה שמשכתם ולא השקעתם מחדש.",
    anios: "שנות החזקה",
    aniosAyuda: "אפשר להזין שבר לחלק משנה, למשל 1.5 לשנה וחצי.",
    ganancia: "רווח",
    roi: "תשואה כוללת (ROI)",
    cagr: "תשואה שנתית ממוצעת (CAGR)",
    cagrAyuda: "התשואה השנתית שנותנת את אותה תוצאה כשהיא מצטברת שנה אחרי שנה.",
    errorInicial: "הזינו כמה השקעתם בהתחלה.",
    observacionCorto: "בתקופה של פחות משנה, התשואה השנתית מותחת תוצאה קצרה כאילו חזרה על עצמה כל השנה. כדאי לקרוא אותה בזהירות.",
    observacionInflacion: "כדי לדעת אם כוח הקנייה שלכם גדל, השוו את התשואה השנתית לאינפלציה באותה תקופה.",
  }),
};
