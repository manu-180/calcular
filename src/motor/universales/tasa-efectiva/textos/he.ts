import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosHe: TextosUi<UiTasaEfectiva> = {
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "איזו ריבית יש לכם?",
    nominalAEfectiva: "ריבית נקובה (המרה לריבית אפקטיבית)",
    efectivaANominal: "ריבית אפקטיבית (המרה לריבית נקובה)",
    tasa: "ריבית שנתית (%)",
    tasaAyuda: "הזינו אותה בדיוק כפי שהיא מופיעה בהצעה או בחוזה.",
    capitalizacion: "תדירות צבירת הריבית",
    capitalizacionAyuda: "כל כמה זמן הריבית מתווספת ליתרה. בהלוואות ובכרטיסי אשראי היא נצברת בדרך כלל כל חודש.",
    mensual: "חודשית (12 פעמים בשנה)",
    trimestral: "רבעונית (4 פעמים בשנה)",
    semestral: "חצי שנתית (פעמיים בשנה)",
    diaria: "יומית (365 פעמים בשנה)",
    efectiva: "ריבית שנתית אפקטיבית",
    nominal: "ריבית שנתית נקובה",
    periodica: "ריבית לכל תקופה",
    errorNegativa: "הריבית לא יכולה להיות שלילית. הזינו מספר מ-0 ומעלה.",
    observacionDiferencia: (puntos) => `הריבית האפקטיבית גבוהה ב-${puntos} נקודות האחוז מהריבית הנקובה, כי גם הריבית צוברת ריבית.`,
  }),
};
