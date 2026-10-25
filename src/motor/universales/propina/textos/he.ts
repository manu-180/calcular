import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosHe: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "סכום החשבון",
    porcentaje: "טיפ (%)",
    porcentajeAyuda: "המנהג משתנה לפי מדינה ולפי מקום. בחרו את מה שנראה לכם מתאים.",
    personas: "מספר המשלמים",
    redondear: "עיגול כלפי מעלה של חלק כל אחד",
    redondearAyuda: "כך כל אחד משלם סכום עגול. מה שנוסף הולך לטיפ.",
    propina: "טיפ",
    total: "סך הכול עם טיפ",
    porPersona: "כל אחד משלם",
    propinaEfectiva: "הטיפ אחרי העיגול",
    errorPersonas: "צריך לפחות משלם אחד.",
    observacionRedondeo: (efectiva) => `אחרי העיגול כלפי מעלה, הטיפ הוא ${efectiva}% מהחשבון.`,
  }),
};
