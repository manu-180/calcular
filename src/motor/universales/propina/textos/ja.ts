import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosJa: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "会計金額",
    porcentaje: "チップ（%）",
    porcentajeAyuda: "チップの習慣は国やお店によって違います。納得できる割合を選んでください。",
    personas: "支払う人数",
    redondear: "1人分を切り上げる",
    redondearAyuda: "全員がきりのいい金額を払えるようにします。切り上げた分はチップに回ります。",
    propina: "チップ",
    total: "チップ込みの合計",
    porPersona: "1人あたり",
    propinaEfectiva: "切り上げ後のチップ",
    errorPersonas: "支払う人は1人以上にしてください。",
    observacionRedondeo: (efectiva) => `切り上げると、チップは会計の${efectiva}%になります。`,
  }),
};
