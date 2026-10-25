import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

// Las unidades llegan en su abreviatura internacional; en Israel se escriben en hebreo.
const UNIDAD: Readonly<Record<string, string>> = {
  m: "מטר",
  cm: 'ס"מ',
  "m³": 'מ"ק',
  kg: 'ק"ג',
  ft: "רגל",
  in: "אינץ'",
  "yd³": "יארד מעוקב",
  "ft³": "רגל מעוקב",
  lb: "ליברות",
};
const he = (u: string) => UNIDAD[u] ?? u;

export const textosHe: TextosUi<UiHormigon> = {
  slug: "concrete-calculator",
  ui: () => ({
    largo: (u) => `אורך (${he(u)})`,
    ancho: (u) => `רוחב (${he(u)})`,
    espesor: (u) => `עובי (${he(u)})`,
    espesorAyuda: 'מרפסת או שביל הם בדרך כלל בעובי 10 ס"מ (4 אינץ\'). משטח לחניה, 12 עד 15 ס"מ.',
    margen: "תוספת ביטחון (%)",
    margenAyuda: "לקרקע לא אחידה ולשפיכה. 5% עד 10% זה המקובל.",
    bolsa: (u) => `משקל שק המלט (${he(u)})`,
    volumen: (u) => `הנפח המדויק (${he(u)})`,
    volumenTotal: (u) => `כמות הבטון הנדרשת (${he(u)})`,
    volumenPies: "כמות הבטון הנדרשת (רגל מעוקב)",
    cemento: (u) => `מלט (${he(u)})`,
    bolsas: "שקי מלט",
    arena: (u) => `חול (${he(u)})`,
    piedra: (u) => `חצץ (${he(u)})`,
    agua: (u) => (u === "L" ? "מים (ליטרים)" : "מים (גלונים)"),
    errorMedida: "המידה הזו צריכה להיות גדולה מ-0.",
    aviso: 'החומרים הם הערכה לתערובת כללית של 1:2:3 (כ-350 ק"ג מלט למ"ק). הם משתנים לפי סוג הבטון, העבודה והחומרים באזור: בדקו אותם עם מי שמנהל את העבודה.',
  }),
};
