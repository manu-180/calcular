import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

// Las unidades llegan en su abreviatura internacional; en Israel se escriben en hebreo.
const UNIDAD: Readonly<Record<string, string>> = { m: "מטר", "m²": 'מ"ר', ft: "רגל", "ft²": "רגל רבוע" };
const he = (u: string) => UNIDAD[u] ?? u;

export const textosHe: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `שטח ${n}: צורה`,
    formaAyuda: "אם החדר בצורת L או לא סדיר, חלקו אותו לחלקים והמחשבון יחבר אותם.",
    ninguna: "לא בשימוש",
    rectangulo: "מלבן או ריבוע",
    triangulo: "משולש",
    circulo: "עיגול",
    medidaA: (n, u) => `שטח ${n}: אורך, בסיס או קוטר (${he(u)})`,
    medidaAAyuda: "מלבן: אורך ורוחב. משולש: בסיס וגובה. עיגול: רק הקוטר.",
    medidaB: (n, u) => `שטח ${n}: רוחב או גובה (${he(u)})`,
    total: (u) => `השטח הכולל (${he(u)})`,
    equivale: (u) => `שווה ערך ב${u === "m²" ? 'מ"ר' : "רגל רבוע"}`,
    parcial: (n, u) => `שטח ${n} (${he(u)})`,
    errorMedida: "המידה הזו חסרה או שהיא 0.",
  }),
};
