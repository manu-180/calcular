import type { TextosUi } from "../../tipos";
import { duracionHe } from "../../dias-entre-fechas/textos/he";
import type { UiEdad } from "../definicion";

export const textosHe: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "תאריך לידה",
    referencia: "הגיל בתאריך",
    referenciaAyuda: "כברירת מחדל היום. שנו כדי לראות את הגיל בתאריך אחר.",
    edad: "גיל",
    anios: "גיל בשנים",
    totalMeses: "בחודשים",
    totalSemanas: "בשבועות",
    totalDias: "בימים",
    proximo: "יום ההולדת הבא",
    faltan: "ימים שנשארו",
    cumplira: "הגיל ביום ההולדת",
    duracion: duracionHe,
    errorFutura: "תאריך הלידה לא יכול להיות אחרי התאריך שבודקים.",
    cumpleHoy: (anios) => `היום יום ההולדת: הגיל הוא ${anios}.`,
    nota29: "למי שנולד ב-29 בפברואר, יום ההולדת נספר ב-28 בפברואר בשנים שאינן מעוברות.",
  }),
};
