import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosHe: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: () => ({
    precio: "מחיר הדירה",
    entradaPorcentaje: "הון עצמי (% מהמחיר)",
    entradaMonto: "סכום ההון העצמי (לא חובה)",
    entradaMontoAyuda: "אם תזינו סכום, הוא ישמש במקום האחוז.",
    tasa: "ריבית שנתית (%)",
    anios: "תקופת המשכנתא בשנים",
    gastos: "הוצאות דיור חודשיות (לא חובה)",
    gastosAyuda: "ארנונה, ביטוח מבנה, ועד בית או הוצאות אחרות שמשלמים יחד עם המשכנתא.",
    cuota: "החזר משכנתא חודשי",
    cuotaTotal: "החזר חודשי כולל הוצאות",
    entrada: "הון עצמי",
    prestado: "סכום המשכנתא",
    intereses: "סך הריבית",
    total: "סך תשלומי המשכנתא",
    tabla: "שנה אחרי שנה",
    colAnio: "שנה",
    colIntereses: "ריבית ששולמה",
    colCapital: "קרן ששולמה",
    colSaldo: "יתרה בסוף השנה",
    errorPrecio: "הזינו את מחיר הדירה.",
    errorEntrada: "ההון העצמי מכסה את כל המחיר, כך שאין משכנתא לחשב. הקטינו את ההון העצמי.",
    observacionPrestado: (porcentaje) => `אתם לווים ${porcentaje}% משווי הדירה. ככל שהחלק הזה גבוה יותר, הבנקים בדרך כלל דורשים יותר.`,
    observacionCostos: "עלויות הרכישה (שכר טרחת עורך דין, מסים, שמאות) לא כלולות. כדאי לתכנן אותן בנוסף להון העצמי.",
  }),
};
