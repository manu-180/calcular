import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosHe: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "קרן",
    tasa: "ריבית שנתית (%)",
    tiempo: "תקופה",
    unidad: "התקופה נמדדת ב",
    dias: "ימים",
    meses: "חודשים",
    anios: "שנים",
    base: "ימים בשנה (לתקופה בימים)",
    baseAyuda: "יש בנקים שמחשבים שנה של 360 ימים. אם אתם לא בטוחים, השאירו 365.",
    base365: "365 ימים",
    base360: "360 ימים (שנה בנקאית)",
    interes: "ריבית",
    montoFinal: "קרן ועוד ריבית",
    tasaPeriodo: "הריבית לתקופה",
    errorCapital: "הזינו קרן גדולה מאפס.",
  }),
};
