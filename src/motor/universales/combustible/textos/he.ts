import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

// Las unidades llegan en su abreviatura internacional; en Israel se escriben en hebreo.
const UNIDAD: Readonly<Record<string, string>> = { km: 'ק"מ', mi: "מייל", L: "ליטרים", gal: "גלונים" };
const he = (u: string) => UNIDAD[u] ?? u;

export const textosHe: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `מרחק הנסיעה (${he(u)})`,
    idaYVuelta: "הלוך ושוב",
    tipoConsumo: "איך נמדדת צריכת הדלק",
    l100: 'ליטרים ל-100 ק"מ',
    kml: 'ק"מ לליטר',
    consumo: "צריכת דלק",
    consumoMpg: "צריכת דלק (מייל לגלון)",
    consumoAyuda: "בדקו בספר הרכב או במחשב הדרך. בנסיעה בין עירונית הרכב צורך בדרך כלל פחות מאשר בעיר.",
    precio: (u) => (u === "L" ? "מחיר לליטר" : "מחיר לגלון"),
    personas: "מספר האנשים שמתחלקים בעלות",
    costo: "עלות הדלק",
    porPersona: "לכל אחד",
    combustible: (u) => `כמות הדלק הנדרשת (${he(u)})`,
    distanciaTotal: (u) => `המרחק הכולל (${he(u)})`,
    costoPorDistancia: (u) => (u === "mi" ? "עלות למייל" : 'עלות לק"מ'),
    errorConsumo: "צריכת הדלק צריכה להיות גדולה מ-0.",
    errorPersonas: "צריך לפחות אדם אחד.",
  }),
};
