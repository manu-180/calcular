import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

// Las unidades llegan en su abreviatura internacional; en Israel se escriben en hebreo.
const UNIDAD: Readonly<Record<string, string>> = {
  m: "מטר",
  "m²": 'מ"ר',
  "m²/L": 'מ"ר לליטר',
  L: "ליטרים",
  ft: "רגל",
  "ft²": "רגל רבוע",
  "ft²/gal": "רגל רבוע לגלון",
  gal: "גלונים",
};
const he = (u: string) => UNIDAD[u] ?? u;

export const textosHe: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "אילו מידות יש לכם?",
    modoMedidas: "אורך וגובה הקירות",
    modoSuperficie: "השטח הכולל",
    largo: (u) => `האורך הכולל של הקירות (${he(u)})`,
    largoAyuda: "כל הקירות שצובעים, יחד. בחדר, ההיקף שלו.",
    alto: (u) => `גובה הקיר (${he(u)})`,
    superficie: (u) => `שטח לצביעה (${he(u)})`,
    aberturas: (u) => `דלתות וחלונות שלא צובעים (${he(u)})`,
    aberturasAyuda: 'דלת היא בערך 2 מ"ר (21 רגל רבוע), וחלון רגיל 1 עד 2 מ"ר.',
    manos: "מספר שכבות",
    rendimiento: (u) => `כושר כיסוי של הצבע (${he(u)})`,
    rendimientoAyuda: "כתוב על הדלי: כמה שטח הוא מכסה בשכבה אחת. אם זה לא ידוע, השאירו את הערך המוצע.",
    recomendado: (u) => `כמות צבע לקנייה (${he(u)})`,
    recomendadoAyuda: "כולל 10% תוספת לתיקונים ולמה שנשאר ברולר.",
    necesario: (u) => `הכמות המדויקת (${he(u)})`,
    neta: (u) => `שטח לצביעה (${he(u)})`,
    errorMedidas: "מלאו את האורך והגובה של הקירות.",
    errorSuperficie: "מלאו את השטח לצביעה.",
    errorAberturas: "הדלתות והחלונות לא יכולים לתפוס את כל הקיר.",
    errorRendimiento: "כושר הכיסוי צריך להיות גדול מ-0.",
  }),
};
