import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosHe: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "שכר",
    periodo: "השכר הוא לכל",
    hora: "שעה",
    dia: "יום",
    semana: "שבוע",
    quincena: "חצי חודש (24 בשנה)",
    mes: "חודש",
    anio: "שנה",
    horasSemana: "שעות עבודה בשבוע",
    diasSemana: "ימי עבודה בשבוע",
    semanasAnio: "שבועות בתשלום בשנה",
    semanasAnioAyuda: "52 אם יש לכם חופשה בתשלום. אם משלמים לכם רק על השבועות שאתם עובדים, הורידו את השאר.",
    porHora: "שכר שעתי",
    porDia: "שכר יומי",
    porSemana: "שכר שבועי",
    porQuincena: "שכר חצי חודשי",
    porMes: "שכר חודשי",
    porAnio: "שכר שנתי",
    errorHoras: "הזינו כמה שעות אתם עובדים בשבוע.",
    errorSemanas: "מספר השבועות בתשלום בשנה צריך להיות גדול מאפס.",
    observacionBruto: "זה אותו סכום, מוצג לתקופות אחרות. בונוסים לא מתווספים ומסים לא מנוכים.",
  }),
};
