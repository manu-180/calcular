import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosHe: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "סכום התחלתי",
    aporte: "הפקדה חודשית (לא חובה)",
    aporteAyuda: "הסכום שתוסיפו בכל חודש. הוא נכנס בסוף כל חודש.",
    tasa: "ריבית שנתית (%)",
    anios: "שנים",
    capitalizacion: "תדירות צבירת הריבית",
    anual: "שנתית",
    semestral: "חצי שנתית",
    trimestral: "רבעונית",
    mensual: "חודשית",
    diaria: "יומית",
    saldo: "יתרה סופית",
    aportado: "סך ההפקדות",
    intereses: "הריבית שנצברה",
    tabla: "הצמיחה שנה אחרי שנה",
    colAnio: "שנה",
    colAportado: "הפקדות",
    colIntereses: "ריבית",
    colSaldo: "יתרה בסוף השנה",
    errorSinDinero: "הזינו סכום התחלתי או הפקדה חודשית.",
    observacionIntereses: (porcentaje) => `${porcentaje}% מהיתרה הסופית הם ריבית.`,
  }),
};
