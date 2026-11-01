import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosHe: TextosUi<UiImc> = {
  slug: "bmi",
  ui: () => ({
    peso: (u) => `משקל (${u})`,
    altura: (u) => `גובה (${u})`,
    pies: "גובה: רגל (ft)",
    pulgadas: "גובה: אינץ' (in)",
    imc: "מדד מסת גוף (BMI)",
    categoria: "קטגוריה (לפי ארגון הבריאות העולמי)",
    pesoMin: (u) => `משקל תקין מינימלי (${u})`,
    pesoMax: (u) => `משקל תקין מקסימלי (${u})`,
    rangoAyuda: "טווח המשקל שנותן BMI תקין בגובה הזה.",
    bajo: "תת משקל",
    normal: "משקל תקין",
    sobrepeso: "עודף משקל",
    obesidad1: "השמנה דרגה 1",
    obesidad2: "השמנה דרגה 2",
    obesidad3: "השמנה דרגה 3",
    errorPeso: "המשקל צריך להיות גדול מ-0.",
    errorAltura: "הגובה צריך להיות גדול מ-0.",
    aviso:
      "BMI הוא מדד כללי למבוגרים: הוא לא מבחין בין שריר לשומן, ובהריון או אצל ילדים משתמשים בו אחרת. המחשבון לא מחליף ייעוץ של איש מקצוע בתחום הבריאות.",
  }),
};
