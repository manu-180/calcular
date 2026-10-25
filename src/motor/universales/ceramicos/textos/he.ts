import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

// Las unidades llegan en su abreviatura internacional; en Israel se escriben en hebreo.
const UNIDAD: Readonly<Record<string, string>> = { "m²": 'מ"ר', cm: 'ס"מ', "ft²": "רגל רבוע", in: "אינץ'" };
const he = (u: string) => UNIDAD[u] ?? u;

export const textosHe: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (u) => `שטח לריצוף או לחיפוי (${he(u)})`,
    largo: (u) => `אורך האריח (${he(u)})`,
    ancho: (u) => `רוחב האריח (${he(u)})`,
    desperdicio: "תוספת פחת (%)",
    desperdicioAyuda: "לחיתוכים ולשברים. 10% להנחה ישרה ו-15% להנחה באלכסון.",
    porCaja: "אריחים בקרטון",
    porCajaAyuda: "לא חובה. מלאו כדי לראות כמה קרטונים לקנות.",
    piezas: "אריחים נדרשים",
    cajas: "קרטונים לקנייה",
    conDesperdicio: (u) => `שטח כולל פחת (${he(u)})`,
    cubre: (u) => `השטח שהקרטונים מכסים (${he(u)})`,
    errorSuperficie: "השטח צריך להיות גדול מ-0.",
    errorPieza: "מידות האריח צריכות להיות גדולות מ-0.",
  }),
};
