import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosHe: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "מה רוצים לחשב?",
    modoParte: "כמה הם X% מתוך Y?",
    modoProporcion: "X הם כמה אחוזים מתוך Y?",
    modoAumento: "Y ועוד X%",
    modoRebaja: "Y פחות X%",
    x: "מספר X",
    xAyuda: 'האחוז. אם בחרתם "X הם כמה אחוזים מתוך Y?", זה החלק.',
    y: "מספר Y",
    resultado: "תוצאה",
    porcentaje: "אחוז",
    diferencia: "הסכום שנוסף או ירד",
    errorYCero: "Y לא יכול להיות 0: אי אפשר לחשב אחוז מתוך אפס.",
    fraseParte: (x, y, r) => `${x}% מתוך ${y} הם ${r}.`,
    fraseProporcion: (x, y, p) => `${x} הם ${p}% מתוך ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} ועוד ${x}% הם ${r}: נוספו ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} פחות ${x}% הם ${r}: ירדו ${d}.`,
  }),
};
