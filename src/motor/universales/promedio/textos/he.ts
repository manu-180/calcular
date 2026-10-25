import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosHe: TextosUi<UiPromedio> = {
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `ציון ${n}`,
    notaAyuda: "הזינו כל ציון או ערך עם המשקל שלו. שורות שלא צריך, השאירו ריקות.",
    peso: (n) => `משקל ${n}`,
    pesoAyuda: "אפשר אחוז, נקודות זכות או כמה פעמים הערך נספר. בלי משקלים, כל הערכים שווים.",
    ponderado: "ממוצע משוקלל",
    simple: "ממוצע פשוט",
    cantidad: "מספר הערכים",
    sumaPesos: "סך המשקלים",
    errorSinNotas: "הזינו לפחות ערך אחד.",
    errorFaltaPeso: "לערך הזה אין משקל. אם משתמשים במשקלים, צריך למלא אותם לכל הערכים.",
    errorFaltaNota: "למשקל הזה אין ערך. מלאו את הערך או מחקו את המשקל.",
    errorPesosCero: "סך המשקלים הוא 0: לפחות משקל אחד צריך להיות גדול מאפס.",
    sinPesos: "בלי משקלים, הממוצע המשוקלל שווה לממוצע הפשוט.",
  }),
};
