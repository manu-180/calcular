import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosHe: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `משתתף ${n}`,
    personaAyuda: "הזינו כמה כל אחד שילם. מי שלא שילם כלום אבל משתתף בהוצאה, הזינו 0. את השאר השאירו ריקים.",
    total: "סך ההוצאה",
    personas: "משתתפים",
    cuota: "החלק של כל אחד",
    transferencias: "העברות לסגירת החשבון",
    tabla: "מי מעביר למי",
    colDe: "מעביר",
    colPara: "מקבל",
    colMonto: "סכום",
    errorPocas: "כדי לחלק הוצאה צריך לפחות שני משתתפים.",
    aMano: "אתם מאוזנים: כולם שילמו אותו סכום.",
  }),
};
