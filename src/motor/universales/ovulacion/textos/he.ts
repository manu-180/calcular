import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosHe: TextosUi<UiOvulacion> = {
  slug: "ovulation",
  ui: () => ({
    fum: "היום הראשון של הווסת האחרונה",
    fumAyuda: "היום הראשון של הדימום, לא האחרון.",
    ciclo: "אורך המחזור (ימים)",
    cicloAyuda: "מהיום הראשון של וסת אחת עד היום שלפני הווסת הבאה. אם האורך משתנה, הזינו ממוצע.",
    ovulacion: "ביוץ משוער",
    fertilDesde: "תחילת הימים הפוריים",
    fertilHasta: "סוף הימים הפוריים",
    proxima: "הווסת הבאה",
    tabla: "המחזורים הבאים",
    colRegla: "וסת",
    colDesde: "תחילת הפוריות",
    colHasta: "סוף הפוריות",
    colOvulacion: "ביוץ",
    errorCiclo: "אורך המחזור צריך להיות בין 21 ל-45 ימים.",
    aviso: "זו הערכה למחזור סדיר. היא לא אמצעי מניעה ולא מחליפה ייעוץ של איש מקצוע בתחום הבריאות.",
  }),
};
