import { DIAS_HE, pluralHe, prefijoHe, SEMANAS_HE } from "../../../i18n/hebreo";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosHe: TextosUi<UiFechaDeParto> = {
  slug: "due-date",
  ui: () => ({
    metodo: "איזה תאריך ידוע לכם?",
    fum: "היום הראשון של הווסת האחרונה",
    concepcion: "תאריך ההתעברות",
    fecha: "תאריך",
    fechaAyuda: "אם בחרתם בווסת האחרונה, הזינו את היום הראשון של הדימום.",
    ciclo: "אורך המחזור (ימים)",
    cicloAyuda: "משמש רק לחישוב לפי הווסת האחרונה. אם אורך המחזור לא ידוע, השאירו 28.",
    fpp: "תאריך לידה משוער",
    edadGestacional: "שבוע ההריון היום",
    trimestre: "שליש",
    faltan: "ימים שנותרו",
    fechaConcepcion: "התעברות משוערת",
    semanasYDias: (s, d) => `${pluralHe(s, SEMANAS_HE)}${d ? ` ${prefijoHe("ו", pluralHe(d, DIAS_HE))}` : ""}`,
    trimestres: ["שליש ראשון", "שליש שני", "שליש שלישי"],
    errorFutura: "התאריך לא יכול להיות אחרי היום.",
    errorCiclo: "אורך המחזור צריך להיות בין 20 ל-45 ימים.",
    notaPasada: "מאז התאריך הזה עברו יותר מ-42 שבועות, ולכן שבוע ההריון לא מוצג.",
    aviso: "זו הערכה: מעט תינוקות נולדים בדיוק בתאריך המשוער. אולטרסאונד ומעקב הריון אצל איש מקצוע בתחום הבריאות נותנים את התאריך המדויק ביותר.",
  }),
};
