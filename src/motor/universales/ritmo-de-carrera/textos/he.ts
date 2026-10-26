import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// Las unidades llegan en su abreviatura internacional; en Israel se escriben en hebreo.
const UNIDAD: Readonly<Record<string, string>> = { km: 'ק"מ', mi: "מייל", "km/h": 'קמ"ש', mph: "מייל לשעה" };
const he = (u: string) => UNIDAD[u] ?? u;

export const textosHe: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "מה רוצים לחשב?",
    calcRitmo: "קצב (לפי מרחק וזמן)",
    calcTiempo: "זמן (לפי מרחק וקצב)",
    calcDistancia: "מרחק (לפי זמן וקצב)",
    distancia: "מרחק",
    distanciaAyuda: 'בחרו מרוץ, או "מרחק אחר" כדי להזין מרחק בעצמכם.',
    otra: "מרחק אחר",
    cincoK: '5 ק"מ',
    diezK: '10 ק"מ',
    media: "חצי מרתון",
    maraton: "מרתון",
    distanciaOtra: (u) => `מרחק אחר (${he(u)})`,
    horas: "זמן: שעות",
    minutos: "זמן: דקות",
    segundos: "זמן: שניות",
    ritmoMin: (u) => `קצב: דקות ל${u === "km" ? 'ק"מ' : "מייל"}`,
    ritmoSeg: "קצב: שניות",
    ritmo: (u) => `קצב (דקות ל${u === "km" ? 'ק"מ' : "מייל"})`,
    tiempo: "זמן סיום",
    distanciaRes: (u) => `מרחק (${he(u)})`,
    velocidad: (u) => `מהירות ממוצעת (${he(u)})`,
    errorDistancia: "הזינו מרחק גדול מ-0.",
    errorTiempo: "הזינו את הזמן: שעות, דקות או שניות.",
    errorRitmo: "הזינו את הקצב: דקות ושניות ליחידת מרחק.",
  }),
};
