import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosHe: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "תאריך התחלה",
    operacion: "פעולה",
    sumar: "הוספת ימים",
    restar: "הפחתת ימים",
    dias: "מספר ימים",
    tipo: "סוג הימים",
    corridos: "ימים קלנדריים",
    habiles: "ימי עבודה (שני עד שישי)",
    resultado: "התאריך שמתקבל",
    diaSemana: "היום בשבוע",
    diasCorridos: "סך הימים הקלנדריים",
    nombresDias: ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"],
    errorDias: "מספר הימים צריך להיות מספר שלם, עד 100 שנה.",
    notaHabiles: "ימי עבודה מדלגים על שבת וראשון, אבל לא על חגים. בישראל שבוע העבודה הוא בדרך כלל מראשון עד חמישי. אם יש חג באמצע, הוסיפו אותו בנפרד.",
  }),
};
